import { Theme } from '@react-navigation/native';
import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

interface Props {
    text: string;
    handleSubmit: () => void;
    theme: Theme;
    backgroundColor?: string;
}

const SubmitButton = ({ handleSubmit, text, theme, backgroundColor }: Props) => {

    const styles = createStyles(theme, backgroundColor)

    return (
        <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.8}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const createStyles = (theme: Theme, backgroundColor?: string) =>
    StyleSheet.create({
        button: {
            backgroundColor: backgroundColor ? backgroundColor : theme.colors.primary,
            width: '45%',
            height: 60,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 5,
            alignSelf: 'center'
        },
        buttonText: {
            color: backgroundColor ? theme.colors.background : '#F0F0F0',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center'
        },
    });
export default SubmitButton;