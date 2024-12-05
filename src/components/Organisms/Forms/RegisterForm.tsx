import SubmitButton from '@components/Atoms/buttons/SubmitButton'
import TextInputField from '@components/Atoms/Inputs/TextInput'
import { Theme } from '@react-navigation/native'
import React from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { View, Text, StyleSheet } from 'react-native'
import { RegisterNavigationProp } from 'src/navigation/navigation.types'

interface IProps {
    theme: Theme;
    navigation: RegisterNavigationProp;
}

interface IFormInput {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}

const RegisterForm = ({ theme, navigation }: IProps) => {

    const { control, handleSubmit, formState: { errors }
    } = useForm<IFormInput>();

    const styles = createStyles(theme)

    const password = useWatch({ control, name: 'password', defaultValue: '' });


    return (
        <View style={{ display: 'flex', gap: 25}}>
                        <Controller
                name='name'
                control={control}
                defaultValue=''
                rules={{
                    required: {
                        value: true,
                        message: 'Campo requerido'
                    },
                    minLength: {
                        value: 2,
                        message: 'El nombre debe ser mayor a 2 letras'
                    }
                }} render={({ field }) => (
                    <TextInputField theme={theme} label='Nombre' field={field} error={errors.name} />
                )}
            />
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
                        <Controller
                name="confirmPassword"
                control={control}
                rules={{
                    required: 'Es necesario confirmar la contraseña',
                    validate: (value) => value === password || 'Las contraseñas no son iguales'
                }}
                render={({ field }) => (
                    <TextInputField theme={theme} label="Confirmar contraseña" field={field} error={errors.confirmPassword} isPassword={true}/>
                )}
            />
            <SubmitButton theme={theme} text='Registrarse' handleSubmit={() => { }} />
            <Text style={styles.text} >
                Si ya tienes una cuenta, ingresa <Text onPress={() => navigation.navigate('Login')} style={styles.span} >aquí</Text>
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
            lineHeight: 30,
            marginBottom: 15
        },
        span: {
            color: theme.colors.primary,
            fontWeight: 'bold',
            textDecorationLine: 'underline'
        }
    });

export default RegisterForm