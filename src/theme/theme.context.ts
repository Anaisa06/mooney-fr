import { createContext, Dispatch, SetStateAction } from "react";
import { ColorSchemeName } from "react-native";

export interface ThemeContextProps {
    themeType: ColorSchemeName;
    toggleTheme: Dispatch<SetStateAction<ColorSchemeName>>;
}

const defaultTheme: ThemeContextProps = {
    themeType: 'light',
    toggleTheme: (prev) => (prev === 'light' ? 'dark' : 'light')
}

export const ThemeContext = createContext(defaultTheme);


