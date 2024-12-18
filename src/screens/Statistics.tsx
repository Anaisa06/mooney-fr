import { Theme, useTheme } from '@react-navigation/native';
import React, { ReactNode } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Pie, PolarChart,  } from "victory-native";

function randomNumber() {
    return Math.floor(Math.random() * 26) + 125;
}
function generateRandomColor(): string {
    // Generating a random number between 0 and 0xFFFFFF
    const randomColor = Math.floor(Math.random() * 0xffffff);
    // Converting the number to a hexadecimal string and padding with zeros
    return `#${randomColor.toString(16).padStart(6, "0")}`;
}

const DATA = (numberPoints = 5) =>
    Array.from({ length: numberPoints }, (_, index) => ({
        value: randomNumber(),
        color: generateRandomColor(),
        label: `Label ${index + 1}`,
    }));

    const data = [
        {
            value: 30,
            color: generateRandomColor(),
            label: '30'
        },
        {
            value: 60,
            color: generateRandomColor(),
            label: '60'
        },
        {
            value: 60,
            color: generateRandomColor(),
            label: '60'
        },

    ]


const Statistics = () => {
    const theme = useTheme();

    const styles = createStyles(theme);

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={styles.container}>

                <Text style={styles.title} >
                    Estadísticas
                </Text>
                <View style={styles.line} />

                <View style={{ height: 300, marginTop: 15 }}>

                    <PolarChart data={data} colorKey={'color'} labelKey={'label'} valueKey={'value'}>
                        <Pie.Chart size={200}>

                            {({ slice }) => {
                                {console.log(slice)}

                                return (
                                    <>
                                        <Pie.Slice >
                                            <Pie.Label text={'HOLA'} color={"red"} radiusOffset={50} />
                                            
                                        </Pie.Slice>
                                        <Pie.SliceAngularInset
                                            angularInset={{
                                                angularStrokeWidth: 8,
                                                angularStrokeColor: theme.colors.background,
                                            }}
                                        />
                                    </>
                                );
                            }}


                        </Pie.Chart>
                    </PolarChart>
                </View>

            </View>


        </SafeAreaView>
    )
}

export default Statistics

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {

            backgroundColor: theme.colors.background,
            margin: 25,
            height: '100%'
        },
        title: {
            color: theme.colors.text,
            textAlign: 'left',
            fontSize: 20,
            letterSpacing: 1,
            lineHeight: 30
        },
        text: {
            color: theme.colors.text,
            fontSize: 15,
            letterSpacing: 1,
            lineHeight: 30,
            marginHorizontal: 10
        },
        line: {
            borderBottomColor: theme.colors.text,
            borderBottomWidth: 1,
            marginVertical: 10,
        },
        amounts: {
            fontSize: 25,
            letterSpacing: 1,
            marginHorizontal: 40,
            fontWeight: 'bold'
        },
        amountsContainer: {
            display: 'flex',
            borderRadius: 8,
            padding: 5,
            justifyContent: 'center',
        }
    });

