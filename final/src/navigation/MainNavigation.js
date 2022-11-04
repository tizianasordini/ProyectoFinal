import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import Register from "../screens/Register/Register";

const Stack = createNativeStackNavigator();

function MainNavigation() {
    return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
            name='Register'
            component={Register}
            options={{
                headerShown: false
            }}
            />
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default MainNavigation;