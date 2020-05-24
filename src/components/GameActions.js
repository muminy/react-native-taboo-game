import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

const GameActions = ({ remainingSecs, TabuDogru, PasGec, TabuOldu }) => (
    <View style={{ flexDirection: 'row' }}>
        <TouchableHighlight
            underlayColor="#1cad60"
            disabled={remainingSecs === 0}
            onPress={() => TabuDogru()}
            style={[style.dogru, style.buttons]}>
            <Text style={[style.text]}>Doğru!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            underlayColor="#926d53"
            disabled={remainingSecs === 0}
            onPress={() => PasGec()}
            style={[style.pas, style.buttons]}>
            <Text style={[style.text]}>Pass!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            underlayColor="#ce4b3d"
            disabled={remainingSecs === 0}
            onPress={() => TabuOldu()}
            style={[style.tabu, style.buttons]}>
            <Text style={[style.text]}>Tabu!</Text>
        </TouchableHighlight>
    </View>
)

const style = StyleSheet.create({
    dogru: {
        backgroundColor: '#1ed775'
    },
    tabu: {
        backgroundColor: '#e55949'
    },
    buttons: {
        flex: .333333,
        paddingVertical: 13,
        alignItems: 'center'
    },
    pas: {
        backgroundColor: '#ab8569'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    }
})

export default GameActions;