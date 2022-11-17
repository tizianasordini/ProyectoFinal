import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import Register from "../screens/Register/Register";
import Login from "../screens/Login/Login";
import Comentarios from "../screens/Comentarios/Comentarios";
import TabNavigation from "../navigation/TabNavigation"

const Stack = createNativeStackNavigator();

function MainNavigation() {
    return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
            name='Login' 
            component={Login}
            options={{
                headerShown: false
            }}
            />
            <Stack.Screen
            name='Register'
            component={Register}
            options={{
                headerShown: false
            }}
            />
            <Stack.Screen
            name='TabNavigation'
            component={TabNavigation}
            options={{
                headerShown: false
            }}
            />
            <Stack.Screen
            name='Comentarios'
            component={Comentarios}
            />
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default MainNavigation;
