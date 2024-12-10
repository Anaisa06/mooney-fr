import FullLogo from '@components/Atoms/Logo/FullLogo'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Loading = () => {
  return (
    <SafeAreaView style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
        <FullLogo/>
        <ActivityIndicator size='large'/> 
    </SafeAreaView>
  )
}

export default Loading