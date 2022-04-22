import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { avgRating } from '../constants/songs';
import { SongsContext } from '../context';
import IRate from '../types/Rate';

interface IProps { }

const Rating: React.FC<IProps> = ({ }) => {
    const { songs, ratedSongs } = React.useContext(SongsContext);
    /**
     * we only call this comp when current song is defined, so its good
     */
    const song = songs.current.get!;
    const myRate = ratedSongs.get.find(e => e.id == song.id)?.rate
    const avgRate = avgRating(song.rating);

    return (
        <View style={{
            width: 260,
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: SIZES.radius / 2,
            flexDirection: 'row',
            marginTop: -15
        }}>
            {new Array(5).fill(0).map((_, i) => (
                <View key={i}>
                    {myRate && myRate == i + 1 ? (
                        <View style={{
                            height: 0.5,
                            backgroundColor: COLORS.lightGray1,
                            width: 15,
                            position: 'absolute',
                            left: 7.5
                        }} />
                    ) : null}
                    <TouchableOpacity onPress={() => ratedSongs.rate(song, (i + 1) as IRate)}>
                        <FontAwesome
                            style={{
                                padding: 3.5
                            }}
                            name={i < Math.floor(avgRate) ? 'star' : 'star-o'}
                            size={25}
                            color='#e47911'
                        />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}

export default Rating;