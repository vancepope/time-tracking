import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import TimerButton from './TimerButton'; 
import TimerForm from './TimerForm';
import { AppContext } from '../context/AppContext';

export default function ToggleableTimerForm() { 
    const [state, setState] = useContext(AppContext);
    function handlePress() {
        if (state.isOpen) {
            return alert("You may only add one at a time", "Ok");
        } else {
            setState(state => ({ ...state, isOpen: true }));
        }
    }
    return (
        <View 
            style={[styles.container, !state.isOpen && styles.buttonPadding]}> 
                {
                    state.isOpen ? (<TimerForm /> ):(
                                <TimerButton title="+" color="black" onPress={handlePress}/> )
                }
        </View> 
    );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  buttonPadding: {
    paddingHorizontal: 15,
  },
});