import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { Appearance, ColorSchemeName, Text, View } from "react-native";
import { ThemeContext, ThemeContextProps } from "../theme/theme.context";
import { darkTheme, lightTheme } from "../theme/themes";
import { RootStackParamList } from "./navigation.types";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "@screens/Home";
import HeaderLogo from "@components/Atoms/Logo/HeaderLogo";
import { getToken, getUser } from "src/services/auth.services";
import { IUser } from "src/interfaces/user.interface";
import { AuthContext, defaultUser } from "src/context/user.context";
import LogoutIcon from "@components/Atoms/HeaderIcons/LogoutIcon";
import MenuIcon from "@components/Atoms/HeaderIcons/MenuIcon";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {

    const colorScheme = Appearance.getColorScheme();

    const [theme, setTheme] = useState<ColorSchemeName>(colorScheme);
    const [user, setUser] = useState<IUser>(defaultUser.user)
    const [isLogged, setIsLogged] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const verifyToken = async () => {
    //         try {
    //             const tokenExists = await getToken();
    //             const userLogged = await getUser();

    //             setIsLogged(tokenExists); 
    //             setUser(userLogged);
    //         } catch (error) {
    //             console.log("Error reading token:", error);                
    //         } finally {
    //             setIsLoading(false); 
    //         }
    //     }
    // verifyToken();
    // }, []);


    return (
        <NavigationContainer theme={theme === 'light' ? lightTheme : darkTheme}>
            <AuthContext.Provider value={{user: user}}>
            <ThemeContext.Provider value={{ themeType: theme, toggleTheme: setTheme }}>

                <Stack.Navigator>
                    {
                        isLogged ?
                            <>
                                <Stack.Screen name="Home" component={Home} options={{
                                    headerTitle: (props) => <HeaderLogo/>,
                                    headerRight: () => <LogoutIcon/>,
                                    headerLeft: ()=> <MenuIcon/>
                                }} />
                            </>
                            :
                            <>
                                <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                                <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
                            </>
                    }

                </Stack.Navigator>
            </ThemeContext.Provider>
            </AuthContext.Provider>
        </NavigationContainer>
    );
};

export default AppNavigator;
