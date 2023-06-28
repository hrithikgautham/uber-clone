import { KeyboardAvoidingView, Platform, } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import HomeScreen from './src/screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './src/screens/MapScreen';
import DriverScreen from './src/screens/DriverScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Provider store={store}>
          <KeyboardAvoidingView style={{ flex: 1, }} behavior={Platform.OS == "android" ? "height" : "padding"}>
            <Stack.Navigator>
              <Stack.Screen name='Home' component={HomeScreen} options={{
                headerShown: false,
              }} />
              <Stack.Screen name='Map' component={MapScreen} options={{
                headerShown: false,
              }} />
              <Stack.Screen name='Driver' component={DriverScreen} options={{
                headerShown: false,
              }} />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}