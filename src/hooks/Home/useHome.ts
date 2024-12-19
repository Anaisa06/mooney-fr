import { useNavigation, useTheme } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Category } from 'src/interfaces/category.interfaces';
import { Transaction } from 'src/interfaces/transaction.interfaces';
import { HomeNavigationProp, HomeRouteProp } from 'src/navigation/navigation.types';
import { getCurrentBudget } from 'src/services/budget.services';
import { getCategories } from 'src/services/category.services';
import { getCurrentTransactions } from 'src/services/transaction.services';

interface IFormInput {
    categoryId: string;
  }

export const useHome = (route: HomeRouteProp) => {
    const [balance, setBalance] = useState({ totalBudget: 0, totalExpenses: 0 });
      const [lastestTransactions, setTransactions] = useState<Transaction[]>([]);
      const [categories, setCategories] = useState<Category[]>([]);
      const [query, setQuery] = useState('');
      const [title, setTitle] = useState('Balance General');
      const navigation = useNavigation<HomeNavigationProp>();

      const reRender = () => navigation.setParams({ reRender: !route.params.reRender });

      const { formState: { errors },
      } = useForm<IFormInput>();

      useEffect(() => {
        const fetchInfo = async () => {
          const budgets = await getCurrentBudget(query);
          const transactions = await getCurrentTransactions(query);
          const userCategories = await getCategories();
          setCategories(userCategories);
          setTransactions(transactions);
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

      }, [route.params.reRender, query]);


      const theme = useTheme();

      const categoriesObject = categories.map(category => {
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

        const categoryName = categories.find(category => category.id === +data);
        if (categoryName) {setTitle(categoryName.name);}
        setQuery(`categoryId=${data}`);
      };

      return {
        theme,
        categoriesForSelect,
        onSubmit,
        lastestTransactions,
        balance,
        reRender,
        title,
      };
};
