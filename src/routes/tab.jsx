import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import Settings from '../screens/settings';
import IconSettings from 'react-native-vector-icons/Feather'
import PixScreen from '../screens/settings/pix';
import PixIcon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../assets/colors.json'
import WebService from '../screens/settings/webService';
import ServiceIcon from 'react-native-vector-icons/MaterialIcons'
// import { Container } from './styles';


export default function TabRoute() {
    const tab = createBottomTabNavigator()
    return (


        <tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarLabelStyle: {
                    color: 'black'
                }
            }}
        >
            <tab.Screen name='settings' component={Settings}
                options={{
                    tabBarLabel: 'Certificado',
                    tabBarIcon: ({ color, size, focused }) =>
                    (
                        focused ?

                            <IconSettings
                                name='settings'
                                color={Colors.orange}
                                size={size}
                            /> :
                            <IconSettings
                                name='settings'
                                color={'grey'}
                                size={size}
                            />

                    )

                }}
            />
            <tab.Screen name='webService' component={WebService}
                options={{
                    tabBarLabel: 'Service',
                    tabBarIcon: ({ color, size, focused }) =>
                    (
                        focused ?

                            <ServiceIcon
                                name='miscellaneous-services'
                                color={Colors.orange}
                                size={size}
                            /> :
                            <ServiceIcon
                                name='miscellaneous-services'
                                color={'grey'}
                                size={size}
                            />

                    )

                }}
            />
            <tab.Screen name='pix' component={PixScreen}
                options={{
                    tabBarLabel: 'PIX',
                    tabBarIcon: ({ color, size, focused }) =>
                    (
                        focused ?

                            <PixIcon
                                name='pix'
                                color={Colors.orange}
                                size={size}
                            /> :
                            <PixIcon
                                name='pix'
                                color={'grey'}
                                size={size}
                            />

                    )

                }}
            />

        </tab.Navigator>
    )
}