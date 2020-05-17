import React, { useContext, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { BackIcon } from '../Icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constant/Colors';

export const BackHeader = ({title}) => {

    const nav = useNavigation();
    return (
        <View style={style.main}>
            <TouchableOpacity onPress={() => nav.goBack()} style={style.goback}>
                <BackIcon size={25} color={Colors.color} />
            </TouchableOpacity>
        </View>
    )
}
export const GameHeader = ({time, team}) => {

    const nav = useNavigation();
    return (
        <View style={style.main}>
            <TouchableOpacity onPress={() => nav.goBack()} style={[style.goback, { flex: .3}]}>
                <BackIcon size={25} color={Colors.color} />
            </TouchableOpacity>
            <Text style={[style.teamName]}>{team}</Text>
            <Text style={[style.time]}>{time}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    main: {
        height: 50,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 19,
        fontWeight: '500',
        marginLeft: 4
    },
    goback: {
        flexDirection: 'row',
        alignItems:'center'
    },
    teamName: {
        fontSize: 15,
        textAlign: 'center',
        flex: .4,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 15,
        fontWeight: 'bold',
        flex: .3,
        textAlign: 'right'
    }
})