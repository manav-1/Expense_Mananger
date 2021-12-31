import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import LogoScreen from '../screens/LogoScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeTabNavigation from './HomeTabNavigation';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRoute="Logo">
                <Stack.Screen
                    name="Logo"
                    component={LogoScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="HomeNav"
                    component={HomeTabNavigation}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigation;
