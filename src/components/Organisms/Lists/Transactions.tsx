import { Theme } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native'

interface IProps {
    theme: Theme
}

const Transactions = ({ theme }: IProps) => {
    const styles = createStyles(theme);

    return (
        <View style={styles.container}>
            <Text style={styles.title} >
                Últimas transacciones
            </Text>
        </View>
    )
}

export default Transactions

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
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
