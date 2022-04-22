import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { } from 'react-native';
import { Home, Play, Rated } from '../screens';
import { RootTabParamList } from '../types';

interface IProps { }

const Tabs = createBottomTabNavigator<RootTabParamList>();

const Icon = ({ name, focused }: { name: string, focused: boolean }) => {
    return (
        <MaterialCommunityIcons
            size={focused ? 45 : 38}
            color={focused ? 'white' : 'darkgray'}
            name={name.toLowerCase() as any}
        />
    )
}
const BottomTab: React.FC<IProps> = ({ }) => {
    return (
        <Tabs.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: 60,
                backgroundColor: 'rgba(34,36,40,1)',
                position: 'absolute',
                borderTopWidth: 0,
            },
            tabBarShowLabel: false
        }}>
            <Tabs.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon {...{ focused, name: 'Home' }} />
                        )
                    },
                }}
            />
            <Tabs.Screen
                name='RatedSongs'
                component={Rated}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon {...{ focused, name: 'Star' }} />
                        )
                    },
                }}
            />
            <Tabs.Screen
                name='Play'
                component={Play}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon {...{ focused, name: 'account-music' }} />
                        )
                    },
                }}
            />
        </Tabs.Navigator>
    )
}

export default BottomTab;