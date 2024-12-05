import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
}

export type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export type RegisterNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;