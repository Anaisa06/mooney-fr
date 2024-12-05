import { useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react'
import { Button, Text, View } from 'react-native'
import { ThemeContext, ThemeContextProps } from '../theme/theme.context';

const Test = () => {

    const {themeType, toggleTheme} = useContext(ThemeContext)
    const handleToggle = () => {

        toggleTheme((prev) => (prev === 'light' ? 'dark' : 'light')) 

    }

    const { colors } = useTheme();

  return (
    <View>
        
    <Button color={colors.background} title='change theme' onPress= { 
        handleToggle
      }/>

        <Text style={{ color: colors.primary}}>HOLAAAAAAAa con theme</Text>
    </View>

  )
}

export default Test