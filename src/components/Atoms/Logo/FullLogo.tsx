import { useTheme } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const darkThemeLogo = require('@assets/full-dark.png');
const lightThemeLogo = require('@assets/full-light.png')

const FullLogo = () => {

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Image 
      source={theme.dark ? darkThemeLogo : lightThemeLogo}
      style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  image: {
    objectFit: 'scale-down',
    width: 349,
    height: 300
  }
})

export default FullLogo;