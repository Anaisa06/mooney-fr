import SubmitButton from '@components/Atoms/buttons/SubmitButton';
import DateSelect from '@components/Atoms/Inputs/DateSelect';
import PickerSelect from '@components/Atoms/Inputs/PickerSelect';
import RadioSelect from '@components/Atoms/Inputs/RadioSelect';
import TextInputField from '@components/Atoms/Inputs/TextInput';
import { Theme, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { BudgetFrecuency, BugdetType, CreateBudget } from 'src/interfaces/budget.interfaces';
import { Category } from 'src/interfaces/category.interfaces';
import navigation from 'src/navigation/navigation';
import { HomeNavigationProp } from 'src/navigation/navigation.types';
import { createBudget } from 'src/services/budget.services';
import { getCategories } from 'src/services/category.services';

interface IFormInput {
    categoryId: number;
    type: BugdetType;
    startDate?: Date;
    endDate?: Date;
    frequency?: BudgetFrecuency;
    total: number;
}

interface IProps {
    theme: Theme;
    // closeModal: () => void;
}

const BudgetForm = ({ theme }: IProps) => {

    const [categories, setCategories] = useState<Category[]>([])
    const navigation = useNavigation<HomeNavigationProp>();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories in budget form', error)
            }
        }

        fetchCategories()
    }, [])

    const { control, handleSubmit, formState: { errors }
    } = useForm<IFormInput>();

    const styles = createStyles(theme);

    const categoriesForPicker = categories.map(category => { return { name: category.name, id: category.id } })

    const typesForPicker = [
        { name: BugdetType.FREQUENT, id: 'freq' },
        { name: BugdetType.OCASSIONAL, id: 'ocas' }
    ]

    const frequencyForPicker = [
        { name: BudgetFrecuency.MONTHLY, id: 'month' },
        { name: BudgetFrecuency.BIWEEKLY, id: 'biweek' },
        { name: BudgetFrecuency.WEEKLY, id: 'week' }
    ]

    const type = useWatch({ control, name: 'type' });
    const startDate = useWatch({ control, name: 'startDate'})

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        
        const toSave: CreateBudget = {
            categoryId: +data.categoryId,
            startDate: data.startDate,
            endDate: data.endDate,
            total: +data.total,
            type: data.type,
            frequency: data.frequency
        }

        try {
            const response = await createBudget(toSave)
            if(response.statusCode === 201) {
                // closeModal()
                // navigation.navigate('Home', {reRender: true} )
            }

        } catch (error) {
            console.error('Error saving budget in form', error)
        }
    }

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
                    <PickerSelect onChange={field.onChange} value={field.value} items={categoriesForPicker} theme={theme} error={errors.categoryId} label='Seleccionar categoría' />
                )}
            />
            <Controller
                control={control}
                name="type"
                rules={{
                    required: 'El tipo es requerido',
                }}
                render={({ field }) => (
                    <RadioSelect theme={theme} items={typesForPicker} label='Tipo' value={field.value} onChange={field.onChange} error={errors.type} />
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
                        <RadioSelect theme={theme} items={frequencyForPicker} label='Frecuencia' value={field.value} onChange={field.onChange} error={errors.frequency} />
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
                            <DateSelect theme={theme} label='Fecha de inicio' value={field.value} onChangeField={field.onChange} error={errors.startDate} />
                        )}
                    />

                    <Controller
                        control={control}
                        name="endDate"
                        rules={{
                            required: 'La fecha de finalización es requerida',
                        }}
                        render={({ field }) => (
                            <DateSelect theme={theme} label='Fecha de finalización' value={field.value} onChangeField={field.onChange} error={errors.endDate} minDate={startDate} />
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
                    <TextInputField theme={theme} field={field} label='Seleccionar total' error={errors.total} type='phone-pad' />
                )}
            />
            <SubmitButton theme={theme} text='Guardar' handleSubmit={handleSubmit(onSubmit)} />


        </View>
    )
}

export default BudgetForm

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