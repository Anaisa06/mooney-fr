import { Theme } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';



interface Props {
    text: string;
    handlePress: () => void;
    theme: Theme;
    icon: string;
    isActive: boolean;
}


const DrawerButton = ({ handlePress, text, theme, icon, isActive }: Props) => {
    const styles = createStyles(theme, isActive)

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.8}>
            <View style={styles.container}>
                <Icon source={icon} size={30} color={ isActive ? '#f0f0f0' :  theme.colors.text} />
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const createStyles = (theme: Theme, isActive: boolean) =>
    StyleSheet.create({
        button: {
            backgroundColor: isActive ? theme.colors.primary : theme.colors.background,
            width: '85%',
            height: 60,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginVertical: 10
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: 10,
            paddingHorizontal: 15,
            alignItems: 'center'
        },
        buttonText: {
            color: isActive ? '#f0f0f0' :  theme.colors.text,
            fontSize: 17,
            fontWeight: 'semibold',
            textAlign: 'center'
        },
    });


export default DrawerButton