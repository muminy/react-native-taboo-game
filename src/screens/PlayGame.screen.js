import React, { useState, useEffect } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { GameHeader } from '../components/Header';
import ScoreTableComponent from '../components/ScoreTableComponent';
import UserAction from '../components/UserAction';
import GameArea from '../components/GameArea';
import GameActions from '../components/GameActions';
import StartGameComponent from '../components/StartGameComponent';




const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

const PlayScreen = function({route}){


    
    const [remainingSecs, setRemainingSecs] = useState(route.params.time);
    const [start, setStart] = useState(true);
    const [firstGame, setFirstGame] = useState(true);
    const [homeScore, setHomeScore] = useState(0);
    const [awayScore, setAwayScore] = useState(0);
    const [liveScore, setLiveScore] = useState(0);
    const [pas, setPas] = useState(2);
    const [awayName, setAwayName] = useState(route.params.teamaway);
    const [homeName, setHomeName] = useState(route.params.teamhome);
    const [currenTeam, setCurrenTeam] = useState(route.params.teamhome);
    const [index, setIndex] = useState(0);
    const [tabus, setTabus] = useState(route.params.words);
    const [tur, setTur] = useState(1)
    const [kazanan, setKazanan] = useState(false)

    useEffect(() => {
        let interval = null;
        
        if ( !start && remainingSecs !== 0 ){
            interval = setInterval(() => setRemainingSecs(remainingSecs => remainingSecs -1), 1000)
        } else if ( remainingSecs === 0 ) {
            setStart(true);
            setRemainingSecs(route.params.time);
            currenTeam === homeName ? setCurrenTeam(awayName) : setCurrenTeam(homeName);

            if ( tur === route.params.tur && currenTeam === awayName ){
                setStart(true);
                setKazanan(awayScore > homeScore ? awayName : awayScore === homeScore ? 'Berabere' : homeName);
                setFirstGame(true)
            }

        }

        return () => clearInterval(interval)
    }, [start, remainingSecs]);

    const FullTime = getRemaining(remainingSecs).mins + ':' + getRemaining(remainingSecs).secs;

    const StartAGame = () => {
        setStart(false)
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
        setStart(false)
        setFirstGame(false)
        setKazanan(false)
    }

    return (
        <View style={[style.main]}>
            <GameHeader team={currenTeam} time={FullTime} />
            <ScoreTableComponent 
                awayName={awayName} 
                homeName={homeName} 
                awayScore={awayScore}
                homeScore={homeScore}
                tur={tur} />
            <UserAction 
                liveSkor={liveScore}
                pas={pas}
            />
            {tabus?.length ? <GameArea tabus={tabus} index={index} /> : null }
            <GameActions 
                PasGec={() => PasGec()}
                TabuDogru={() => TabuDogru()}
                TabuOldu={() => TabuOldu()}
                remainingSecs={remainingSecs}
            />
            {start ? (
                <StartGameComponent 
                    kazanan={kazanan} 
                    StartGame={() => StartAGame()}
                    currentTeam={currenTeam}
                    lastTeam={currenTeam === homeName ? awayName : homeName}
                    liveScore={liveScore}
                    resetGame={() => resetTheGame()} 
                    firstGame={firstGame} />
            ) : null}
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
        paddingHorizontal: 15,
        marginRight: 'auto'
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