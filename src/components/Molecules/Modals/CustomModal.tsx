import { Theme } from '@react-navigation/native';
import React, { ReactNode } from 'react'
import { ScrollView } from 'react-native';
import { Portal, Modal } from 'react-native-paper';

interface IProps {
    openModal: boolean;
    onClose: () => void;
    children: ReactNode;
    theme: Theme;
}

const CustomModal = ({ openModal, onClose, children, theme }: IProps) => {

    const containerStyle = { backgroundColor: theme.colors.background, padding: 20, margin: 20, borderRadius: 8 };

    return (
        <Portal>
            <Modal visible={openModal} onDismiss={onClose} contentContainerStyle={containerStyle}>
                <ScrollView>
                    {children}
                </ScrollView>
            </Modal>
        </Portal>
    );
}

export default CustomModal