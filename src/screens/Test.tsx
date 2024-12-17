import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react'
import { Button, View } from 'react-native'
import { ThemeContext } from '../theme/theme.context';

const Test = () => {

    const {toggleTheme} = useContext(ThemeContext)

    const handleToggle = () => {
      
        toggleTheme((prev) => (prev === 'light' ? 'dark' : 'light')) 

    }

    const { colors } = useTheme();

  return (
    <View>
        
    <Button color={colors.background} title='change theme' onPress= { 
        handleToggle  
      }/>

    </View>

  )
}

export default Test