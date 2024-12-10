import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Loading: undefined;
}

export type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export type RegisterNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;