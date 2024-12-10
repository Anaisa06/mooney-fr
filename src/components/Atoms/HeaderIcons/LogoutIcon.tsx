import { useTheme } from '@react-navigation/native'
import { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { AuthContext } from 'src/context/user.context'

interface IProps {
  handleLogout: () => void;
}

const LogoutIcon = () => {

    const theme = useTheme()
    const {logout, user} = useContext(AuthContext)


    const test = () => {
      console.log('desde test')
      logout()
    }

  return (

      <Icon name='exit-outline' style={{fontSize: 40, color: theme.colors.text}} onPress={test} />
  )
}

export default LogoutIcon