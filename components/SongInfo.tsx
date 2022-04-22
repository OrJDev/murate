import React from 'react';
import { Text, View } from 'react-native';
import { COLORS, FONTS } from '../constants';
import { avgRating } from '../constants/songs';
import { SongsContext } from '../context';
import Rating from './Rating';

interface IProps { }

const SongInfo: React.FC<IProps> = ({ }) => {
    const { songs } = React.useContext(SongsContext);
    const song = songs.current.get!;

    return (
        <View style={{
            position: 'absolute',
            top: 365,
            alignItems: 'center',
        }}>
            <Text style={{ color: COLORS.white, ...FONTS.h1 }}>{song.title}</Text>
            <Text style={{ color: COLORS.lightGray1, ...FONTS.h3, marginTop: -5 }}>{song.artist}</Text>
            <View style={{ marginTop: 8, alignItems: 'center' }}>
                <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                    {avgRating(song.rating).toFixed(1)}
                </Text>
                <Rating />
            </View>

        </View>
    )
}

export default SongInfo;