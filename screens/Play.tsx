import React from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList } from '../types'
import { Container, SongImg, SongInfo, SongRemain } from '../components';
import { SongsContext } from '../context';
import ButtonsHandler from '../components/ButtonsHandler';
import { COLORS, FONTS, SIZES } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IProps extends NativeStackScreenProps<RootTabParamList, 'Play'> { }

const Play: React.FC<IProps> = ({ navigation }) => {
    const { songs } = React.useContext(SongsContext)
    const { height } = useWindowDimensions()
    const cur = songs.current;
    const currentSong = cur?.get;

    return (
        <Container center dis={currentSong ? false : true}>
            {currentSong ? (
                <>
                    <SongImg />
                    <SongInfo />
                    <View style={{
                        top: height - 240,
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <SongRemain />
                        <ButtonsHandler
                            isPlaying={cur.status.get == 'playing'}
                            isPaused={cur.status.get == 'paused'}
                            onPlay={() => songs.current.start(currentSong)}
                            onPause={() => songs.current.status.set('paused')}
                            index={songs.get.indexOf(currentSong)}
                            size={75}
                            style={{
                                top: 22.5
                            }}
                            onNext={() => songs.step(true)}
                            onPrv={() => songs.step(false)}
                        />
                    </View>
                </>) :
                (<>
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>You need to play any sound...</Text>
                    <MaterialIcons name='music-off' size={250} color={COLORS.white} />
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{
                            width: 300,
                            height: 60,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius * 3,
                            backgroundColor: COLORS.gray3
                        }}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={{
                                color: COLORS.white2,
                                ...FONTS.h3
                            }}>Take Me Back</Text>
                        </TouchableOpacity>
                    </View>
                </>
                )
            }


        </Container>
    )
}

export default Play;