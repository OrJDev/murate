import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { Container, SongItem } from '../components';
import { COLORS, FONTS } from '../constants';
import { SongsContext } from '../context';

interface IProps { }

const Rated: React.FC<IProps> = ({ }) => {
    const { ratedSongs: { get: myRatedSongs } } = React.useContext(SongsContext)
    const avgRated = React.useMemo(() => {
        if (myRatedSongs.length === 0) return 0;
        return myRatedSongs.reduce((acc, e) => acc + e.rate, 0) / myRatedSongs.length
    },
        [myRatedSongs])
    return (
        <Container f center scroll noScroll={
            <>
                <Text style={{ color: COLORS.lightGray1, ...FONTS.h4 }}>
                    Your rate in avarge is {avgRated.toFixed(1)}
                </Text>
                <Text style={{ color: COLORS.white, ...FONTS.h2, margin: 10 }}>
                    {myRatedSongs.length ?
                        'Your rated songs are:' :
                        "You didn't rate any song!"}
                </Text>
            </>}>
            <View>
                {myRatedSongs.map((item, index) => (
                    <View key={index} style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <SongItem
                            song={item}
                            btns
                        />
                        <MaterialCommunityIcons style={{
                            position: 'absolute',
                            right: 5,
                        }}
                            name='star'
                            color={'gold'}
                            size={100} />
                        <Text style={{
                            color: COLORS.white,
                            ...FONTS.h2,
                            position: 'absolute', right: 36.5, top: 40
                        }}>{item.rate.toFixed(1)}</Text>
                    </View>
                ))
                }
            </View >
        </Container >
    )
}

export default Rated;