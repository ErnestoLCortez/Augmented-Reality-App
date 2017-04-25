import React, { Component } from 'react';
import { Container, Content, ListItem, Text, Separator, Button, Toast } from 'native-base';
import { AsyncStorage } from 'react-native'
import  MotManager from './MotManager';
import firebase from 'firebase';
import FireAuth from 'react-native-firebase-auth';
import { getFBuserName } from '../actions/apiAuth';


export default class SettingsView extends Component {
    constructor(props){
        super(props);
        this.state = {latitude: 'unknown', longitude: 'unknown', lastPosition: 'unknown', userName: JSON.stringify(getFBuserName()) }
        //Binds for onclick
        this.testGPSButtonPress = this.testGPSButtonPress.bind(this);
    }
    watchID: ?number = null;

    //Function that sets states with GPS coordinates and other information
    testGPSButtonPress(event){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                //Sets states from JSON position object
                this.setState({
                    latitude: position['coords']['latitude'],
                    longitude: position['coords']['longitude']
                });
                //Creates var to store details of post
                var postDetails = {
                    "name": this.state.userName,
                    "longitude": this.state.longitude,
                    "latitude": this.state.latitude,
                    "content": ":^)"
                };
                var backendtoken = AsyncStorage.getItem('JWT_TOKEN');
                var firebasetoken = AsyncStorage.getItem('ID_TOKEN');
                //Using fetch library to post to backend db using heroku link
                fetch('https://terrasite.herokuapp.com/api/arposts', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': backendtoken,
                        'idtoken': firebasetoken
                    },
                    body: JSON.stringify(postDetails)
                });
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            //Turns json to string for setting lastPosition state
            var lastPosition = JSON.stringify(position);
            this.setState({lastPosition});
        });
    }
    render() {
        return (
            <Container>
                <Content>
                    <Separator bordered>
                        <Text>Profile</Text>
                    </Separator>
                    <ListItem onPress={() => FireAuth.logout()}>
                        <Text>Sign Out</Text>
                    </ListItem>
                    <Separator bordered>
                        <Text>Display Name</Text>
                    </Separator>
                    <ListItem last>
                        <Text>Display Name: </Text>
                        <Text>{this.state.userName}</Text>
                    </ListItem>

                    <Separator bordered>
                        <Text>Testing</Text>
                    </Separator>
                    <ListItem>
                        <Button onPress={this.testGPSButtonPress}>
                            <Text>GPS Test</Text>
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Text>Latitude: </Text>
                        <Text>{this.state.latitude}</Text>
                    <ListItem>
                    </ListItem>
                        <Text>Longitude: </Text>
                        <Text>{this.state.longitude}</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Sensors</Text>
                    </ListItem>
                    <ListItem>
                        <MotManager/>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}
