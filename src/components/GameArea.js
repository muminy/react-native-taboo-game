import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const GameArea = ({ tabus, index }) => (
    <>
        <View style={[style.header]}>
            <Text style={[style.kelime]}>
                {tabus[index].word}
            </Text>
        </View>
        <View style={[style.yasak_kelime]}>
            {tabus[index].yasak_kelime.map((item, _) => <Text key={_} style={[style.k_yasak]}>{item}</Text>)}
        </View>
    </>
)

const style = StyleSheet.create({
    header: {
        backgroundColor: '#ddd',
        alignItems: 'center',
        paddingVertical: 5
    },
    kelime: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111'
    },
    yasak_kelime: {
        alignItems: 'center',
    },
    k_yasak: {
        fontSize: 18,
        fontWeight: '700',
        width: '100%',
        color: '#535353',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 'auto'
    }
})

export default GameArea;