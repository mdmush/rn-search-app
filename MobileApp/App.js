import {SafeAreaView, StatusBar} from 'react-native';
import {TailwindProvider} from 'tailwindcss-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splashscreen from './src/screens/splash';
import HomeScreen from './src/screens/home';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TailwindProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="splashscreen"
              component={Splashscreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TailwindProvider>
      <StatusBar barStyle="default" />
    </SafeAreaView>
  );
}
