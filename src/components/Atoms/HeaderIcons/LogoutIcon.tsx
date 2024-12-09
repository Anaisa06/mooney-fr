import { useTheme } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'

const LogoutIcon = () => {

    const theme = useTheme()
  return (
    <Icon name='exit-outline' style={{fontSize: 40, color: theme.colors.text}}/>
  )
}

export default LogoutIcon