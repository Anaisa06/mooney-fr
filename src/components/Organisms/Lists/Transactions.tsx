import { Theme } from '@react-navigation/native';
import { DefaultSectionT, SectionList, SectionListData, StyleSheet, Text, View } from 'react-native'
import { Transaction } from 'src/interfaces/transaction.interfaces';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import TransactionCard from '@components/Molecules/TransactionCard';
import GeneralBalance from '@components/Molecules/GeneralBalance';
import React from 'react';

interface IProps {
    theme: Theme;
    transactions: Transaction[];
    totalBudget: number;
    totalExpenses: number;
}

const groupByDate = (transactions: Transaction[]) => {
    let groupedObject: any = {};

    transactions.forEach(transaction => {
        const date = format(transaction.date, "MMMM d", {
            locale: es
        });

        if (!groupedObject[date]) {
            groupedObject[date] = { title: date, data: [] };
        }

        groupedObject[date].data.push(transaction);
    })


    const groupedTransactions = Object.values(groupedObject);

    return groupedTransactions;

}

const Transactions = ({ theme, transactions, totalBudget, totalExpenses }: IProps) => {
    const styles = createStyles(theme);

    const data: any = groupByDate(transactions);

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title} >
                Últimas transacciones
            </Text> */}
            <SectionList
                style={{ marginBottom: 90, marginTop: 10 }}
                sections={data}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => (<TransactionCard theme={theme} transaction={item} />)}
                ListHeaderComponent={
                    <>
                        <GeneralBalance theme={theme} totalBudget={totalBudget} totalExpenses={totalExpenses} />
                        <Text style={styles.title} >
                            Últimas transacciones
                        </Text>
                    </>
                }
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={{ fontSize: 15, color: theme.colors.text, paddingHorizontal: 20, textAlign: 'right', letterSpacing: 1.5, fontWeight: 'bold', marginVertical: 10 }}>{title}</Text>
                )}
                showsVerticalScrollIndicator={false}

                
            />
        </View>
    )
}

export default Transactions

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            // backgroundColor: theme.colors.primary,
            marginHorizontal: 25
        },
        title: {
            color: theme.colors.text,
            textAlign: 'left',
            fontSize: 20,
            letterSpacing: 1,
        },
        text: {
            color: theme.colors.text,
            fontSize: 15,
            letterSpacing: 1,
            lineHeight: 30,
            marginHorizontal: 10
        },

    });
