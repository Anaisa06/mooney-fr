import { Theme, DefaultTheme } from "@react-navigation/native";
import { Platform } from "react-native"

const WEB_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const lightTheme: Theme = {
    dark: false,
    colors: {
        background: '#F0F0F0',
        text: '#3C486B',
        primary: '#F45050',
        card: '#F0F0F0',
        border: '#ffffff',
        notification: '#F9D949',
    },
    fonts: Platform.select({
        web: {
          regular: {
            fontFamily: WEB_FONT_STACK,
            fontWeight: '400',
          },
          medium: {
            fontFamily: WEB_FONT_STACK,
            fontWeight: '500',
          },
          bold: {
            fontFamily: WEB_FONT_STACK,
            fontWeight: '600',
          },
          heavy: {
            fontFamily: WEB_FONT_STACK,
            fontWeight: '700',
          },
        },
        ios: {
          regular: {
            fontFamily: 'System',
            fontWeight: '400',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: '600',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '700',
          },
        },
        default: {
          regular: {
            fontFamily: 'sans-serif',
            fontWeight: 'normal',
          },
          medium: {
            fontFamily: 'sans-serif-medium',
            fontWeight: 'normal',
          },
          bold: {
            fontFamily: 'sans-serif',
            fontWeight: '600',
          },
          heavy: {
            fontFamily: 'sans-serif',
            fontWeight: '700',
          },
        },
      }),
}

export const darkTheme: Theme = {
    dark: true,
    colors: {
        background: '#3C486B',
        text: '#F0F0F0',
        primary: '#F45050',
        card: '#3C486B',
        border: '#ffffff',
        notification: '#F9D949',
    },
    fonts: Platform.select({
        web: {
          regular: {
            fontFamily: WEB_FONT_STACK,
            fontWeight: '400'
          },
          medium: {
            fontFamily: WEB_FONT_STACK,
            fontWeight: "500"
          },
          bold: {
            fontFamily: WEB_FONT_STACK,
            fontWeight: "600",
          },
          heavy: {
            fontFamily: WEB_FONT_STACK,
            fontWeight: "700",
          },
        },
        ios: {
          regular: {
            fontFamily: 'System',
            fontWeight: "400",
          },
          medium: {
            fontFamily: 'System',
            fontWeight: "500",
          },
          bold: {
            fontFamily: 'System',
            fontWeight: '600',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '700',
          },
        },
        default: {
          regular: {
            fontFamily: 'sans-serif',
            fontWeight: 'normal',
          },
          medium: {
            fontFamily: 'sans-serif-medium',
            fontWeight: 'normal',
          },
          bold: {
            fontFamily: 'sans-serif',
            fontWeight: '600',
          },
          heavy: {
            fontFamily: 'sans-serif',
            fontWeight: '700',
          },
        },
      }),
}