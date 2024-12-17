import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '@react-navigation/native';
import { FieldError } from 'react-hook-form';

interface IProps {
    items: {
        name: string;
        id: any;
    }[];
    onChange: () => void;
    value: any;
    theme: Theme;
    error?: FieldError;
    label: string;
}

const PickerSelect = ({ items, onChange, value, theme, error, label }: IProps) => {
    const [selectedLanguage, setSelectedLanguage] = useState();

    const styles = createStyles(theme);
    return (
        <View style={{gap: 5}}>
            <View style={styles.container} >
                <Picker
                    dropdownIconColor={theme.colors.background}
                    selectionColor={theme.colors.primary}
                    style={styles.pickerContainer}
 
                    selectedValue={value}
                    onValueChange={onChange}>

                    <Picker.Item label={label} enabled={false} value={''} style={styles.item} />

                    {
                        items.map(item =>
                            <Picker.Item label={item.name} value={item.id} key={item.id} style={styles.item} />
                        )
                    }

                </Picker>
            </View>
            {
                error &&
                <Text style={styles.errorText}>
                    {error.message}
                </Text>
            }

        </View>

    )
}

export default PickerSelect

const createStyles = (theme: Theme) =>
    StyleSheet.create({

        container: {
            height: 60,
            width: '80%',
            margin: 'auto',
            padding: 10,
            borderRadius: 8,
            backgroundColor: theme.colors.text,
            color: theme.colors.background,
            justifyContent: 'center'
        },
        pickerContainer: {
            color: theme.colors.background,
            padding: 10
        },
        item: {
            color: theme.colors.background,
            backgroundColor: theme.colors.text ,
            fontSize: 14,
            borderRadius: 8
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
