import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Spinner } from 'native-base';
import firebase from 'firebase';
import AppHeader from './components/AppHeader';
import LoginForm from './components/LoginForm';
import Navigator from './components/Navigator';
import getAPIToken from './api/apiAuth';


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
          this.fetchToken(user);
        } else {
          this.setState({ loggedIn: false });
        }
      });
    }

    fetchToken(user){
      user.getToken().then(async function(idToken){
        var jwtToken = await getAPIToken(idToken);
        if (jwtToken){
          try{
            await AsyncStorage.setItem('JWT_TOKEN', jwtToken);
          } catch (error){
            console.log(error);
          }
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
