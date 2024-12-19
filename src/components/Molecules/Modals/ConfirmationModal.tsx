import { Theme } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

interface Props {
    openModal: boolean;
    onClose: () => void;
    text?: string;
    children?: ReactNode;
    hasButton?: boolean;
    theme: Theme;
}

const ConfirmationModal = ({ openModal, onClose, text, children, hasButton = true, theme }: Props) => {

    const styles = createStyles(theme);
    const containerStyle = {
        backgroundColor: theme.colors.background,
        padding: 20,
        margin: 20,
        borderRadius: 8,
        gap: 10,
         };

    return (
        <Portal>
            <Modal visible={openModal} dismissable={false} contentContainerStyle={containerStyle}>

                        {
                            text &&
                            <Text style={styles.modalText}>{text}</Text>
                        }
                        {
                            children &&
                            children
                        }
                        {
                            hasButton &&
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={onClose}>
                                <Text style={styles.textStyle}>Cerrar</Text>
                            </Pressable>
                        }

            </Modal>
        </Portal>
    );
};

const createStyles = (theme: Theme) => StyleSheet.create({

    button: {
        borderRadius: 8,
        padding: 10,
        elevation: 2,
        width: '40%',
        alignSelf: 'center',
    },
    buttonClose: {
        backgroundColor: theme.colors.primary,
    },
    textStyle: {
        color: '#f0f0f0',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        color: theme.colors.text,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
    },
});


export default ConfirmationModal;
