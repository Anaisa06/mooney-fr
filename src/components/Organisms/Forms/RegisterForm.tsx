import SubmitButton from '@components/Atoms/buttons/SubmitButton';
import TextInputField from '@components/Atoms/Inputs/TextInput';
import ConfirmationModal from '@components/Molecules/Modals/ConfirmationModal';
import { Theme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { View, Text, StyleSheet } from 'react-native';
import { IRegister } from 'src/interfaces/auth.interfaces';
import { RegisterNavigationProp } from 'src/navigation/navigation.types';
import { RegisterService } from 'src/services/auth.services';

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

    const [openModal, setOpenModal] = useState(false);
    const [modalText, setModalText] = useState('');

    const { control, handleSubmit, formState: { errors },
    } = useForm<IFormInput>();

    const styles = createStyles(theme);

    const password = useWatch({ control, name: 'password', defaultValue: '' });

    const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
        try {
            const toSave: IRegister = {
                name: data.name,
                email: data.email,
                password: data.password,
            };

            const response = await RegisterService(toSave);

            if (response.statusCode === 201) {
                setModalText('Usuario registrado con éxito!');
                navigation.navigate('Login');
            }
        } catch (error: any) {

            console.error('Error in register submit', error);

            if (error.status === 400 ) {
                setModalText('Los valores no son válidos');
            } else if (error.status === 409 ) {
                 setModalText('El email ya está registrado');
            } else {
                setModalText('Algo salió mal');
            }

        } finally {
            setOpenModal(true);
        }
    };


    return (
        <View style={{ display: 'flex', gap: 25 }}>
            <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                    required: {
                        value: true,
                        message: 'Campo requerido',
                    },
                    minLength: {
                        value: 2,
                        message: 'El nombre debe ser mayor a 2 letras',
                    },
                }} render={({ field }) => (
                    <TextInputField theme={theme} label="Nombre" field={field} error={errors.name} />
                )}
            />
            <Controller
                control={control}
                name="email"
                rules={{
                    required: 'El email es requerido',
                    pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' },
                }}
                render={({ field }) => (
                    <TextInputField theme={theme} label="Email" field={field} error={errors.email} type="email-address" />
                )}
            />
            <Controller
                name="password"
                control={control}
                rules={{
                    required: 'La contraseña es requerida',
                    minLength: {
                        value: 6,
                        message: 'La contraseña debe contener al menos 6 caracteres',
                    },
                }}
                render={({ field }) => (
                    <TextInputField theme={theme} field={field} label="Contraseña" error={errors.password} isPassword={true} />
                )}
            />
            <Controller
                name="confirmPassword"
                control={control}
                rules={{
                    required: 'Es necesario confirmar la contraseña',
                    validate: (value) => value === password || 'Las contraseñas no son iguales',
                }}
                render={({ field }) => (
                    <TextInputField theme={theme} label="Confirmar contraseña" field={field} error={errors.confirmPassword} isPassword={true} />
                )}
            />
            <SubmitButton theme={theme} text="Registrarse" handleSubmit={handleSubmit(onSubmit)} />
            <Text style={styles.text} >
                Si ya tienes una cuenta, ingresa <Text onPress={() => navigation.navigate('Login')} style={styles.span} >aquí</Text>
            </Text>
            <ConfirmationModal openModal={openModal} onClose={() => setOpenModal(false)} text={modalText} theme={theme} />
        </View>

    );
};

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
            marginBottom: 15,
        },
        span: {
            color: theme.colors.primary,
            fontWeight: 'bold',
            textDecorationLine: 'underline',
        },
    });

export default RegisterForm;
