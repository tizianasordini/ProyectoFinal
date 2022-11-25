import {Text, View } from 'react-native'
import React, {Component} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home/Home'
import PerfilAmigos from '../screens/PerfilAmigos/PerfilAmigos'

const Stack = createNativeStackNavigator()

export default class HomeNavigation extends Component {
    render () {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name = 'Home'
                    component={Home}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name = 'PerfilAmigos'
                    component={PerfilAmigos}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        )
    }
}
