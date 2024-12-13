import SubmitButton from '@components/Atoms/buttons/SubmitButton'
import { Theme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { getCurrentBudget } from 'src/services/budget.services';

interface IProps {
    theme: Theme;
}

const HomeButtons = ({ theme }: IProps) => {

    const styles = createStyles(theme);


    return (
        <View style={styles.container} >
            <SubmitButton theme={theme} text='Añadir     presupuesto' handleSubmit={() => {}} />
            <SubmitButton theme={theme} text='Añadir       transacción' handleSubmit={() => { }} backgroundColor={theme.colors.text} />
        </View>
    )
}

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        position: 'absolute',
        bottom: 0,
        backgroundColor: theme.colors.background,
        width: '100%',
        paddingVertical: 15
    }
})

export default HomeButtons