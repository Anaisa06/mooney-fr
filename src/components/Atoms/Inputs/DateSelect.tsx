import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Theme } from '@react-navigation/native';
import { FieldError } from 'react-hook-form';

interface IProps {
    theme: Theme;
    label: string;
    value?: Date;
    onChangeField: (...event: any[]) => void;
    error?: FieldError;
    minDate?: Date;
}

const DateSelect = ({ theme, label, value, onChangeField, minDate, error }: IProps) => {

    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [buttonText, setButtonText] = useState('Seleccionar fecha');

    const styles = createStyles(theme);

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {

        setOpenDatePicker(false);
        if (selectedDate) {
            onChangeField(selectedDate);
            setButtonText(selectedDate.toISOString().split('T')[0]);
        }

    };

    return (
        <>
            <Text style={{ textAlign: 'left', letterSpacing: 1, width: '80%', margin: 'auto', color: theme.colors.text }}>{label}:</Text>

            <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={() => setOpenDatePicker(true)}>
                <Text style={styles.buttonText} >
                    {buttonText}
                </Text>

            </TouchableOpacity>
            {
                openDatePicker &&

                <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="spinner"
                    onChange={onChange}
                    timeZoneName="UTC"
                    minimumDate={minDate}
                />
            }

            {
                error &&
                <Text style={styles.errorText}>
                    {error.message}
                </Text>
            }
        </>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        button: {
            height: 60,
            width: '80%',
            marginHorizontal: 'auto',
            padding: 15,
            borderRadius: 8,
            backgroundColor: theme.colors.text,
            justifyContent: 'center',

        },
        buttonText: {
            color: theme.colors.background,
            fontWeight: 'semibold',
            fontSize: 14,
        },
        errorText: {
            color: 'red',
            fontSize: 10,
            textAlign: 'center',
            letterSpacing: 1,
        },
    });

export default DateSelect;
