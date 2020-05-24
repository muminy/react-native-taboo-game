import React from 'react';
import { 
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function({id, text, Icon, route}){

    const nav = useNavigation();
    return (
        <TouchableHighlight underlayColor="#eee" onPress={() => nav.navigate(route)} style={[style.main, {backgroundColor: '#f8f8f8'}]}>
            <React.Fragment>
                <Icon size={25} color='#111' />
                <Text style={[style.text, { color: '#111' }]}>{text}</Text>
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
        marginTop: 'auto',
        borderWidth: 1,
        borderColor: '#ddd'
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 25,
        color: '#111'
    }
})