import React, { Component } from 'react';
import { Container, Content, ListItem, Text, Separator, Button } from 'native-base';

export default class SettingsView extends Component {
    constructor(props){
        super(props);
        this.state = {latitude: 'unknown', longitude: 'unknown', lastPosition: 'unknown'}
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
                //Using fetch library to post to backend db using heroku link
                fetch('https://terrasite.herokuapp.com/api/arposts', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'name': "testPostM2",
                        'longitude': this.state.longitude,
                        'latitude': this.state.latitude,
                        'content': ":^)"
                    })
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

                    <ListItem >
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
                        <Text>Latitude: </Text>
                        <Text>{this.state.latitude}</Text>
                        <Text>Longitude: </Text>
                        <Text>{this.state.longitude}</Text>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}
