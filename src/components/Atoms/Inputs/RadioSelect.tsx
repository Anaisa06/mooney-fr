import { Theme } from '@react-navigation/native';
import React from 'react';
import { FieldError } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { TransactionType } from 'src/interfaces/transaction.interfaces';

interface IProps {
    items: {
        name: string,
        id: any
    }[];
    value: any;
    onChange: () => void;
    theme: Theme;
    error?: FieldError;
    label: string;
}

const RadioSelect = ({ items, value, onChange, theme, error, label }: IProps) => {


    const styles = createStyles(theme);

    return (
        <RadioButton.Group
            value={value}
            onValueChange={onChange}

        >
            <Text style={{ textAlign: 'left', letterSpacing: 1, width: '80%', margin: 'auto', color: theme.colors.text }}>{label}:</Text>
            <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                {
                    items.map(item =>
                        <View  key={item.id} style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <RadioButton
                                value={item.name}
                                key={item.id}
                            />
                            <Text style={styles.text} >{item.name === TransactionType.BUDGET ? 'Ingreso' : item.name}</Text>
                        </View>
                    )
                }

            </View>
            {
                error &&
                <Text style={styles.errorText}>
                    {error.message}
                </Text>
            }
        </RadioButton.Group>
    );
};

export default RadioSelect;

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        text: {
            color: theme.colors.text,
            letterSpacing: 1,
        },
        errorText: {
            color: 'red',
            fontSize: 10,
            textAlign: 'center',
            letterSpacing: 1,
        },
    });
