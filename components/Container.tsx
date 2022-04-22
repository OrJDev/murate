import React from 'react';
import { Text, View, ScrollView, ScrollViewProps } from 'react-native';
import { FONTS, COLORS, SIZES } from '../constants';

interface IProps {
    scroll?: boolean;
    noScroll?: React.ReactNode;
    scrollProps?: ScrollViewProps;
    center?: boolean;
    dis?: boolean;
    f?: boolean;
}

const Container: React.FC<IProps> = ({ children, scroll, scrollProps, noScroll, center, f, dis = true }) => {
    const style = center ?
        { alignItems: 'center', jutifyContent: 'center' }
        : {}
    return (
        <View style={{
            flex: 1,
            backgroundColor: "#101010",
            alignItems: 'center'
        }}>
            {dis && <Text style={{
                ...FONTS.h1,
                color: COLORS.darkGray2,
                margin: SIZES.base * 2
            }}>
                MuRate
            </Text>}
            {f && noScroll}
            {scroll ?
                <ScrollView contentContainerStyle={style as any} showsVerticalScrollIndicator={false} {...scrollProps}>
                    {children}
                </ScrollView>
                : <View style={style as any}>{children}</View>}
            {!f && scroll && noScroll}
        </View>
    )
}

export default Container;