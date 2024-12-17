import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useContext } from 'react'
import { DrawerParamList, HomeNavigationProp } from './navigation.types';
import Home from '@screens/Home';
import HeaderLogo from '@components/Atoms/Logo/HeaderLogo';
import LogoutIcon from '@components/Atoms/HeaderIcons/LogoutIcon';
import { Theme, useNavigation, useTheme } from '@react-navigation/native';
import { Drawer as PaperDrawer } from 'react-native-paper';
import DrawerButton from '@components/Atoms/buttons/DrawerButton';
import { ThemeContext } from 'src/theme/theme.context';
import { AuthContext } from 'src/context/user.context';
import { removeTokenAndUser } from 'src/services/auth.services';
import Statistics from '@screens/Statistics';


const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerContent = ({ theme }: { theme: Theme }) => {

    const [active, setActive] = React.useState('');
    const { toggleTheme } = useContext(ThemeContext)
    const { logout } = useContext(AuthContext)

    const navigationHome = useNavigation<HomeNavigationProp>();

    const handleHomePress = () => {
        setActive('home')
        navigationHome.navigate('Home', { reRender: true })
    }

    const handleStatisticsPress = () => {
        setActive('statistics')
        navigationHome.navigate('Statistics')
    }


    const handleToggle = () => {
        toggleTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    const handleLogout = async () => {
        await removeTokenAndUser();
        logout();
    }


    return (
        <>
            <PaperDrawer.Section title="Vistas" theme={{ colors: { text: theme.colors.text, } }}>
                <DrawerButton
                    text='Página principal'
                    theme={theme}
                    icon='home'
                    isActive={active === 'home'}
                    handlePress={handleHomePress}
                />

                <DrawerButton
                    text='Estadísticas'
                    theme={theme}
                    icon='chart-areaspline'
                    isActive={active === 'statistics'}
                    handlePress={handleStatisticsPress}
                />

            </PaperDrawer.Section>
            <PaperDrawer.Section title="Configuración" theme={{ colors: { text: theme.colors.text, } }}>
                <DrawerButton
                    text='Cambiar tema'
                    theme={theme}
                    icon='theme-light-dark'
                    isActive={active === 'toggleTheme'}
                    handlePress={handleToggle}
                />

                <DrawerButton
                    text='Cerrar sesión'
                    theme={theme}
                    icon='logout'
                    isActive={active === 'logout'}
                    handlePress={handleLogout}
                />

            </PaperDrawer.Section>
        </>
    );
}


const DrawerNavigator = () => {

    const theme = useTheme()

    return (

        <Drawer.Navigator
            drawerContent={() => <DrawerContent theme={theme} />}
            screenOptions={{
                headerTitle: () => <HeaderLogo />,
                headerRight: () => <LogoutIcon />,
                headerStyle: { height: 100 }
            }}>
            <Drawer.Screen name="Home" component={Home} initialParams={{ reRender: false }} />
            <Drawer.Screen name="Statistics" component={Statistics}/>
        </Drawer.Navigator>
    )
}



export default DrawerNavigator