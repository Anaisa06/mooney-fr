import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const darkThemeLogo = require('@assets/text-dark.png');
const lightThemeLogo = require('@assets/text-light.png');

const HeaderLogo = () => {
    const theme = useTheme();

    return (
      <View style={styles.container}>
        <Image
        source={theme.dark ? darkThemeLogo : lightThemeLogo}
        style={styles.image}
        />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {

      // justifyContent: 'flex-start',
      // alignItems: 'center'
    },
    image: {
      objectFit: 'scale-down',
      width: 300,
      height: 100,
      // backgroundColor: 'red'
    },
  });

export default HeaderLogo;
