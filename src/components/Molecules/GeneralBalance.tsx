import { Theme } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface IProps {
    theme: Theme;
    totalBudget: number;
    totalExpenses: number;
}

const GeneralBalance = ({ theme, totalBudget, totalExpenses }: IProps) => {

    const styles = createStyles(theme);
    const availableBudget = totalBudget - totalExpenses;
    const expensesPercentage = (totalExpenses * 100) / totalBudget;

    const availableBackground =
        expensesPercentage >= 100
            ? theme.colors.primary
            : expensesPercentage > 80
                ? theme.colors.notification
                : '#0A6847';

    const availableTextColor =
        expensesPercentage > 80 && expensesPercentage < 100
            ? '#3C486B'
            : '#F0F0F0'

    return (
        <View style={styles.container}>
            <Text style={styles.title} >
                Balance general
            </Text>
            <View style={styles.line} />

            <View style={[styles.amountsContainer, { alignItems: 'flex-end'}]}>
                <Text style={[styles.text, { textAlign: 'right' }]} >
                    Presupuesto total
                </Text>
                <Text style={[styles.amounts, { textAlign: 'right', color: theme.colors.text }]}>
                    ${totalBudget}.00
                </Text>
            </View>

            <View style={[styles.amountsContainer, { alignItems: 'flex-start'}]}>
                <Text style={[styles.text, { textAlign: 'left' }]} >
                    Gastos totales
                </Text>
                <Text style={[styles.amounts, { textAlign: 'left', color: theme.colors.primary }]}>
                    ${totalExpenses}.00
                </Text>
            </View>

            <View style={[styles.amountsContainer, { backgroundColor: availableBackground,  marginTop: 10, alignItems: 'flex-end'}]}>
                <Text style={[styles.text, {  color: availableTextColor }]} >
                    Balance total
                </Text>
                <Text style={[styles.amounts, {  color: availableTextColor }]}>
                    ${availableBudget}.00
                </Text>
            </View>
            <View style={styles.line} />
        </View>
    )
}

export default GeneralBalance

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            margin: 25
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
            fontSize: 27,
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
