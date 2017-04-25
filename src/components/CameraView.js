'use strict';
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Container } from 'native-base';
import ModalForMessage from './CameraViewParts/ModalForMessage';
import BasicCamera from './CameraViewParts/BasicCamera';

export default class CameraView extends Component {
    constructor(props){
        super(props);
        this.state = {data: null}
    }

    componentWillMount(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var backendToken = null;
                var firebaseToken = null;
                try {
                    backendToken = AsyncStorage.getItem('JWT_TOKEN');
                    firebaseToken = AsyncStorage.getItem('ID_TOKEN');
                } catch(err) {
                    console.log(err);
                }
                fetch('https://terrasite.herokuapp.com/api/arposts/' +
                position['coords']['latitude'] + '/' + position['coords']['longitude'] + '/0' ,{
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': backendToken,
                        'idtoken': firebaseToken
                    }})
                    .then((response) => response.json())
                    .then((responseJson) =>{
                        this.setState({data: responseJson});
                        console.log(this.state.data);
                    })
                    .catch((error) =>{
                        console.error(error);
                });
            },
            (error) => {alert(JSON.stringify(error))},
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        );
    }
    render() {
        return (
            <Container>


                <ModalForMessage>
                  <BasicCamera/>
                </ModalForMessage>

            </Container>
        );
    }
}
