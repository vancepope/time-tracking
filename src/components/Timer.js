import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { millisecondsToHuman } from '../../utils/TimerUtils'; 
import TimerButton from './TimerButton';
import { AppContext } from '../context/AppContext';

export default function Timer(props) { 
    const [state, setContext] = useContext(AppContext);
    const elapsedString = millisecondsToHuman(props.elapsed);
    function handleEdit(list, id) {
        const obj = list.find(o => o.id === id);
        obj.isEditing = true;
        for (let i = 0; i < list.length; i++) {
            if (list.id === id) {
                list.splice(i, 1, obj);
            }
        }
        setContext(state => ({...state, projectList: list}));
    }
    return (
        <View style={styles.timerContainer}>
            <Text style={styles.title}>{props.title}</Text> 
            <Text>{props.project}</Text>
            <Text style={styles.elapsedTime}>{elapsedString}</Text> 
            <View style={styles.buttonGroup}>
                <TimerButton color="blue" small title="Edit" onPress={() => handleEdit(state.projectList, props.id)} />
                <TimerButton color="blue" small title="Remove" /> 
            </View>
            <TimerButton color="#21BA45" title="Start" /> 
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
    