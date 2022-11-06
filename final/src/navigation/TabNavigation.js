import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import Home from "../screens/Home/Home";

const Tab = createBottomTabNavigator()

function TabNavigation() {
    return(
        <Tab.Navigator>
            <Tab.Screen
            name = "Home"
            component={Home}
            />
        </Tab.Navigator>
    )
}

export default TabNavigation;
