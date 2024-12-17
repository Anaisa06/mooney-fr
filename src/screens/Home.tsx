import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TextInputSubmitEditingEventData, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useTheme } from '@react-navigation/native'
import Transactions from '@components/Organisms/Lists/Transactions'
import HomeButtons from '@components/Molecules/HomeButtons'
import { getCurrentBudget } from 'src/services/budget.services'
import { getCurrentTransactions } from 'src/services/transaction.services'
import { Transaction } from 'src/interfaces/transaction.interfaces'
import { HomeNavigationProp, HomeRouteProp } from 'src/navigation/navigation.types'
import { Category } from 'src/interfaces/category.interfaces'
import { getCategories } from 'src/services/category.services'
import PickerSelect from '@components/Atoms/Inputs/PickerSelect'
import { useForm } from 'react-hook-form'
import Test from './Test'

interface IProps {
  route: HomeRouteProp;
}

interface IFormInput {
  categoryId: string;
}

const Home = ({ route }: IProps) => {

  const [balance, setBalance] = useState({ totalBudget: 0, totalExpenses: 0 });
  const [lastestTransactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryId, setCategoryId] = useState('')
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('Balance General')
  const navigation = useNavigation<HomeNavigationProp>();


  const reRender = () => navigation.setParams({ reRender: !route.params.reRender })

  const { control, handleSubmit, formState: { errors }
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
      })

      transactions.forEach((transaction) => {

        if (transaction.type === 'Presupuesto') return
        totalTransactionsAmount += transaction.total
      })

      setBalance((prev) => ({ totalExpenses: totalTransactionsAmount, totalBudget: totalBudgetAmount }));
    }

    fetchInfo()

  }, [route.params.reRender, query])


  const theme = useTheme();

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

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <Text style={{ textAlign: 'left', letterSpacing: 1, width: '80%', marginHorizontal: 'auto', color: theme.colors.text, margin: 10 }}>Cambiar categoría:</Text>
      <View >
        <PickerSelect items={categoriesForSelect} theme={theme} label='Categoría' error={errors.categoryId} value={categoryId} onChange={onSubmit} />
      </View>
      <Test />
      <Transactions theme={theme} transactions={lastestTransactions} totalBudget={balance.totalBudget} totalExpenses={balance.totalExpenses} title={title} />
      <HomeButtons theme={theme} reRender={reRender} />
    </SafeAreaView>
  )
}


export default Home