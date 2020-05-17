import React, { useContext, useState, useEffect } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight
} from 'react-native';
import AppRoute from '../AppRoute';
import Slider from '@react-native-community/slider';

export default function({navigation}){

    
    const [teamhome, setHome] = useState('Team 1');
    const [teamaway, setAway] = useState('Team 2');
    const [type, setType] = useState('Kolay');
    const [sure, setSure] = useState(120);
    const [tur, setTur] = useState(10)
    const startGame = () => {
        const gamedata ={
            teamhome: teamhome,
            teamaway: teamaway,
            type: type,
            time: sure,
            tur: tur
        };
        navigation.navigate(AppRoute.PLAY_A_GAME, gamedata);
    }

    return (
        <View style={[style.main]}>
            <View style={{paddingHorizontal: 15}}>
                <TextInput 
                    style={[style.input]}
                    placeholder="Takım ismi" 
                    onChangeText={_ => setHome(_)}
                    value={teamhome} />
                <TextInput 
                    style={[style.input]}
                    placeholder="Takım ismi" 
                    onChangeText={_ => setAway(_)}
                    value={teamaway} />
            </View>
            {/* <View style={{flexDirection: 'row', marginBottom: 10, paddingHorizontal: 15}}>
                <TouchableOpacity 
                    onPress={() => setType('Kolay')} 
                    style={[style.type, {
                        backgroundColor: type === 'Kolay' ? '#1ed775' : '#f7f7f7', 
                        marginRight: 5,
                        borderColor: type === 'Kolay' ? '#1ed775' : '#ddd',
                    }]}>
                    <Text style={{fontWeight: 'bold', fontSize: 17}}>Kolay</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setType('Orta')} 
                    style={[style.type, {
                        backgroundColor: type === 'Orta' ? '#1ed775' : '#f7f7f7', 
                        borderColor: type === 'Orta' ? '#1ed775' : '#ddd',
                        marginRight: 5
                    }]}>
                    <Text style={{fontWeight: 'bold', fontSize: 17}}>Orta</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setType('Zor')} 
                    style={[style.type, {
                        backgroundColor: type === 'Zor' ? '#1ed775' : '#f7f7f7',
                        borderColor: type === 'Zor' ? '#1ed775' : '#ddd'
                    }]}>
                    <Text style={{fontWeight: 'bold', fontSize: 17}}>Zor</Text>
                </TouchableOpacity>
            </View> */}
            <View style={{flexDirection: 'row', paddingHorizontal: 15, marginTop: 15, marginBottom: 5}}>
                <Text style={{flex: .7}}>Tur sayısı</Text>
                <Text style={{flex: .3, textAlign: 'right'}}>{tur}</Text>
            </View>
            <Slider 
                maximumValue={20}
                minimumValue={5}
                step={1}
                onValueChange={_ => setTur(_)}
                value={tur}
                thumbTintColor="#1ed775"
            />
            <View style={{flexDirection: 'row', paddingHorizontal: 15, marginTop: 15, marginBottom: 5}}>
                <Text style={{flex: .7}}>Süre</Text>
                <Text style={{flex: .3, textAlign: 'right'}}>{sure}</Text>
            </View>
            <Slider 
                maximumValue={300}
                minimumValue={90}
                step={10}
                onValueChange={_ => setSure(_)}
                value={sure}
                thumbTintColor="#1ed775"
            />
            <TouchableHighlight 
                underlayColor="#15b15e"
                onPress={startGame} 
                style={[style.create]}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>Başlat</Text>
            </TouchableHighlight>
        </View>
    )
}

const style = StyleSheet.create({
    main: {
        flex: 1,
    },
    input: {
        paddingVertical: 10,
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f7f7f7',
        borderWidth: 1,
        borderColor: '#ddd'
    },
    type: {
        flex: .33333,
        alignItems:'center',
        paddingVertical: 10,
        backgroundColor: '#f7f7f7',
        borderWidth: 1,
        borderColor: '#ddd'
    },
    create: {
        backgroundColor: '#1ed775',
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 'auto',
    }
})