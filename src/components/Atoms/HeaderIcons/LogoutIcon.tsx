import { useTheme } from '@react-navigation/native';
import { useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from 'src/context/user.context';
import { removeTokenAndUser } from 'src/services/auth.services';

interface IProps {
  handleLogout: () => void;
}

const LogoutIcon = () => {

    const theme = useTheme();
    const {logout} = useContext(AuthContext);


    const handleLogout = async () => {
      await removeTokenAndUser();
      logout();
    };

  return (

      <Icon name="exit-outline" style={{fontSize: 30, color: theme.colors.text, padding: 10}} onPress={handleLogout} />
  );
};

export default LogoutIcon;
