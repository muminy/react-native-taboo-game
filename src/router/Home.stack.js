import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppRoute from '../AppRoute';
import MainScreen from '../screens/Main.screen'
import CreateGameScreen from '../screens/CreateGame.screen';
import { BackHeader } from '../components/Header';
import PlayGameScreen from '../screens/PlayGame.screen';
import Colors from '../constant/Colors';


const Stack = createStackNavigator();


export default function(){

    
    return (
        <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: Colors.backgroundColor } }} >
            <Stack.Screen options={{headerShown: false}} name={AppRoute.HOME_MENU} component={MainScreen} />
            <Stack.Screen options={{header: () => <BackHeader title="Geri" />}} name={AppRoute.CREATE_GAME} component={CreateGameScreen} />
            <Stack.Screen options={{headerShown: false}} name={AppRoute.PLAY_A_GAME} component={PlayGameScreen} />
        </Stack.Navigator>
    )
}