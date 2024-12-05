import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { ThemeContext, ThemeContextProps, ThemeType } from "../theme/theme.context";
import { darkTheme, lightTheme } from "../theme/themes";
import Test from "../screens/Test";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

    const [theme, setTheme] = useState<ThemeType>('light');
    const [isLogged, setIsLogged] = useState(false);


    return (
        <NavigationContainer theme={theme === 'light' ? lightTheme : darkTheme}>
            <ThemeContext.Provider value={{ themeType: theme, toggleTheme: setTheme }}>

                <Stack.Navigator>
                    {
                        isLogged ?
                            <>
                                <Stack.Screen name="Home" component={Test} options={{}} />
                                <Stack.Screen name="Settings" component={() => <View><Text>settings</Text></View>} />
                            </>
                            :
                            <>
                                <Stack.Screen name="Login" component={Test} options={{}} />
                                <Stack.Screen name="Register" component={() => <View><Text>settings</Text></View>} />
                            </>
                    }

                </Stack.Navigator>
            </ThemeContext.Provider>
        </NavigationContainer>
    );
};

export default AppNavigator;
