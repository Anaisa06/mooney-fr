import SubmitButton from '@components/Atoms/buttons/SubmitButton'
import TextInputField from '@components/Atoms/Inputs/TextInput'
import { Theme } from '@react-navigation/native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View, Text, StyleSheet } from 'react-native'
import { LoginNavigationProp } from 'src/navigation/navigation.types'

interface IProps {
    theme: Theme;
    navigation: LoginNavigationProp;
}

interface IFormInput {
    email: string;
    password: string;
}

const LoginForm = ({ theme, navigation }: IProps) => {

    const { control, handleSubmit, formState: { errors }
    } = useForm<IFormInput>();

    const styles = createStyles(theme)

    return (
        <View style={{ display: 'flex', gap: 44,marginVertical: 30  }}>
            <Controller
                control={control}
                name="email"
                rules={{
                    required: 'El email es requerido',
                    pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' }
                }}
                render={({ field }) => (
                    <TextInputField theme={theme} label='Email' field={field} error={errors.email} type='email-address' />
                )}
            />
            <Controller
                name="password"
                control={control}
                rules={{
                    required: 'La contraseña es requerida',
                    minLength: {
                        value: 6,
                        message: 'La contraseña debe contener al menos 6 caracteres'
                    }
                }}
                render={({ field }) => (
                    <TextInputField theme={theme} field={field} label='Contraseña' error={errors.password} isPassword={true} />
                )}
            />
            <SubmitButton theme={theme} text='Ingresar' handleSubmit={() => { }} />
            <Text style={styles.text} >
                Si aún no tienes una cuenta, regístrate <Text onPress={() => navigation.navigate('Register')} style={styles.span} >aquí</Text>
            </Text>
            
        </View>

    )
}

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        text: {
            color: theme.colors.text,
            textAlign: 'center',
            fontSize: 18,
            width: '80%',
            margin: 'auto',
            letterSpacing: 1,
            lineHeight: 30
        },
        span: {
            color: theme.colors.primary,
            fontWeight: 'bold',
            textDecorationLine: 'underline',
            
        }
    });

export default LoginForm