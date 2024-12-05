import { Theme, ThemeContext, useNavigation, useTheme } from '@react-navigation/native'
import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Test from './Test'
import { SafeAreaView } from 'react-native-safe-area-context'
import FullLogo from '../components/Atoms/Logo/FullLogo'
import { Controller, Form, useForm } from 'react-hook-form'
import TextInputField from '@components/Atoms/Inputs/TextInput'
import SubmitButton from '@components/Atoms/buttons/SubmitButton'
import LoginForm from '@components/Organisms/Forms/LoginForm'
import { LoginNavigationProp } from 'src/navigation/navigation.types'

interface IFormInput {
    email: string;
    password: string;
}

const Login = () => {

    const theme = useTheme()
    const navigation = useNavigation<LoginNavigationProp>()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>

            <FullLogo />
            <LoginForm theme={theme} navigation={navigation} />
            </ScrollView>
        </SafeAreaView>
    )
}


export default Login;