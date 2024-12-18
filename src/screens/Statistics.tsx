import PickerSelect from '@components/Atoms/Inputs/PickerSelect';
import PieChart from '@components/Organisms/Charts/PieChart';
import { Theme, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Category } from 'src/interfaces/category.interfaces';
import { Transaction } from 'src/interfaces/transaction.interfaces';
import { getCurrentBudget } from 'src/services/budget.services';
import { getCategories } from 'src/services/category.services';
import { getCurrentTransactions } from 'src/services/transaction.services';

const Statistics = () => {
    const theme = useTheme();
    const [balance, setBalance] = useState({ totalBudget: 0, totalExpenses: 0 });
    const [title, setTitle] = useState('Balance General')
    const [query, setQuery] = useState('');
    const [categoryId, setCategoryId] = useState('')



    const [categories, setCategories] = useState<Category[]>([])
    const [lastestTransactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchInfo = async () => {
            const budgets = await getCurrentBudget(query);
            const transactions = await getCurrentTransactions(query);
            const userCategories = await getCategories();
            setCategories(userCategories);
            // setTransactions(transactions);
            let totalBudgetAmount = 0;
            let totalTransactionsAmount = 0;

            budgets.forEach((budget) => {
                totalBudgetAmount += budget.total;
            })

            transactions.forEach((transaction) => {

                if (transaction.type === 'Presupuesto') return
                totalTransactionsAmount += transaction.total
            })

            setBalance((prev) => ({ totalExpenses: totalTransactionsAmount, totalBudget: totalBudgetAmount }));
        }

        fetchInfo()
    }, [ query])

    const categoriesObject = categories.map(category => {
        return {
            name: category.name,
            id: category.id
        }
    })

    const categoriesForSelect = [
        ...categoriesObject,
        {
            name: 'General',
            id: 0
        }
    ]

    const onSubmit = (data: string) => {

        if (!data) {
            setTitle('Balance General')
            setQuery('');
            return
        }

        const categoryName = categories.find(category => category.id === +data)
        if (categoryName) setTitle(categoryName.name);
        setQuery(`categoryId=${data}`)
    }

    // let object = {
    //     value: 0,
    //     color: '',
    //     label: ''
    // }
    // const chartData = lastestTransactions.map((transaction) => {

    //     if (transaction.type === 'Presupuesto') return
    //     if (object.label === transaction.budget.category.name) {

    //     }
    // })
    const chartData = [
        {
            value: balance.totalExpenses,
            label: 'Gastos',
            color: theme.colors.primary
        },
        {
            value: balance.totalBudget - balance.totalExpenses,
            label: 'Disponible',
            color: '#12a874ff'
        }
    ]



    const styles = createStyles(theme);

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={styles.container}>
                <Text style={styles.title} >
                    Estadísticas
                </Text>
                <View style={styles.line} />
                <Text style={{ textAlign: 'left', letterSpacing: 1, width: '80%', marginHorizontal: 'auto', color: theme.colors.text, margin: 10 }}>Cambiar categoría:</Text>

                <View style={{ marginBottom: 20 }} >
                    <PickerSelect items={categoriesForSelect} theme={theme} label='Categoría' value={categoryId} onChange={onSubmit} />
                </View>
                <View style={styles.line} />


                <PieChart theme={theme} data={chartData} title={title} />

            </View>


        </SafeAreaView>
    )
}

export default Statistics

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {

            backgroundColor: theme.colors.background,
            margin: 25,
            height: '100%'
        },
        title: {
            color: theme.colors.text,
            textAlign: 'left',
            fontSize: 20,
            letterSpacing: 1,
            lineHeight: 30
        },
        text: {
            color: theme.colors.text,
            fontSize: 15,
            letterSpacing: 1,
            lineHeight: 30,
            marginHorizontal: 10
        },
        line: {
            borderBottomColor: theme.colors.text,
            borderBottomWidth: 1,
            marginVertical: 10,
        },
        amounts: {
            fontSize: 25,
            letterSpacing: 1,
            marginHorizontal: 40,
            fontWeight: 'bold'
        },
        amountsContainer: {
            display: 'flex',
            borderRadius: 8,
            padding: 5,
            justifyContent: 'center',
        }
    });

