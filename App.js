import React from 'react';
import { StyleSheet } from 'react-native';
import Home from './src/components/Home';
import { AppProvider } from './src/context/AppContext';

export default function App(props) {
  return (
    <AppProvider>
      <Home {...props} />
    </AppProvider>
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
