import SubmitButton from '@components/Atoms/buttons/SubmitButton'
import { Theme } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { getCurrentBudget } from 'src/services/budget.services';
import CustomModal from './Modals/CustomModal';
import BudgetForm from '@components/Organisms/Forms/BudgetForm';
import TransactionForm from '@components/Organisms/Forms/TransactionForm';

interface IProps {
    theme: Theme;
    reRender: () => void;
}

const HomeButtons = ({ theme, reRender }: IProps) => {

    const [openBudgetModal, setOpenBudgetModal] = useState(false);
    const [openTransactionModal, setOpenTransactionModal] = useState(false);


    const styles = createStyles(theme);
    const handleBudgetPress = () => {
        setOpenBudgetModal(true);
    }

    const handleTransactionPress = () => {
        setOpenTransactionModal(true);
    }
    return (
        <View style={styles.container} >
            <SubmitButton theme={theme} text='Añadir     presupuesto' handleSubmit={handleBudgetPress} />
            <SubmitButton theme={theme} text='Añadir       transacción' handleSubmit={handleTransactionPress} backgroundColor={theme.colors.text} />
                <CustomModal theme={theme} openModal={openBudgetModal} onClose={() => setOpenBudgetModal(false)} >
                    <BudgetForm theme={theme} closeModal={() => setOpenBudgetModal(false)} reRender={reRender} /> 
                </CustomModal>
                <CustomModal theme={theme} openModal={openTransactionModal} onClose={() => setOpenTransactionModal(false)} >
                    <TransactionForm theme={theme} closeModal={() => setOpenTransactionModal(false)} reRender={reRender} /> 
                </CustomModal>
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