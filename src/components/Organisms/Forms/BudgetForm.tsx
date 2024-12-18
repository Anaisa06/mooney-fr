import SubmitButton from '@components/Atoms/buttons/SubmitButton';
import DateSelect from '@components/Atoms/Inputs/DateSelect';
import PickerSelect from '@components/Atoms/Inputs/PickerSelect';
import RadioSelect from '@components/Atoms/Inputs/RadioSelect';
import TextInputField from '@components/Atoms/Inputs/TextInput';
import { Theme, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { BudgetFrecuency, BugdetType, CreateBudget } from 'src/interfaces/budget.interfaces';
import { Category } from 'src/interfaces/category.interfaces';
import navigation from 'src/navigation/navigation';
import { HomeNavigationProp } from 'src/navigation/navigation.types';
import { createBudget } from 'src/services/budget.services';
import { getCategories } from 'src/services/category.services';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomModal from '@components/Molecules/Modals/CustomModal';
import CategoryForm from './CategoryForm';
import { useBudgetForm } from 'src/hooks/Home/useBudgetForm';

interface IProps {
    theme: Theme;
    closeModal: () => void;
    reRender: () => void;
}

const BudgetForm = ({ theme, closeModal, reRender }: IProps) => {

    const styles = createStyles(theme);

    const {
        control,
        categoriesForPicker,
        errors,
        setOpenModal,
        typesForPicker,
        type,
        frequencyForPicker,
        startDate,
        handleSubmit,
        handleCategoryModalClose,
        openModal,
        onSubmit,
    } = useBudgetForm(reRender, closeModal);

    return (

        <View style={{ display: 'flex', gap: 20, marginVertical: 30 }}>
            <Text style={styles.text}>Nuevo presupuesto</Text>
            <Text style={{ textAlign: 'left', letterSpacing: 1, width: '80%', marginHorizontal: 'auto', color: theme.colors.text }}>Categoría:</Text>
            <Controller
                control={control}
                name="categoryId"
                rules={{
                    required: 'La categoría es requerida',
                }}
                render={({ field }) => (
                    <PickerSelect onChange={field.onChange} value={field.value} items={categoriesForPicker} theme={theme} error={errors.categoryId} label="Seleccionar categoría" />
                )}
            />
            <TouchableOpacity
                activeOpacity={0.3}
                style={{ flexDirection: 'row', width: '80%', marginHorizontal: 'auto', alignItems: 'center', gap: 5 }}
                onPress={() => setOpenModal(true)} >
                <Icon name="add-circle-sharp" size={20} style={{ width: 25 }} color={theme.colors.text} />
                <Text style={{ color: theme.colors.text, letterSpacing: 1, fontSize: 12 }} >Crear categoría</Text>
            </TouchableOpacity>

            <Controller
                control={control}
                name="type"
                rules={{
                    required: 'El tipo es requerido',
                }}
                render={({ field }) => (
                    <RadioSelect theme={theme} items={typesForPicker} label="Tipo" value={field.value} onChange={field.onChange} error={errors.type} />
                )}
            />

            {
                type === BugdetType.FREQUENT &&
                <Controller
                    control={control}
                    name="frequency"
                    rules={{
                        required: 'La frecuencia es requerida',
                    }}
                    render={({ field }) => (
                        <RadioSelect theme={theme} items={frequencyForPicker} label="Frecuencia" value={field.value} onChange={field.onChange} error={errors.frequency} />
                    )}
                />

            }
            {
                type === BugdetType.OCASSIONAL &&
                <>

                    <Controller
                        control={control}
                        name="startDate"
                        rules={{
                            required: 'La fecha de inicio es requerida',
                        }}
                        render={({ field }) => (
                            <DateSelect theme={theme} label="Fecha de inicio" value={field.value} onChangeField={field.onChange} error={errors.startDate} />
                        )}
                    />

                    <Controller
                        control={control}
                        name="endDate"
                        rules={{
                            required: 'La fecha de finalización es requerida',
                        }}
                        render={({ field }) => (
                            <DateSelect theme={theme} label="Fecha de finalización" value={field.value} onChangeField={field.onChange} error={errors.endDate} minDate={startDate} />
                        )}
                    />
                </>
            }
            <Text style={{ textAlign: 'left', letterSpacing: 1, width: '80%', marginHorizontal: 'auto', color: theme.colors.text }}>Total:</Text>

            <Controller
                name="total"
                control={control}
                rules={{
                    required: 'El total es requerido',
                    pattern: {
                        value: /^[0-9]*$/,
                        message: 'Ingresa solo valores numéricos',
                    },
                }}
                render={({ field }) => (
                    <TextInputField theme={theme} field={field} label="Seleccionar total" error={errors.total} type="phone-pad" />
                )}
            />
            <SubmitButton theme={theme} text="Guardar" handleSubmit={handleSubmit(onSubmit)} />
            <CustomModal openModal={openModal} onClose={handleCategoryModalClose} theme={theme} >
                <CategoryForm theme={theme} onClose={handleCategoryModalClose} />
            </CustomModal>


        </View>
    );
};

export default BudgetForm;

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        text: {
            color: theme.colors.text,
            textAlign: 'center',
            fontSize: 20,
            width: '100%',
            letterSpacing: 1,
            fontWeight: 'bold',
        },
    });
