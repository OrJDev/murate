import React from 'react';
import { Image, View } from 'react-native';
import { SIZES } from '../constants';
import { SongsContext } from '../context';

interface IProps { }

const SongImg: React.FC<IProps> = ({ }) => {
    const img = React.useContext(SongsContext).songs.current.get!.img;

    return (
        <View style={{
            position: 'absolute',
            height: 500,
            width: '100%',
            backgroundColor: 'rgba(23,23,23,255)',
            borderRadius: 500,
            flex: 1,
        }}>
            <View style={{ marginTop: SIZES.base, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={{ uri: img }}
                    style={{
                        width: 350,
                        height: 350,
                        resizeMode: 'contain',
                        borderRadius: 300
                    }}
                />
            </View>
        </View>
    )
}

export default SongImg;