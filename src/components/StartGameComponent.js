import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const StartGameComponent = ({ firstGame, StartGame, kazanan, currentTeam, liveScore, lastTeam, resetGame }) => (
    <View style={style.main}>
        <View style={style.parcel}>
            {kazanan ? (
                <View style={{flexDirection: 'row'}}>
                    <Text>Kazanan!</Text>
                    <Text style={[style.teamName, { marginLeft: 'auto', fontSize: 14}]}>{kazanan}</Text>
                </View>
            ) : (
                <React.Fragment>
                    <Text style={style.teamName}>{currentTeam}</Text>
                    <Text>Hazır hissetiğinizde başlayın</Text>
                </React.Fragment>
            )}
            <TouchableOpacity onPress={() => kazanan ? resetGame() : StartGame()} activeOpacity={.7} style={style.btn}>
                <Text>{kazanan ? 'Tekrar Oyna' : 'Başla'}</Text>
            </TouchableOpacity>
            {!firstGame ? (
                <View style={style.score}>
                    <Text style={[style.teamName, { fontWeight: '500', fontSize: 14, paddingHorizontal: 10}]}>{lastTeam}</Text>
                    <Text style={{marginLeft: 'auto', paddingHorizontal: 10,fontWeight: 'bold', fontSize: 14,}}>{liveScore}</Text>
                </View>
            ) : null}
        </View>
    </View>
)

const style = StyleSheet.create({
    main: {
        flex: 1,
        position: 'absolute',
        backgroundColor:'red',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000023',
    },
    teamName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 3
    },
    parcel: {
        backgroundColor: '#fff',
        width: '70%',
        padding: 20,
        borderRadius: 5
    },
    btn: {
        paddingHorizontal: 20,
        backgroundColor: '#85f070', 
        marginTop: 5, 
        borderRadius: 5,
        marginTop: 8,
        paddingVertical: 10,
        alignItems: 'center'
    },
    score: {
        flexDirection: 'row',
        paddingVertical: 3, 
        marginTop: 10,
        borderWidth: 1, 
        borderColor: '#ddd', 
        backgroundColor: '#eee', 
        borderRadius:3
    }
})

export default StartGameComponent;