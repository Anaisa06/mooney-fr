import { Text, View } from 'react-native';
import AppNavigator from './src/navigation/navigation';
import { ThemeContext } from './src/theme/theme.context';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): React.JSX.Element {

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>

  );
}

export default App;
