import { useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react'
import { Button, Text, View } from 'react-native'
import { ThemeContext, ThemeContextProps } from '../theme/theme.context';

const Test = () => {

    const {themeType, toggleTheme} = useContext(ThemeContext)

    console.log('themet',themeType)

    const handleToggle = () => {

      console.log('botooon')
      
        toggleTheme((prev) => (prev === 'light' ? 'dark' : 'light')) 

    }

    const { colors } = useTheme();

  return (
    <View>
        
    <Button color={colors.background} title='change theme' onPress= { 
        handleToggle  
        // () => console.log('botooon')
      }/>

    </View>

  )
}

export default Test