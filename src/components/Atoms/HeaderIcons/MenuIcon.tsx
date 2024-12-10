import { useTheme } from '@react-navigation/native'
import { Pressable, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
const MenuIcon = () => {

    const theme = useTheme()
  return (
      <Icon name='menu-outline' style={{fontSize: 40, color: theme.colors.text}} onPress={() => console.log('dsde menu')}/>
  )
}

export default MenuIcon