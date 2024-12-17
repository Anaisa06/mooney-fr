import SubmitButton from '@components/Atoms/buttons/SubmitButton';
import IconSelect from '@components/Atoms/Inputs/IconSelect';
import TextInputField from '@components/Atoms/Inputs/TextInput';
import { Theme } from '@react-navigation/native';
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { createCategory } from 'src/services/category.services';

interface IProps {
    theme: Theme;
    onClose: () => void;
}

interface IFormInput {
    name: string;
    icon: string;
}

const iconsList: string[] = [
    'account', 'account-heart', 'airplane', 'alien', 'ambulance', 'baby-carriage', 'bank', 'beach', 'motorbike', 'car', 'cart', 'cat', 'controller-classic', 'cupcake', 'dog', 'dumbbell', 'food', 'hand-water', 'lightning-bolt', 'music'
]

const CategoryForm = ({ theme, onClose }: IProps) => {


    const { control, handleSubmit, formState: { errors }
    } = useForm<IFormInput>();
    const styles = createStyles(theme);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const response = await createCategory({...data, isCustom: true});
            console.log(response);

            if(response.statusCode === 201) {
                onClose()
            }
        } catch (error) {
            console.error('Error creating category in form', error);            
        }
    }

    return (

        <View style={{ display: 'flex', gap: 20, marginVertical: 30 }}>
            <Text style={styles.text}>Nueva categoría</Text>
            <Text style={{ textAlign: 'left', letterSpacing: 1, width: '80%', marginHorizontal: 'auto', color: theme.colors.text }}>Nombre:</Text>
            <Controller
                name="name"
                control={control}
                rules={{
                    required: 'El nombre es requerido',
                    maxLength: 15
                }}
                render={({ field }) => (
                    <TextInputField theme={theme} field={field} label='Nombre de la categoría' error={errors.name} />
                )}
            />

            <Text style={{ textAlign: 'left', letterSpacing: 1, width: '80%', marginHorizontal: 'auto', color: theme.colors.text }}>Ícono:</Text>
            <Controller
                name="icon"
                control={control}
                rules={{
                    required: 'El icono es requerido',
                }}
                render={({ field }) => (
                    <IconSelect theme={theme} setIcon={field.onChange} items={iconsList} value={field.value} error={errors.icon} />
                )}
            />
            <SubmitButton text='Guardar' theme={theme} handleSubmit={handleSubmit(onSubmit)} />
        </View>
    )
}

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        text: {
            color: theme.colors.text,
            textAlign: 'center',
            fontSize: 20,
            width: '100%',
            letterSpacing: 1,
            fontWeight: 'bold'
        }
    });

export default CategoryForm