import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Transactions from '@components/Organisms/Lists/Transactions';
import HomeButtons from '@components/Molecules/HomeButtons';
import { HomeRouteProp } from 'src/navigation/navigation.types';
import PickerSelect from '@components/Atoms/Inputs/PickerSelect';
import { useHome } from 'src/hooks/Home/useHome';

interface IProps {
  route: HomeRouteProp;
}

const Home = ({ route }: IProps) => {

  const {
    theme,
    title,
    categoriesForSelect,
    onSubmit,
    lastestTransactions,
    balance,
    reRender,
  } = useHome(route);

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <Text style={{
        color: theme.colors.text,
        textAlign: 'left',
        fontSize: 20,
        letterSpacing: 1,
        lineHeight: 30,
        marginHorizontal: 25,
        marginTop: 25,
      }} >
        Página principal
      </Text>
      <View style={{
        borderBottomColor: theme.colors.text,
        borderBottomWidth: 1,
        marginVertical: 10,
        marginHorizontal: 25,
      }} />
      <Text style={{ textAlign: 'left', letterSpacing: 1, width: '80%', marginHorizontal: 'auto', color: theme.colors.text, margin: 10 }}>Cambiar categoría:</Text>
      <View style={{ marginBottom: 10 }} >
        <PickerSelect items={categoriesForSelect} theme={theme} label="Categoría" value={''} onChange={onSubmit} />
      </View>
      <View style={{
        borderBottomColor: theme.colors.text,
        borderBottomWidth: 1,
        marginVertical: 10,
        marginHorizontal: 25,
      }} />
      <Transactions theme={theme} transactions={lastestTransactions} totalBudget={balance.totalBudget} totalExpenses={balance.totalExpenses} title={title} />
      <HomeButtons theme={theme} reRender={reRender} />
    </SafeAreaView>
  );
};


export default Home;
