import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';
import { COLORS, FONTS } from '../constants';
import { SongsContext } from '../context';
import ButtonsHandler from './ButtonsHandler';

interface IProps {
    onPress: () => void;
}

const SongFooter: React.FC<IProps> = ({ onPress }) => {
    const { songs } = React.useContext(SongsContext);
    const cur = songs.current.get
    const status = songs.current.status.get;
    const { width } = useWindowDimensions()
    return (
        <TouchableOpacity
            style={{
                height: 75,
                width,
                backgroundColor: 'rgba(34,36,40,1)',
                position: 'absolute',
                bottom: 66.5,
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 5
            }}
            disabled={!cur}
            onPress={onPress}
        >
            <Animated.View
                style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
                entering={FadeIn.duration(1500).easing(Easing.ease)}
            >
                {cur ? (
                    <>
                        <Image source={{ uri: cur.img }} style={{
                            width: 50,
                            height: 50,
                            margin: 10
                        }} />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{cur.title}</Text>
                            <Text style={{ color: COLORS.gray, ...FONTS.h4 }}>{cur.artist}</Text>
                        </View>
                        <ButtonsHandler
                            onPlay={() => songs.current.start(cur)}
                            onPause={() => songs.current.status.set('paused')}
                            isPlaying={status == 'playing'}
                            isPaused={status == 'paused'}
                            style={{
                                top: 10,
                                left: width - 155,
                                position: 'absolute',
                            }}
                            index={songs.get.indexOf(cur)}
                            onNext={() => songs.step(true)}
                            onPrv={() => songs.step(false)}
                        />
                    </>) : <><View style={{
                        height: 60,
                        aspectRatio: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(23,23,23,255)'
                    }}>
                        <MaterialIcons name='music-off' size={30} color={COLORS.white} />
                    </View>
                    <Text style={{ ...FONTS.h2, color: COLORS.gray, marginLeft: 15 }}>Not Playing...</Text>
                </>}

            </Animated.View>
        </TouchableOpacity>
    )
}

export default SongFooter;