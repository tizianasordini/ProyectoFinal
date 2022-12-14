import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesome} from '@expo/vector-icons'
import Home from "../screens/Home/Home";
import Posteo from "../screens/Posteo/Posteo";
import Perfil from "../screens/Perfil/Perfil";
import HomeNavigation from "../navigation/HomeNavigation";
import Buscador from "../screens/Buscador/Buscador"

const Tab = createBottomTabNavigator()

function TabNavigation() {
    return(
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen
            name = "HomeNavigation"
            component={HomeNavigation}
            options={{
                tabBarIcon: () => <FontAwesome name='home' size={26} color="black" />,
                headerShown:false
            }}
            />
            <Tab.Screen
            name = "Posteo"
            component={Posteo}
            options={{
                tabBarIcon: () => <FontAwesome name='camera-retro' size={26} color="black" />,
                headerShown:false
            }}
            />
            <Tab.Screen
            name="Perfil"
            component={Perfil}
            options={{
                tabBarIcon: () => <FontAwesome name='user' size={26} color="black" />,
                headerShown:false
            }}
            />
            <Tab.Screen
            name="Buscador"
            component={Buscador}
            options={{
                tabBarIcon: () => <FontAwesome name='search' size={26} color="black" />,
                headerShown:false
            }}
            />

        </Tab.Navigator>
    
    )
}

export default TabNavigation;
