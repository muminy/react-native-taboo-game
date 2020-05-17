import React, { useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { PlayIcon } from '../Icons'
import Menus from '../components/Menus';
import AppRoute from '../AppRoute';

export default function(){


    
    const [Menuler, setMenuler] = useState([
        {id: 'play_a_game', text: 'Oyunu başlat', Icon: PlayIcon, route: AppRoute.CREATE_GAME }
    ]);

    return (
        <View style={[style.main]}>
            <View style={{flexDirection: 'row', marginTop: 'auto'}}>
                <Text style={[style.textTabu, { color: '#2b2b2b'}]}>Taboo</Text>
                <Text style={[style.textTabu, { color: '#ff0000'}]}>.</Text>
            </View>
            {Menuler.map((item, index) => <Menus key={index} {...item} />)}
        </View>
    )
}

const style = StyleSheet.create({
    main: {
        justifyContent: 'center',
        flex: 1,
        alignItems:'center',
    },
    textTabu: {
        fontFamily:'Poppins-Black',
        fontSize: 60
    }
})