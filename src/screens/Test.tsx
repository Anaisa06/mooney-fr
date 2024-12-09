import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react'
import { Button, View } from 'react-native'
import { ThemeContext } from '../theme/theme.context';
import Icon from 'react-native-vector-icons/Ionicons'

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
        // () => console.log('botooon')
      }/>
      <Icon name='menu-outline' style={{fontSize: 40}}/>

    </View>

  )
}

export default Test