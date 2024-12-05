import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useMemo, useState } from "react";
import { Appearance, ColorSchemeName, Text, View } from "react-native";
import { ThemeContext, ThemeContextProps } from "../theme/theme.context";
import { darkTheme, lightTheme } from "../theme/themes";
import Test from "../screens/Test";
import { RootStackParamList } from "./navigation.types";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {

    const colorScheme = Appearance.getColorScheme();
    // console.log('colorrr' ,colorScheme)

    const [theme, setTheme] = useState<ColorSchemeName>(colorScheme);
    const [isLogged, setIsLogged] = useState(true);


    return (
        <NavigationContainer theme={theme === 'light' ? lightTheme : darkTheme}>
            <ThemeContext.Provider value={{ themeType: theme, toggleTheme: setTheme }}>

                <Stack.Navigator>
                    {
                        isLogged ?
                            <>
                                <Stack.Screen name="Login" component={Test} options={{headerShown: false}} />
                                <Stack.Screen name="Register" component={() => <View><Text>settings</Text></View>} />
                            </>
                            :
                            <>
                                <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                                <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
                            </>
                    }

                </Stack.Navigator>
            </ThemeContext.Provider>
        </NavigationContainer>
    );
};

export default AppNavigator;
