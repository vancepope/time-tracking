import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import EditableTimer from './src/components/EditableTimer';
import ToggleableTimerForm from './src/components/ToggleableTimerForm';

export default function App() {
  return (
    <View style={styles.appContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Timers</Text>
      </View>
      <ScrollView style={styles.timerList}>
        <ToggleableTimerForm isOpen={false} />
        <EditableTimer />
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
  }, 
  title: {
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center',
  },
  timerList: {
    paddingBottom: 15,
  },
});
