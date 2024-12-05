import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Theme as NavigationTheme } from '@react-navigation/native';
import { darkTheme, lightTheme } from "./themes";
import { ReactNode } from 'react';

export type ThemeType = 'light' | 'dark';

export interface ThemeContextProps {
    themeType: ThemeType;
    toggleTheme: Dispatch<SetStateAction<ThemeType>>;
}

const defaultTheme: ThemeContextProps = {
    themeType: 'light',
    toggleTheme: (prev) => (prev === 'light' ? 'dark' : 'light')
}

export const ThemeContext = createContext(defaultTheme);


