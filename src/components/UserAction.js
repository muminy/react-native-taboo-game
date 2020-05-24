import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const UserAction = ({ liveSkor, pas}) => (
    <View style={[style.skore, style.flex, style.skoretable]}>
        <View style={[style.flex, { flex: .5, justifyContent: 'center' }]}>
            <Text>Pas hakkı: </Text>
            <Text>{pas}</Text>
        </View>
        <View style={[style.flex, { flex: .5, justifyContent: 'center' }]}>
            <Text>Skor: </Text>
            <Text>{liveSkor}</Text>
        </View>
    </View>
)

const style = StyleSheet.create({
    skore: {
        marginBottom: 'auto',
    },
    skoretable: {
        marginBottom: 0,
        backgroundColor: '#eee'
    },
    flex: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 5
    }
})

export default UserAction;