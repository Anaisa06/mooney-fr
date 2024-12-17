import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Appearance, Button, ColorSchemeName, Text, View } from "react-native";
import { ThemeContext, ThemeContextProps } from "../theme/theme.context";
import { darkTheme, lightTheme } from "../theme/themes";
import { RootStackParamList } from "./navigation.types";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "@screens/Home";
import { getToken, getUser } from "src/services/auth.services";
import { IUser } from "src/interfaces/user.interface";
import { AuthContext, defaultUser } from "src/context/user.context";
import Loading from "@screens/Loading";
import Header from "@components/Organisms/Layout/Header";
import { PaperProvider } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";


const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();


const AppNavigator = () => {

    const colorScheme = Appearance.getColorScheme();

    const [theme, setTheme] = useState<ColorSchemeName>(colorScheme);
    const [user, setUser] = useState<IUser>(defaultUser.user)
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleLogin = (user: IUser) => {
        setUser(user);
        setIsLogged(true);
    }

    const handleLogout = () => {
        setUser(defaultUser.user);
        setIsLogged(false);
    }

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const tokenExists = await getToken();
                const userLogged = await getUser();

                setIsLogged(tokenExists);
                setUser(userLogged);
            } catch (error) {
                console.log("Error reading token:", error);
            } finally {
                setIsLoading(false);
            }
        }
        verifyToken();
    }, []);


    return (
        <NavigationContainer theme={theme === 'light' ? lightTheme : darkTheme}>
            <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
                <ThemeContext.Provider value={{ themeType: theme, toggleTheme: setTheme }}>
                    <PaperProvider>
                        <Stack.Navigator>
                            {isLoading
                                ? <Stack.Screen name='Loading' component={Loading} options={{
                                    headerShown: false
                                }} />
                                :
                                isLogged ?
                                    <>
                                        <Stack.Screen name="Home" component={Home} options={{
                                            header: () => <Header />
                                        }} />
                                        
                                    </>
                                    :
                                    <>
                                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                                        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                                    </>
                            }
                        </Stack.Navigator>
                    </PaperProvider>
                </ThemeContext.Provider>
            </AuthContext.Provider>
        </NavigationContainer>
    );
};

export default AppNavigator;
