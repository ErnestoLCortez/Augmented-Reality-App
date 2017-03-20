import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import firebase from 'firebase';
import AppHeader from './components/AppHeader';
import LoginForm from './components/LoginForm';
import Navigator from './components/Navigator';


class App extends Component {
    componentWillMount() {
      firebase.initializeApp({
      apiKey: 'AIzaSyB8RsM5NUFI_YQG9NXEhWntEZ8pMci-SmE',
      authDomain: 'terrasite-58680.firebaseapp.com',
      databaseURL: 'https://terrasite-58680.firebaseio.com',
      storageBucket: 'terrasite-58680.appspot.com',
      messagingSenderId: '292158142746'
    });
    }
  render() {
    return (
      <Container>
        <AppHeader />
        <Navigator />
      </Container>
    );
  }
}

export default App;
