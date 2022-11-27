import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import { Icon } from '@rneui/themed';
import LiveScore from './screens/LiveScore';
import Stream from './screens/Stream';
import BaoProvider from './Global/BaoProvider';

export default function App({navigation}) {

  const Stack = createNativeStackNavigator();

  return (
    <BaoProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{
            headerTitle: (props) => <Icon name='settings' type='material' size={40} color='black'/>,
            headerRight: () => (
            <Icon name='search' type='material' size={40} color='black'
                onPress={() => alert('This is a button!')}
              />
            ),
          }}/>
          <Stack.Screen name="Live Score" component={LiveScore} options={{
            headerRight: () => (
            <Icon name='search' type='material' size={40} color='black'
                onPress={() => alert('This is a button!')}
              />
            ),
          }}/>
          <Stack.Screen name="Stream" component={Stream} options={{
            headerRight: () => (
            <Icon name='search' type='material' size={40} color='black'
                onPress={() => alert('This is a button!')}
              />
            ),
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </BaoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
