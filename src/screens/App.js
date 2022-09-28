
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import Home from './home/Home';
import configureStore from '../redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import Navigation from '../components/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
const store = configureStore();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </ReduxProvider>
  );
};


export default App;
