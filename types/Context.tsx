import IRate from "./Rate";
import ISong, { IRatedSong } from "./Song";

export type IStatus = 'playing' | 'paused' | 'none';
export type ITiming = { remain: number, total: number };

type ISongsContext = {
    ratedSongs: {
        get: IRatedSong[],
        set: (ratedSongs: IRatedSong[]) => void,
        add: (ratedSong: IRatedSong) => void,
        rate: (song: ISong, rate: IRate) => void,
    },
    songs: {
        get: ISong[],
        set: (songs: ISong[]) => void,
        add: (song: ISong) => void,
        current: {
            set: (song: ISong) => void,
            get: ISong | undefined,
            status: {
                get: IStatus,
                set: (status: IStatus) => void,
            },
            timing: {
                get: ITiming,
                set: (newValue: number) => Promise<void>,
            },
            start: (item: ISong) => void,
            statusOf: (id: number) => IStatus,
            outOfSongs: boolean;
        },
        step: (next: boolean) => void,
    }
}

export default ISongsContext;