import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Spinner } from 'native-base';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import Navigator from './components/Navigator';
import { getAPIToken } from './actions/apiAuth';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, comibineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from './reducers';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunk,
      loggerMiddleware,
    ),
  );
  return create(reducer, initialState, enhancer);
}

const store = configureStore();

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
            await AsyncStorage.setItem('ID_TOKEN', idToken);
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
        this.renderContent()
    );
  }
}

export default App;
