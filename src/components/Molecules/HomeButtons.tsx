import SubmitButton from '@components/Atoms/buttons/SubmitButton'
import { Theme } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { getCurrentBudget } from 'src/services/budget.services';
import CustomModal from './Modals/CustomModal';
import BudgetForm from '@components/Organisms/Forms/BudgetForm';

interface IProps {
    theme: Theme;
}

const HomeButtons = ({ theme }: IProps) => {

    const [openModal, setOpenModal] = useState(false);

    const styles = createStyles(theme);
    const handleBudgetPress = () => {
        setOpenModal(true);
    }


    return (
        <View style={styles.container} >
            <SubmitButton theme={theme} text='Añadir     presupuesto' handleSubmit={handleBudgetPress} />
            <SubmitButton theme={theme} text='Añadir       transacción' handleSubmit={() => { }} backgroundColor={theme.colors.text} />
                <CustomModal theme={theme} openModal={openModal} onClose={() => setOpenModal(false)} >
                    <BudgetForm theme={theme} /> 
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