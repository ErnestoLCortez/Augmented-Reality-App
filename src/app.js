import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Spinner } from 'native-base';
import firebase from 'firebase';
import AppHeader from './components/AppHeader';
import LoginForm from './components/LoginForm';
import Navigator from './components/Navigator';


class App extends Component {

  state = { loggedIn: null };

    componentWillMount() {
      firebase.initializeApp({
      apiKey: 'AIzaSyB8RsM5NUFI_YQG9NXEhWntEZ8pMci-SmE',
      authDomain: 'terrasite-58680.firebaseapp.com',
      databaseURL: 'https://terrasite-58680.firebaseio.com',
      storageBucket: 'terrasite-58680.appspot.com',
      messagingSenderId: '292158142746'
    });
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
      });
    }

    renderContent() {

      switch(this.state.loggedIn){
        case true:
          return <Navigator />
        case false:
          return <LoginForm />
        default:
          return <Spinner />;
      }

    }

  render() {
    return (
      <Container>
        <AppHeader />
        {this.renderContent()}
      </Container>
    );
  }
}

export default App;
