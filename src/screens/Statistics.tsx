import PickerSelect from '@components/Atoms/Inputs/PickerSelect';
import PieChart from '@components/Organisms/Charts/PieChart';
import { Theme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStatistics } from 'src/hooks/Statistics/useStatistics';
import { StatisticsRouteProp } from 'src/navigation/navigation.types';


interface IProps {
    route: StatisticsRouteProp;
}

const Statistics = ({ route }: IProps) => {

    const { theme, categoriesForSelect, onSubmit, chartData } = useStatistics(route);

    const styles = createStyles(theme);

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={styles.container}>
                <Text style={styles.title} >
                    Estadísticas
                </Text>
                <View style={styles.line} />
                <Text style={{ textAlign: 'left', letterSpacing: 1, width: '80%', marginHorizontal: 'auto', color: theme.colors.text, margin: 10 }}>Cambiar categoría:</Text>

                <View style={{ marginBottom: 20 }} >
                    <PickerSelect items={categoriesForSelect} theme={theme} label="Categoría" value={''} onChange={onSubmit} />
                </View>
                <View style={styles.line} />

                <FlatList
                    style={{ marginBottom: 40 }}
                    keyExtractor={item => item.id}
                    data={chartData}
                    ItemSeparatorComponent={ () => <View style={styles.line} />}
                    renderItem={({ item }) => <PieChart theme={theme} data={item.data} title={item.title} />}
                />

            </View>


        </SafeAreaView>
    );
};

export default Statistics;

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {

            backgroundColor: theme.colors.background,
            margin: 25,
            height: '100%',
        },
        title: {
            color: theme.colors.text,
            textAlign: 'left',
            fontSize: 20,
            letterSpacing: 1,
            lineHeight: 30,
        },
        text: {
            color: theme.colors.text,
            fontSize: 15,
            letterSpacing: 1,
            lineHeight: 30,
            marginHorizontal: 10,
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
            fontWeight: 'bold',
        },
        amountsContainer: {
            display: 'flex',
            borderRadius: 8,
            padding: 5,
            justifyContent: 'center',
        },
    });

