import React, { Component } from 'react';
import { Container, Content, ListItem, Text, Separator, Button } from 'native-base';
import  MotManager from './MotManager';
import firebase from 'firebase';


export default class SettingsView extends Component {
    constructor(props){
        super(props);
        this.state = {initialPosition: 'unknown', lastPosition: 'unknown'};
        //Binds for onclick
        this.testGPSButtonPress = this.testGPSButtonPress.bind(this);
    }
    watchID: ?number = null;

    //Function that sets states with GPS coordinates and other information
    testGPSButtonPress(event){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                //Turns json to string for setting initialPosition state
                var initialPosition = JSON.stringify(position);
                this.setState({initialPosition});
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
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

                    <ListItem onPress={() => firebase.auth().signOut()}>
                        <Text>Sign Out</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Account</Text>
                    </ListItem>
                    <ListItem last>
                        <Text>Display Name</Text>
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
                        <Text>Current Position</Text>
                        <Text>{this.state.initialPosition}</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Last Position</Text>
                        <Text>{this.state.lastPosition}</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Sensors</Text>
                        <MotManager/>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}
