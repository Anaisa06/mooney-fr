import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Test from './Test'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'
import GeneralBalance from '@components/Molecules/GeneralBalance'
import Transactions from '@components/Organisms/Lists/Transactions'
import HomeButtons from '@components/Molecules/HomeButtons'
import SubmitButton from '@components/Atoms/buttons/SubmitButton'


const Home = () => {

  const theme = useTheme();

  return (
    <SafeAreaView style={{flex: 1}} >
      <ScrollView>
        <GeneralBalance theme={theme} totalBudget={350000} totalExpenses={350000} />
        <Transactions theme={theme} />
        <Test />        
      </ScrollView>
      <HomeButtons theme={theme} />
    </SafeAreaView>
  )
}


export default Home