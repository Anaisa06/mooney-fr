import { useIsFocused, useTheme } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Budget } from 'src/interfaces/budget.interfaces';
import { Category } from 'src/interfaces/category.interfaces';
import { Transaction } from 'src/interfaces/transaction.interfaces';
import { StatisticsRouteProp } from 'src/navigation/navigation.types';
import { getCurrentBudget } from 'src/services/budget.services';
import { getCategories } from 'src/services/category.services';
import { getCurrentTransactions } from 'src/services/transaction.services';
import { generateRandomColor } from 'src/utils/functions/randomColor';
import { groupTransactionsByCategory, formatForChart } from 'src/utils/functions/statistics';

export const useStatistics = (route: StatisticsRouteProp) => {
    const theme = useTheme();

        const [balance, setBalance] = useState({ totalBudget: 0, totalExpenses: 0 });
        const [lists, setLists] = useState<{budgets: Budget[], categories: Category[], transactions: Transaction[]}>({budgets: [], categories: [], transactions: []});
        const [title, setTitle] = useState('Balance General');
        const [query, setQuery] = useState('');

        const focus = useIsFocused()

        useEffect(() => {
            const fetchInfo = async () => {
                const budgets = await getCurrentBudget(query);
                const transactions = await getCurrentTransactions(query);
                const userCategories = await getCategories();
                setLists({
                    budgets,
                    transactions,
                    categories: userCategories,
                });

                let totalBudgetAmount = 0;
                let totalTransactionsAmount = 0;

                budgets.forEach((budget) => {
                    totalBudgetAmount += budget.total;
                });

                transactions.forEach((transaction) => {

                    if (transaction.type === 'Presupuesto') {return;}
                    totalTransactionsAmount += transaction.total;
                });

                setBalance((prev) => ({ totalExpenses: totalTransactionsAmount, totalBudget: totalBudgetAmount }));
            };

            fetchInfo();
        }, [query, route.params.reRender, focus]);

        const categoriesObject = lists.categories.map(category => {
            return {
                name: category.name,
                id: category.id,
            };
        });

        const categoriesForSelect = [
            ...categoriesObject,
            {
                name: 'General',
                id: 0,
            },
        ];

        const onSubmit = (data: string) => {

            if (!data) {
                setTitle('Balance General');
                setQuery('');
                return;
            }

            const categoryName = lists.categories.find(category => category.id === +data);
            if (categoryName) {setTitle(categoryName.name);}
            setQuery(`categoryId=${data}&type=Gasto`);
        };


        const groupedTransactions = groupTransactionsByCategory(lists.transactions);

        const firstChart = {
            id: 'title',
            title: title,
            data: [
                {
                    value: balance.totalExpenses,
                    label: 'Gastos',
                    color: generateRandomColor(),
                },
                {
                    value: balance.totalBudget - balance.totalExpenses,
                    label: 'Disponible',
                    color: generateRandomColor(),
                },

            ],
        };

        const secondChart = query != '' ? formatForChart(lists.transactions, 'Gastos de la categoría') : formatForChart(lists.budgets, 'Presupuestos por categoría');
        const thirdChart = query != '' ? null : formatForChart(groupedTransactions, 'Gastos por categoría');


        const chartData = [
            firstChart,
            secondChart,
            ...(thirdChart ? [thirdChart] : []),
        ];


        return {
            theme,
            categoriesForSelect,
            onSubmit,
            chartData,

        };
};
