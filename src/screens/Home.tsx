import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import Test from './Test'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useTheme } from '@react-navigation/native'
import Transactions from '@components/Organisms/Lists/Transactions'
import HomeButtons from '@components/Molecules/HomeButtons'
import { getCurrentBudget } from 'src/services/budget.services'
import { getCurrentTransactions } from 'src/services/transaction.services'
import { Transaction } from 'src/interfaces/transaction.interfaces'
import { HomeNavigationProp, HomeRouteProp } from 'src/navigation/navigation.types'

interface IProps {
  route: HomeRouteProp;
}

const Home = ({ route }: IProps) => {

  const [balance, setBalance] = useState({ totalBudget: 0, totalExpenses: 0 });
  const [lastestTransactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const fetchInfo = async () => {
      const budgets = await getCurrentBudget();
      const transactions = await getCurrentTransactions();
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
  }, [])


  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }} >
      {/* <ScrollView> */}
        {/* <GeneralBalance theme={theme} totalBudget={balance.totalBudget} totalExpenses={balance.totalExpenses} /> */}
        <Test />
      <Transactions theme={theme} transactions={lastestTransactions} totalBudget={balance.totalBudget} totalExpenses={balance.totalExpenses} />
      {/* </ScrollView> */}
      <HomeButtons theme={theme} />
    </SafeAreaView>
  )
}


export default Home