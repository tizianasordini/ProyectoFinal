import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../screens/Home/Home";
import Posteo from "../screens/Posteo/Posteo";
import Perfil from "../screens/Perfil/Perfil";


const Tab = createBottomTabNavigator()

function TabNavigation() {
    return(
        <Tab.Navigator>
            <Tab.Screen
            name = "Home"
            component={Home}
            />
              <Tab.Screen
            name = "Posteo"
            component={Posteo}
            />
            <Tab.Screen
            name="Perfil"
            component={Perfil}
            />

        </Tab.Navigator>
    
    )
}

export default TabNavigation;
