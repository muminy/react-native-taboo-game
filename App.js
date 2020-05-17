import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import AppRoute from './src/AppRoute';
import PlayGameScreen from './src/screens/PlayGame.screen';
import CreateGameScreen from './src/screens/CreateGame.screen';
import HomeStack from './src/router/Home.stack';
import Colors from './src/constant/Colors'
const Stack = createStackNavigator();

const App = () => {


  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.backgroundColor} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: Colors.backgroundColor} }} headerMode="none">
        <Stack.Screen name={AppRoute.HOME_MENU} component={HomeStack} />
        <Stack.Screen name={AppRoute.AYARLAR} component={CreateGameScreen} />
        <Stack.Screen name={AppRoute.OYNANIŞ} component={PlayGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
