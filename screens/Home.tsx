import React from 'react';
import { SongItem, Container } from '../components';
import { SongsContext } from '../context';
import { RootTabScreenProps } from '../types';
import SongFooter from '../components/SongFooter';

interface IProps extends RootTabScreenProps<'Home'> { }

const Home: React.FC<IProps> = ({ navigation }) => {
    const { songs } = React.useContext(SongsContext);
    /**
     * if the current song is not defined it means that the status is none,
     * but if the current song is defined and the id of the song is the same as item id 
     * we need to check the status of the song and then return it, if its not Paused or Playing then its None
     * so we simply return None.
     */
    function getStatus(id: number) {
        if (!songs.current?.get) {
            return 'None';
        }
        if (songs.current.get.id == id) {
            const status = songs.current.status.get;
            if (status == 'playing') {
                return 'Playing';
            } else if (status == 'paused') {
                return 'Paused';
            }
        }
        return 'None';
    }
    /**
     * 
     * we know that the song will start auto if you just set it, so if the song is not defined
     * or need to be updated we don't need to update the status, we need to 
     * set the song, but if the song is already defined we need to update the status and let the useEffect
     * handle it.
     */


    return (
        <Container scroll center noScroll={<SongFooter onPress={() => navigation.navigate('Play')} />}>
            {songs.get.map((item, index) => {
                const status = getStatus(item.id)
                return (
                    <SongItem
                        song={item}
                        key={index}
                        onPlay={() => songs.current.start(item)}
                        onPause={() => songs.current.status.set('paused')}
                        isPlaying={status == 'Playing'}
                        isPaused={status == 'Paused'}
                    />
                )
            })}
        </Container >
    )
}

export default Home;