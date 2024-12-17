import { Theme } from '@react-navigation/native';
import React from 'react'
import { ControllerRenderProps, FieldError } from 'react-hook-form';
import { View, TextInput, StyleSheet, KeyboardTypeOptions, Text } from 'react-native'

interface Props {
    label: string;
    field: ControllerRenderProps<any>;
    error?: FieldError;
    type?: KeyboardTypeOptions | undefined;
    isPassword?: boolean;
    theme: Theme;
}

const TextInputField = ({ label, field, error, type = 'default', isPassword = false, theme }: Props) => {

    const styles = createStyles(theme);
    return (
        <View style={{gap: 5}}>
            <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                onChangeText={field.onChange}
                value={field.value}
                placeholder={label}
                keyboardType={type}
                placeholderTextColor={theme.colors.background}
                secureTextEntry={isPassword}
            />
            {
                error &&
                <Text style={styles.errorText}>
                    {error.message}
                </Text>
            }
        </View>
    )
}

const createStyles = (theme: Theme) =>
    StyleSheet.create({

        input: {
            height: 60,
            width: '80%',
            margin: 'auto',
            padding: 15,
            borderRadius: 8,
            backgroundColor: theme.colors.text,
            color: theme.colors.background,
            fontWeight: 'semibold',
            fontSize: 14
        },
        inputError: {
            borderColor: 'red',
        },
        errorText: {
            color: 'red',
            fontSize: 10,
            textAlign: 'center',
            letterSpacing: 1
        },
    })


export default TextInputField;