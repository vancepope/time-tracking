import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import TimerButton from './TimerButton';
import { AppContext } from '../context/AppContext';

export default function TimerForm(props) {
    const [state, setContext] = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [project, setProject] = useState('');
    const submitText = (handleText() === true) ? 'Update' : 'Create';
    function handleText() {
        const { projectList } = state;
        const idExists = checkIdExists(projectList, props.id);
        if (idExists) {
            return true;
        }
        return false;
    }
    function checkIdExists(list, id) {
        const obj = list.find(o => o.id === id);
        if (obj !== undefined) {
            return true;
        }
        return false;
    }
    function handleSubmit() {
        const newList = [...state.projectList];
              index = state.count + 1,
              idExists = checkIdExists(state.projectList, props.id);
        
        if (idExists) {
            const list = updateList(state.projectList, props.id)
            setContext(state => ({...state, projectList: list, isOpen: false }));
        } else {
            newList.push({ id: index, title: title, project: project, isRunning: false, elapsed: 0, isEditing: false });
            setContext(state => ({...state, projectList: newList, count: index, isOpen: false}));
        }
    }
    function handleCancel() {
        const list = updateList(state.projectList, props.id);
        if (state.isOpen) {
            setContext(state => ({...state, isOpen: false}))
            return;
        } 
        setContext(state => ({...state, projectList: list}));
    }
    function updateList(list, id) {
        let updatedItem = {
            id: id,
            title: (title === '') ? props.title : title,
            project: (project === '') ? props.project : project,
            isRunning: false,
            elapsed: 0,
            isEditing: false,
        };
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                list.splice(i, 1, updatedItem);
            }
        }

        return list;
    }

    return (
        <View style={styles.formContainer}>
            <View style={styles.attributeContainer}>
                <Text style={styles.textInputTitle}>Title</Text> 
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput} 
                        underlineColorAndroid="transparent" 
                        defaultValue={props.title}
                        onChangeText={value => setTitle(value)}
                    /> 
                </View>
            </View>
            <View style={styles.attributeContainer}>
                <Text style={styles.textInputTitle}>Project</Text> 
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput} 
                        underlineColorAndroid="transparent" 
                        defaultValue={props.project}
                        onChangeText={value => setProject(value)}
                    /> 
                </View>
            </View>
            <View style={styles.buttonGroup}>
                <TimerButton small color="#21BA45" title={submitText} onPress={handleSubmit} />
                <TimerButton small color="#DB2828" title="Cancel" onPress={handleCancel} /> 
            </View>
        </View> 
    );
}
const styles = StyleSheet.create({ 
    formContainer: {
        backgroundColor: 'white', 
        borderColor: '#D6D7DA', 
        borderWidth: 2, 
        borderRadius: 10, 
        padding: 15,
        margin: 15,
        marginBottom: 0,
    },
    attributeContainer: {
        marginVertical: 8,
    },
    textInputContainer: {
        borderColor: '#D6D7DA', 
        borderRadius: 2, 
        borderWidth: 1, 
        marginBottom: 5,
    },
    textInput: {
        height: 30,
        padding: 5,
        fontSize: 12,
    },
    textInputTitle: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        marginBottom: 5,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
    },
});