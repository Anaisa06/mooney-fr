import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Test from './Test'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Theme, useTheme } from '@react-navigation/native'
import GeneralBalance from '@components/Molecules/GeneralBalance'

const Home = () => {

  const theme = useTheme();

  const styles = createStyles(theme);

  return (
    <SafeAreaView>
      <ScrollView>
        <GeneralBalance theme={theme} totalBudget={350000} totalExpenses={300000} />
        <Test />
      </ScrollView>
    </SafeAreaView>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      margin: 25
    },
    title: {
      color: theme.colors.text,
      textAlign: 'left',
      fontSize: 20,
      letterSpacing: 1,
      lineHeight: 30
    },
    text: {
      color: theme.colors.text,
      fontSize: 15,
      letterSpacing: 1,
      lineHeight: 30,
      marginHorizontal: 20
    },
    line: {
      borderBottomColor: theme.colors.text,
      borderBottomWidth: 1,
      marginVertical: 10,
    },
  });


export default Home