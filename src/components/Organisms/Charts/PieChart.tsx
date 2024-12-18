import { Theme } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Icon, IconButton } from 'react-native-paper';
import { Pie, PolarChart, } from "victory-native";

function generateRandomColor(): string {
    const randomColor = Math.floor(Math.random() * 0xffffff);
    return `#${randomColor.toString(16).padStart(6, "0")}`;
}

interface IData {
    value: number;
    color: string;
    label: string;
}

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
        label: '60,2'
    },
]

interface IProps {
    theme: Theme;
    data: any[];
    title: string;
}

const PieChart = ({ theme, data, title }: IProps) => {

    const styles = createStyles(theme);

    return (
        <View style={{ display:'flex'}}>
            <Text style={styles.title}>{title}</Text>
            <View style={{ height: 300, display:'flex'}}>

            <PolarChart data={data} colorKey={'color'} labelKey={'label'} valueKey={'value'}>
                <Pie.Chart size={200}>

                    {({ slice }) => {

                        return (
                            <>
                                <Pie.Slice >
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

            <View style={styles.labelContainer} >
                {
                    data.map((item, idx) =>
                        <View style={styles.iconLabel} key={`${item.label}+${idx}`} >
                            <Icon source='square-rounded' size={20} color={item.color}/>
                            <Text style={styles.text} >{item.label} (${item.value})</Text>
                        </View>)
                }


            </View>
        </View>
    )
}

export default PieChart

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        labelContainer: {
            marginTop:  0,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 15,

        },
        iconLabel: {
            flexDirection: 'row',
            gap: 5,
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '47%',
            backgroundColor: theme.colors.text,
            borderRadius: 8,
            padding: 5
        },
        text: {
            color: theme.colors.background,
            letterSpacing: 1
        },
        title: {
            color: theme.colors.text,
            textAlign: 'left',
            fontSize: 17,
            letterSpacing: 1,
            lineHeight: 30
        },
    })