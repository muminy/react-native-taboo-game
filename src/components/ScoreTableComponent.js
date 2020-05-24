import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const ScoreTableComponent = ({ tur, homeName, homeScore, awayName, awayScore }) => (
    <View style={[style.skore]}>
        <View style={[style.flex, style.home]}>
            <Text style={{ flex: .7 }}>Tur</Text>
            <Text style={[style.score]}>{tur}</Text>
        </View>
        <View style={[style.flex, style.home]}>
            <Text style={{ flex: .7 }}>{homeName}</Text>
            <Text style={[style.score]}>{homeScore}</Text>
        </View>
        <View style={[style.flex, style.away]}>
            <Text style={{ flex: .7 }}>{awayName}</Text>
            <Text style={[style.score]}> {awayScore}</Text>
        </View>
    </View>
)

const style = StyleSheet.create({
    score: {
        flex: .3,
        textAlign: 'right'
    },
    skore: {
        marginBottom: 'auto',
    },
    flex: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 5
    }
})

export default ScoreTableComponent;