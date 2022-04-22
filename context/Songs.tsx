import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import ISong, { IRatedSong } from '../types/Song';
import DummySongs from "../constants/songs"
import { Audio } from 'expo-av';
import IRate from '../types/Rate';
import ISongsContext, { IStatus, ITiming } from '../types/Context';

interface IProps { }

const SongsContext = React.createContext({} as ISongsContext);
export default SongsContext;

export const SongsProvider: React.FC<IProps> = ({ children }) => {
    const [ratedSongs, setRatedSongs] = React.useState<IRatedSong[]>([]);
    const [songs, setSongs] = React.useState<ISong[]>([])
    const [loading, setLoading] = React.useState(true);
    const [currentPlaying, setCurrentPlaying] = React.useState<ISong | undefined>(undefined);
    const [sound, setSound] = React.useState<Audio.Sound | undefined>(undefined);
    const [timing, setTiming] = React.useState<ITiming>({ remain: 0, total: 0 });
    const [status, setStatus] = React.useState<IStatus>('none')
    const [outofSongs, setOutOfSongs] = React.useState(false);

    React.useEffect(() => {
        setSongs(DummySongs)
        setLoading(false)
    }, []);

    React.useEffect(() => {
        if (currentPlaying) {
            Reset();
            (async () => {
                await InitSound();
            })()
        }
    }, [currentPlaying])

    React.useEffect(() => {
        if (!sound || !currentPlaying) return;
        (async () => {
            if (status == 'paused') {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
        })()
    }, [status])

    React.useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    async function InitSound() {
        if (!currentPlaying) return;
        Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: true
        })
        const { sound } = await Audio.Sound.createAsync({
            uri: currentPlaying.uri,
        }, {
            shouldPlay: false,
        }, (async status => {
            if (status.didJustFinish) {
                await handleJustFinished();
            } else {
                setTiming(t => ({ ...t, remain: status.positionMillis }))
            }
        }));
        const results = await sound.getStatusAsync()
        setTiming(t => ({ ...t, total: results.durationMillis || 0 }))
        setSound(sound);
        setStatus('playing')
    }

    function Reset() {
        setStatus('none')
        setSound(undefined)
        setTiming({ remain: 0, total: 0 })
    };


    async function handleJustFinished() {
        if (!currentPlaying) return;
        const index = songs.indexOf(currentPlaying);
        if (index !== songs.length - 1) {
            setCurrentPlaying(songs[index + 1])
        } else {
            Reset();
            setOutOfSongs(true);
        }
    }

    async function handleStep(next: boolean) {
        if (!currentPlaying) return;
        const index = songs.indexOf(currentPlaying);
        if (next) {
            if (index !== songs.length - 1) {
                setCurrentPlaying(songs[index + 1])
            }
        } else {
            if (index !== 0) {
                setCurrentPlaying(songs[index - 1])
            }
        }
    }

    function startSong(item: ISong) {
        if (!currentPlaying) {
            setCurrentPlaying(item)
        } else if (currentPlaying.id != item.id) {
            setCurrentPlaying(item)
        } else {
            setStatus('playing')
        }
    }

    function statusOf(id: number): IStatus {
        if (!currentPlaying) {
            return 'none';
        }
        if (currentPlaying.id == id) {
            return status;
        }
        return 'none';
    }

    function rateSong(song: ISong, rate: IRate) {
        const old = ratedSongs.find(e => e.id == song.id)
        if (old) {
            if (rate != old.rate) {
                setRatedSongs(r => r.map(e => e.id == song.id ? { ...e, rate } : e))
            }
        } else {
            setRatedSongs(r => [...r, { ...song, rate }])
        }
    }

    return (
        <SongsContext.Provider value={{
            ratedSongs: {
                add: (song: IRatedSong) => setRatedSongs(r => [...r, song]),
                set: setRatedSongs,
                get: ratedSongs,
                rate: rateSong
            },
            songs: {
                add: (song: ISong) => setSongs(r => [...r, song]),
                set: setSongs,
                get: songs,
                current: {
                    set: setCurrentPlaying,
                    get: currentPlaying,
                    status: {
                        get: status,
                        set: setStatus,
                    },
                    timing: {
                        get: timing,
                        /**
                         * we don't need to update the state because we listen to status event,
                         * so when the position updates the state will be updated too.
                         */
                        set: async (newValue: number) => {
                            if (!sound) return;
                            await sound.setPositionAsync(newValue)
                        }
                    },
                    start: startSong,
                    statusOf,
                    outOfSongs: outofSongs,
                },
                step: handleStep
            }
        } as ISongsContext}>
            {loading ?
                <ActivityIndicator />
                :
                children}
        </SongsContext.Provider>
    )
}
