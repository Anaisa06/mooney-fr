import { Theme } from '@react-navigation/native';
import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

interface Props {
    text: string;
    handleSubmit: () => void;
    theme: Theme;
}

const SubmitButton = ({ handleSubmit, text, theme }: Props) => {

    const styles = createStyles(theme)

    return (
        <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.8}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        button: {
            backgroundColor: theme.colors.primary,
            width: '45%',
            height: 60,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 5,
            alignSelf: 'center'
        },
        buttonText: {
            color: '#F0F0F0',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center'
        },
    });
export default SubmitButton;