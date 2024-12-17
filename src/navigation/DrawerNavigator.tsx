import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import { DrawerParamList } from './navigation.types';
import Home from '@screens/Home';
import Header from '@components/Organisms/Layout/Header';
import HeaderLogo from '@components/Atoms/Logo/HeaderLogo';
import LogoutIcon from '@components/Atoms/HeaderIcons/LogoutIcon';

const Drawer = createDrawerNavigator<DrawerParamList>();


const DrawerNavigator = () => {
    return (

        <Drawer.Navigator screenOptions= {{headerTitle: () => <HeaderLogo/>, headerRight: () => <LogoutIcon/>, headerStyle: {height: 100}}}>
            <Drawer.Screen name="Home" component={Home} initialParams={{ reRender: false }}  />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator