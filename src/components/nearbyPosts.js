import React, { Component } from 'react';
import { Container } from 'native-base';
import { Post } from './Post';

export default class PostingsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount(){
      navigator.geolocation.getCurrentPosition(
          (position) => {
              //Sets states from JSON position object
              this.setState({
                  latitude: position['coords']['latitude'],
                  longitude: position['coords']['longitude']
              });
        fetch('https://terrasite.herokuapp.com/api/arposts/:latitude/:longitude/:altitude', {
                    method: 'GET',
                    headers: {
                        ‘Accept’: ‘application/json’,
                        ‘Content-Type’: ‘application/json’,
                        "x-access-token":"BACKENDTOKEN",
                        "idtoken":"FIREBASETOKEN",
                        "latitude":latitude,
                        "longitude":longitude
                    },
                    body: JSON.stringify(postDetails)
                });
            .then((response) => response.json())
            .then((responseJson) =>{
                this.setState({
                    data: responseJson
                })
            })
            .catch((error) =>{
                console.error(error);
            });
    }
    render() {
        const posts = this.state.data.map((object, index) => {
            if(object.hasOwnProperty('name')){
                return (
                    <Post key={index} content={object.content} name={object.name}/>
                );
            }
        });
        return (
            <Container>
                {posts}
            </Container>
        );
    }
}
