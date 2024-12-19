import { Theme } from '@react-navigation/native';
import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

interface IProps {
    theme: Theme;
    items: string[];
    setIcon: (icon: string) => void;
    value: string;
    error?: FieldError;
}

const IconSelect = ({ theme, items, setIcon, value, error }: IProps) => {


    const handleIconPress = (icon: string) => {
        setIcon(icon);
    };

    const styles = createStyles(theme);


    return (
        <View style={styles.iconList}>
            {items.map((icon) => (
                <IconButton
                    key={icon}
                    icon={icon}
                    size={30}

                    iconColor={value === icon ? theme.colors.primary : theme.colors.text} // Color si está seleccionado
                    onPress={() => handleIconPress(icon)} // Actualiza el estado
                />
            ))}
            {
                error &&
                <Text style={styles.errorText}>
                    {error.message}
                </Text>
            }
        </View>
    );

};

const createStyles = (theme: Theme) =>
    StyleSheet.create({

        iconList: {
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
        errorText: {
            color: 'red',
            fontSize: 10,
            textAlign: 'center',
            letterSpacing: 1,
        },
    });

export default IconSelect;
