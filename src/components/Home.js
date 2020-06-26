import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import EditableTimer from './EditableTimer';
import ToggleableTimerForm from './ToggleableTimerForm';
import { AppContext } from '../context/AppContext';

export default function Home() {
    const [state, setContext] = useContext(AppContext);
    return (
        <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Timers</Text>
        </View>
        <ScrollView style={styles.timerList}>
            <ToggleableTimerForm />
            {
                state.projectList && state.projectList.map((item, index) => {
                    return (
                        <EditableTimer 
                            key={index}
                            id={item.id}
                            title={item.title}
                            project={item.project}
                            isRunning={item.isRunning}
                            elapsed={item.elapsed}
                            isEditing={item.isEditing}
                        />
                    );
                })
            }
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({ 
  appContainer: {
    flex: 1, 
  },
  titleContainer: {
    paddingTop: 35, 
    paddingBottom: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#D6D7DA',
    backgroundColor: '#07A6B6',
  }, 
  title: {
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center',
    color: '#fff'
  },
  timerList: {
    paddingBottom: 15,
  },
});
