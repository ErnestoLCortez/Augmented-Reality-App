import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Spinner } from 'native-base';
import Firebase from './middleware/FirebaseInit';
import LoginForm from './components/LoginForm';
import Navigator from './components/Navigator';
import { getAPIToken } from './lib/api';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './actions';


class PostAR extends Component {

  constructor(){
    super();
    this.state = { loggedIn: null };
  }

  componentWillMount() {
    Firebase.auth().onAuthStateChanged((user) => {
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

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAR);