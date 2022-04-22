import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { View, ViewStyle, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { SongsContext } from '../context';

interface IProps {
    onPlay: () => void;
    onPause: () => void;
    onNext: () => void;
    onPrv: () => void;
    isPlaying: boolean;
    isPaused: boolean;
    index: number;
    style?: ViewStyle;
    size?: number;
}

const ButtonsHandler: React.FC<IProps> = ({
    onPause,
    onPlay,
    isPaused,
    isPlaying,
    style,
    index,
    size,
    onNext,
    onPrv }) => {
    const { songs } = useContext(SongsContext);
    return (
        <View style={{
            ...style,
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            {index !== 0 && <TouchableOpacity onPress={onPrv}>
                <AntDesign
                    name={'caretleft'}
                    size={size ?? 40} color={COLORS.darkGray2} />
            </TouchableOpacity>}

            <TouchableOpacity
                style={{
                    width: size ? (55 + size / 3) : 55,
                    height: size ? (55 + size / 3) : 55,
                    backgroundColor: COLORS.darkGray2,
                    borderRadius: size ? (SIZES.radius * 3 + size / 2) : SIZES.radius * 3,
                    marginRight: -5,
                    marginLeft: -5,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={isPlaying ? onPause : onPlay}
            >
                {isPaused ?
                    <MaterialIcons
                        name='music-off'
                        size={size ? (size / 1.5 - (size / 15 - 10)) : 30}
                        color={COLORS.white} />
                    :
                    <Entypo
                        name={isPlaying ? 'controller-paus' : 'controller-play'}
                        size={size ? (size / 1.5 - (size / 15 - 10)) : 30}
                        color={COLORS.white}
                    />
                }
            </TouchableOpacity>
            {index !== songs.get.length - 1 && <TouchableOpacity onPress={onNext}>
                <AntDesign
                    name={'caretright'}
                    size={size ?? 40} color={COLORS.darkGray2} />
            </TouchableOpacity>}
        </View>
    )
}

export default ButtonsHandler;