import React, { useContext, useState, useEffect } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constant/Colors';

export default function({id, text, Icon, route}){

    const nav = useNavigation();
    return (
        <TouchableHighlight underlayColor="#2b2b2b" onPress={() => nav.navigate(route)} style={[style.main, {backgroundColor: '#181818'}]}>
            <React.Fragment>
                <Icon size={25} color='#fff' />
                <Text style={[style.text, { color: '#fff' }]}>{text}</Text>
            </React.Fragment>
        </TouchableHighlight>
    )
}

const style = StyleSheet.create({
    main: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        width: '90%',
        marginBottom: 20,
        flexDirection: 'row',
        borderRadius: 5,
        marginTop: 'auto'
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 25
    }
})