import { Entypo, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import ISong from '../types/Song';

interface IProps {
    song: ISong;
    onPlay?: () => void;
    onPause?: () => void;
    isPlaying?: boolean;
    isPaused?: boolean;
    txt?: string;
    value?: any;
    btns?: boolean;
}

const SongItem: React.FC<IProps> = ({ song, onPlay, onPause, txt, value, isPlaying, isPaused, btns }) => {
    return (
        <View style={{
            width: 350,
            height: 100,
            margin: 5,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            backgroundColor: 'rgba(23,23,23,255)',
        }}>
            <Image
                source={{ uri: song.img }}
                style={{
                    width: 60,
                    height: 60,
                    resizeMode: 'contain',
                    borderRadius: 60,
                    alignSelf: 'flex-start',
                    margin: 9
                }}
            />
            <View style={{ position: 'absolute', alignItems: 'center', top: 5 }}>
                <Text
                    style={{
                        ...FONTS.h2,
                        color: COLORS.white,
                    }}>
                    {song.title}
                </Text>
                <Text
                    style={{
                        ...FONTS.h3,
                        color: COLORS.lightGray1,
                    }}>
                    {song.artist}
                </Text>
                <View style={{ flexDirection: 'row', top: 5 }}>
                    <Text style={{ color: COLORS.white, ...FONTS.h4 }}>{txt ?? 'Total Rating'}: </Text>
                    <Text
                        style={{
                            ...FONTS.h3,
                            color: COLORS.darkGray2,
                        }}>
                        {value ?? song.rating.length}
                    </Text>
                </View>
            </View>
            {!btns && <TouchableOpacity
                style={{
                    width: 55,
                    height: 55,
                    backgroundColor: COLORS.darkGray2,
                    borderRadius: SIZES.radius * 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    right: 15,
                    top: 20,
                }}
                onPress={isPlaying ? onPause : onPlay}
            >
                {isPaused ?
                    <MaterialIcons name='music-off' size={30} color={COLORS.white} />
                    :
                    <Entypo
                        name={isPlaying ? 'controller-paus' : 'controller-play'}
                        size={30}
                        color={COLORS.white}
                    />
                }

            </TouchableOpacity>}

        </View>
    )
}

export default SongItem;