import { useTheme } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
const MenuIcon = () => {

    const theme = useTheme()
  return (
    <Icon name='menu-outline' style={{fontSize: 40, color: theme.colors.text}}/>
  )
}

export default MenuIcon