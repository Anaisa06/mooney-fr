import RegisterForm from '@components/Organisms/Forms/RegisterForm';
import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FullLogo from '@components/Atoms/Logo/FullLogo';
import { ScrollView, Switch } from 'react-native';
import { RegisterNavigationProp } from 'src/navigation/navigation.types';

const Register = () => {

  const theme = useTheme();
  const navigation = useNavigation<RegisterNavigationProp>();

  return (
    <SafeAreaView>
      <ScrollView>
        <FullLogo />
        <RegisterForm navigation={navigation} theme={theme} />
      </ScrollView>

    </SafeAreaView>
  );
};

export default Register;
