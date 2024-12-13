import { Theme } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-paper';
import { Transaction } from 'src/interfaces/transaction.interfaces';

interface IProps {
    theme: Theme;
    transaction: Transaction;
}

const TransactionCard = ({ theme, transaction }: IProps) => {

    const styles = createStyles(theme);
    console.log(transaction);

    const amountColor = transaction.type === 'Presupuesto' ? '#12a874ff' : '#F45050'

    return (
        <View style={styles.amountsContainer}>
            <View style={styles.infoContainer}>
                <Icon source={transaction.budget.category.icon ? transaction.budget.category.icon : 'arrow-down-thick' } size={50} color={theme.colors.text} />  
                <Text style={styles.text} >
                    {transaction.description}
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={[styles.total, {color: amountColor}]} >
                   {
                    transaction.type === 'Presupuesto' ? '+' : '-'
                   } ${transaction.total}.
                   <Text style={{fontSize: 13}}>00</Text>
                </Text>
            </View>

        </View>
    )
}

const createStyles = (theme: Theme) => StyleSheet.create({
    text: {
        color: theme.colors.text,
        fontSize: 15,
        letterSpacing: 1,
        lineHeight: 30,
        marginHorizontal: 10,
        fontWeight: 'bold',
    },
    total: {
        color: theme.colors.text,
        fontSize: 16,
        letterSpacing: 0.5,
        lineHeight: 30,
        marginHorizontal: 10,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    amountsContainer: {
        justifyContent: 'space-between',
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor:  theme.dark ? '#f0f0f021' : '#3c486b22',
        margin: 5,
        height: 80,
        flexDirection: 'row',
        gap: 10,
        padding: 5
    },
    infoContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
});

export default TransactionCard