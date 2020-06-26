import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { millisecondsToHuman } from '../../utils/TimerUtils'; 
import TimerButton from './TimerButton';
import { AppContext } from '../context/AppContext';

export default function Timer(props) { 
    const [state, setContext] = useContext(AppContext);
    const elapsedString = millisecondsToHuman(props.elapsed);
     
    function handleEdit() {
        const list = [...state.projectList],
              obj = list.find(o => o.id === props.id);
        obj.isEditing = true;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === props.id) {
                list.splice(i, 1, obj);
            }
        }
        setContext(state => ({...state, projectList: list}));
    }
    function handleDelete() {
        const list = [...state.projectList];
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === props.id) {
                list.splice(i, 1);
            }
        }
        const count = list.length;
        setContext(state => ({...state, projectList: list, count: count}));
    }
    function toggleTimer() {
        const list = [...state.projectList];
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === props.id) {
                list[i].isRunning = !list[i].isRunning;
                setContext(state => ({...state, projectList: list}));
                startTimer();
            }
        } 
    }
    function startTimer() {
        const list = [...state.projectList];
        let interval = null;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === props.id) {
                if (list[i].isRunning) {
                    interval = setInterval(() => {
                        list[i].elapsed += 1000;
                        setContext(state => ({...state, projectList: list}))
                        if (!list[i].isRunning) {
                            list[i].elapsed -= 1000;
                            setContext(state => ({...state, projectList: list}))
                            clearInterval(interval);
                            return;
                        }
                    }, 1000);
                }
                return () => clearInterval(interval);
            }
        }
    }
    return (
        <View style={styles.timerContainer}>
            <Text style={styles.title}>{props.title}</Text> 
            <Text>{props.project}</Text>
            <Text style={styles.elapsedTime}>{elapsedString}</Text> 
            <View style={styles.buttonGroup}>
                <TimerButton color={props.isRunning ? "grey" : "blue"} small title="Edit" onPress={handleEdit} disabled={props.isRunning} />
                <TimerButton color={props.isRunning ? "grey" : "blue"} small title="Remove" onPress={handleDelete} disabled={props.isRunning} /> 
            </View>
            <View style={styles.buttonGroup}>
                <TimerButton color={props.isRunning ? "grey" : "#21BA45"} title="Start" onPress={toggleTimer} disabled={props.isRunning}/> 
                <TimerButton color={props.isRunning ? "red" : "gray"} title="Stop" onPress={toggleTimer} disabled={!props.isRunning}/>
            </View>
        </View>
    ); 
}
const styles = StyleSheet.create({ 
    timerContainer: {
        backgroundColor: 'white', 
        borderColor: '#d6d7da', 
        borderWidth: 2, 
        borderRadius: 10, 
        padding: 15,
        margin: 15,
        marginBottom: 0,
    },
    title: {
        fontSize: 14, 
        fontWeight: 'bold',
    },
    elapsedTime: {
        fontSize: 26, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        paddingVertical: 15,
    },
    buttonGroup: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    }, 
});
    