import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from './navigation.types';
import Loading from '@screens/Loading';
import Register from '@screens/Register';
import Login from '@screens/Login';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AuthStackNavigator = () => {
    return (
        <Stack.Navigator>

            <>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            </>

        </Stack.Navigator>
    );
};

export const LoadingStackNavigator = () => {
    return (
        <Stack.Navigator>

            <Stack.Screen name="Loading" component={Loading} options={{
                headerShown: false,
            }} />

        </Stack.Navigator>
    );
};
