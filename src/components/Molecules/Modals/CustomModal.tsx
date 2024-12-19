import { Theme } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { ScrollView, Text } from 'react-native';
import { Portal, Modal, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

interface IProps {
    openModal: boolean;
    onClose: () => void;
    children: ReactNode;
    theme: Theme;
}

const CustomModal = ({ openModal, onClose, children, theme }: IProps) => {

    const containerStyle = { backgroundColor: theme.colors.background, padding: 15, margin: 20, borderRadius: 8 };

    return (
        <Portal>
            <Modal visible={openModal} dismissable={false} contentContainerStyle={containerStyle}>
                <Icon name="close" size={30} color={theme.colors.text} onPress={onClose} />
                <ScrollView>
                    {children}
                </ScrollView>
            </Modal>
        </Portal>
    );
};

export default CustomModal;
