import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import Home from "../screens/Home/Home";
import Posteo from "../screens/Posteo/Posteo";

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
        </Tab.Navigator>
    )
}

export default TabNavigation;
