import SubmitButton from '@components/Atoms/buttons/SubmitButton';
import DateSelect from '@components/Atoms/Inputs/DateSelect';
import PickerSelect from '@components/Atoms/Inputs/PickerSelect';
import RadioSelect from '@components/Atoms/Inputs/RadioSelect';
import TextInputField from '@components/Atoms/Inputs/TextInput';
import CustomModal from '@components/Molecules/Modals/CustomModal';
import { Theme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { Budget, BugdetType } from 'src/interfaces/budget.interfaces';
import { CreateTransaction, TransactionType } from 'src/interfaces/transaction.interfaces';
import { getCurrentBudget } from 'src/services/budget.services';
import { createTransaction } from 'src/services/transaction.services';


interface IFormInput {
    description: string;
    type: TransactionType;
    total: number;
    budgetId: number;
}

interface IProps {
    theme: Theme;
    closeModal: () => void;
    reRender: () => void;
}

const TransactionForm = ({ theme, closeModal, reRender }: IProps) => {

    const [budgets, setBudgets] = useState<Budget[]>([]);

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const data = await getCurrentBudget();
                setBudgets(data);
            } catch (error) {
                console.error('Error fetching categories in budget form', error)
            }
        }
        fetchBudgets()
    }, [])


    const { control, handleSubmit, formState: { errors }
    } = useForm<IFormInput>();

    const styles = createStyles(theme);

    const typesForSelect = [
        { name: TransactionType.BUDGET, id: 'budget' },
        { name: TransactionType.EXPENSE, id: 'expense' }
    ]

    const budgetsforSelect = budgets.map(budget => {
   
        return {
            name: `${budget.category.name}: ${budget.startDate.split('T')[0]} / ${budget.endDate.split('T')[0]}`,
            id: budget.id
        }
    })

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const toSave: CreateTransaction = {
            ...data,
            total: +data.total,
            budgetId: +data.budgetId
        } 

        try {
            const response = await createTransaction(toSave);

            if(response.statusCode === 201) {
                reRender()
                closeModal()
            }
        } catch (error) {
            console.error('Error saving transaction from form', error);
            
        }
    }


    return (
        <View style={{ display: 'flex', gap: 20, marginVertical: 30 }}>
            <Text style={styles.text}>Nueva transacción</Text>
            <Controller
                control={control}
                name="type"
                rules={{
                    required: 'El tipo es requerido',
                }}
                render={({ field }) => (
                    <RadioSelect items={typesForSelect} theme={theme} label='Tipo' value={field.value} onChange={field.onChange} error={errors.type} />
                )}
            />


            <Text style={{ textAlign: 'left', letterSpacing: 1, width: '80%', marginHorizontal: 'auto', color: theme.colors.text }}>Categoría y fechas:</Text>
            <Controller
                name="budgetId"
                control={control}
                rules={{
                    required: 'La categoría es requerida',
                }}
                render={({ field }) => (
                    <PickerSelect items={budgetsforSelect} theme={theme}  label='Categoría y fecha' error={errors.total}  value={field.value} onChange={field.onChange} />
                )}
            />

            <Text style={{ textAlign: 'left', letterSpacing: 1, width: '80%', marginHorizontal: 'auto', color: theme.colors.text }}>Descripción:</Text>
            <Controller
                name="description"
                control={control}
                rules={{
                    required: 'La descripción es requerida',
                    maxLength: 20
                }}
                render={({ field }) => (
                    <TextInputField theme={theme} field={field} label='Describe la transacción' error={errors.total} />
                )}
            />



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

export default TransactionForm

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