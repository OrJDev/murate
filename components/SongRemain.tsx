import Slider from '@react-native-community/slider';
import React from 'react';
import { Text, useWindowDimensions } from 'react-native';
import { COLORS, FONTS } from '../constants';
import { SongsContext } from '../context';
import date from '../functions/date';

interface IProps { }

const SongRemain: React.FC<IProps> = ({ }) => {
    const { songs } = React.useContext(SongsContext)
    const { width } = useWindowDimensions()
    return (
        <>
            <Text style={{
                ...FONTS.h3,
                color: COLORS.white,
                position: 'absolute',
                right: 0,
                top: -20
            }}>
                {date(songs.current.timing.get.total) ?? 'Loading...'}
            </Text>
            <Text style={{
                ...FONTS.h3,
                color: COLORS.white,
                position: 'absolute',
                left: 0,
                top: -20
            }}>
                {date(songs.current.timing.get.total - songs.current.timing.get.remain) ?? 'Loading...'}
            </Text>
            <Slider
                style={{ width: width - 40, height: 40 }}
                minimumValue={0}
                maximumValue={songs.current.timing.get.total}
                minimumTrackTintColor={COLORS.gray3}
                maximumTrackTintColor={COLORS.gray}
                value={songs.current.timing.get.remain}
                onSlidingComplete={async value => {
                    await songs.current.timing.set(value)
                }}
            />
        </>
    )
}

export default SongRemain;