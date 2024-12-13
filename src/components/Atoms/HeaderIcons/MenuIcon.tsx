import { useTheme } from '@react-navigation/native'
import { Pressable, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { getCurrentBudget } from 'src/services/budget.services'
const MenuIcon = () => {

    const theme = useTheme()

    const test = async() => {
      console.log('menu')
      const budgets = await getCurrentBudget();
      console.log(budgets);
      let total = 0;

       budgets.forEach((budget) => {
        console.log(budget.total)        
        total += budget.total;
      } )

      console.log('total total', total);
    }
  return (
      <Icon name='menu-outline' style={{fontSize: 40, color: theme.colors.text}} onPress={test}/>
  )
}

export default MenuIcon