import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Loading: undefined;
}

export type DrawerParamList = {
    Home: {reRender?: boolean};
    Statistics: {reRender?: boolean};
};

export type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export type RegisterNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export type HomeNavigationProp = DrawerNavigationProp<DrawerParamList, 'Home'>;

export type HomeRouteProp = RouteProp<DrawerParamList, 'Home'>;

export type StatisticsNavigationProp = DrawerNavigationProp<DrawerParamList, 'Statistics'>;

export type StatisticsRouteProp = RouteProp<DrawerParamList, 'Statistics'>;
