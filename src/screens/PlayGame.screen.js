import React, { useContext, useState, useEffect, useReducer } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { GameHeader } from '../components/Header';




const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

const PlayScreen = function({route}){


    
    const [remainingSecs, setRemainingSecs] = useState(route.params.time);
    const [start, setStart] = useState(false);
    const [firstGame, setFirstGame] = useState(true);
    const [homeScore, setHomeScore] = useState(0);
    const [awayScore, setAwayScore] = useState(0);
    const [liveScore, setLiveScore] = useState(0);
    const [pas, setPas] = useState(2);
    const [awayName, setAwayName] = useState(route.params.teamaway);
    const [homeName, setHomeName] = useState(route.params.teamhome);
    const [currenTeam, setCurrenTeam] = useState(route.params.teamhome);
    const [index, setIndex] = useState(0);
    const [tabus, setTabus] = useState([]);
    const [tur, setTur] = useState(1)
    const [kazanan, setKazanan] = useState(false)

    const Fetchwords = () => {
        fetch('http://192.168.2.104:4040/')
        .then(data => data.json())
        .then(data => setTabus(data))
    }

    useEffect(() => {
        if ( tabus.length === index ){
            Fetchwords()
            setIndex(0)
        }
    }, [index])

    useEffect(() => {
        Fetchwords()
    }, [])

    useEffect(() => {
        let interval = null;
        
        if ( start && remainingSecs !== 0 ){
            interval = setInterval(() => {
                setRemainingSecs(remainingSecs => remainingSecs -1)
            }, 1000)
        } else if ( remainingSecs === 0 ) {
            setStart(false);
            setRemainingSecs(route.params.time);
            currenTeam === homeName ? setCurrenTeam(awayName) : setCurrenTeam(homeName);

            if ( tur === route.params.tur && currenTeam === awayName ){
                setStart(false);
                setKazanan(awayScore > homeScore ? awayName : awayScore === homeScore ? 'Berabere' : homeScore);
            }

            
        }

        return () => clearInterval(interval)
    }, [start, remainingSecs]);

    const FullTime = getRemaining(remainingSecs).mins + ':' + getRemaining(remainingSecs).secs;
    const StartAGame = () => {
        setStart(true)
        setFirstGame(false);
        setLiveScore(0)
        setPas(2)
        setIndex(index => firstGame ? index : index + 1)
        !firstGame ? (currenTeam === homeName && setTur(tur => tur + 1)) : null
    }
    
    const TabuDogru = () => {
        setLiveScore(liveScore => liveScore + 1)
        setIndex(index => index + 1)
        currenTeam === awayName ? setAwayScore(awayScore => awayScore + 1) : setHomeScore(homeScore => homeScore + 1)
    }


    const PasGec = () => {
        if ( pas > 0 ){
            setPas(pas => pas - 1)
            setIndex(index => index + 1)
        }
    }


    const TabuOldu = () => {
        setIndex(index => index + 1);
        setLiveScore(liveScore => liveScore - 1)
        currenTeam === awayName ? setAwayScore(awayScore => awayScore - 1) : setHomeScore(homeScore => homeScore - 1)
    }

    const resetTheGame = () => {
        setAwayScore(0)
        setHomeScore(0)
        setLiveScore(0)
        setTur(1)
        setPas(2)
        Fetchwords()
        setIndex(0)
        setStart(true)
        setFirstGame(false)
        setKazanan(false)
    }

    return (
        <View style={[style.main]}>
            <GameHeader team={currenTeam} time={FullTime} />
            <View style={[style.skore]}>
                <View style={[style.flex, style.home]}>
                    <Text style={{flex: .7}}>
                        Tur
                    </Text>
                    <Text style={[style.score]}>
                        {tur}
                    </Text>
                </View>
                <View style={[style.flex, style.home]}>
                    <Text style={{flex: .7}}>
                        {homeName}
                    </Text>
                    <Text style={[style.score]}>
                        {homeScore}
                    </Text>
                </View>
                <View style={[style.flex, style.away]}>
                    <Text style={{flex: .7}}>
                        {awayName}
                    </Text>
                    <Text style={[style.score]}>
                        {awayScore}
                    </Text>
                </View>
            </View>
            <View style={[style.skore,style.flex, style.skoretable]}>
                <View style={[style.flex, { flex: .5, justifyContent: 'center'}]}>
                    <Text>Pas hakkı: </Text>
                    <Text>
                        {pas}
                    </Text>
                </View>
                <View style={[style.flex, { flex: .5, justifyContent: 'center'}]}>
                    <Text>Skor: </Text>
                    <Text>
                        {liveScore}
                    </Text>
                </View>
            </View>
            {tabus.length > index &&
            <View style={[style.tabuscreen]}>
                <View style={[style.header]}>
                    <Text style={[style.kelime]}>
                        {tabus[index].word}
                    </Text>
                </View>
                <View style={[style.yasak_kelime]}>
                    {tabus[index].forbiden.map((item, _) => <Text key={_} style={[style.k_yasak]}>{item.kelime}</Text>)}
                </View>
            </View>}
            <View style={{flexDirection: 'row'}}>
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
            {!start &&
            <View style={[style.baslat]}>
                <View style={[style.alert]}>
                    {!kazanan &&
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                        {currenTeam === homeName ? homeName : awayName}
                    </Text>}
                    <View style={{marginBottom: 0}}>
                        {!kazanan
                            ? <Text style={{marginTop: 5}}>Hazır olduğunuzda başlayın</Text>
                            : (
                                <View style={{flexDirection: 'row'}}>
                                    <Text>Kazana takım</Text>
                                    <Text style={{marginLeft: 'auto', fontWeight: 'bold'}}>{kazanan}</Text>
                                </View>
                            )
                        }
                        <TouchableOpacity onPress={() => !kazanan ? StartAGame() : resetTheGame()} style={{paddingHorizontal: 20,backgroundColor: '#85f070', marginTop: 5, borderRadius: 5, marginTop: 8}}>
                            <Text style={{paddingVertical: 7, textAlign: 'center', fontWeight: 'bold'}}>
                                {!kazanan ? 'Başlat' : 'Yeniden başlat'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {!firstGame && !kazanan &&
                    <React.Fragment>
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 5, marginTop: 10}}>
                            {currenTeam === homeName ? awayName : homeName}
                        </Text>
                        <View style={[style.flex, style.home, { borderWidth: 1, borderColor: '#ddd', marginBottom: 0}]}>
                            <Text style={{flex: .7}}>Score</Text>
                            <Text style={[style.score]}>
                                {liveScore}
                            </Text>
                        </View>
                    </React.Fragment>}
                </View>
            </View>}
        </View>
    )
}

const style = StyleSheet.create({
    score: {
        flex: .3,
        textAlign: 'right'
    },
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
    },
    home: {
        backgroundColor: '#eee',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderTopWidth: 1,
        borderTopColor: '#ddd'
    },
    away: {
        backgroundColor: '#eee',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    main: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
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
    },
    header: {
        backgroundColor: '#ddd',
        alignItems: 'center',
        paddingVertical: 5
    },
    tabuscreen: {
        
    },
    kelime: {
        fontSize: 20,
        fontWeight: '700',
        color :'#111'
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
        paddingHorizontal: 15
    },
    baslat: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#00000023',
        alignItems: 'center',
        justifyContent: 'center'
    },
    alert: {
        backgroundColor: '#fff',
        padding: 20,
        width: '70%',
        borderRadius: 5,
    }
})

export default PlayScreen;