import React, { Component } from 'react';
import {StyleSheet, Dimensions} from 'react-native'
import { Container } from 'native-base';
import MapView from 'react-native-maps'
var {height, width } = Dimensions.get('window');
import { Post } from './Post';

export default class PostingsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        // fetch('https://terrasite.herokuapp.com/api/arposts')
        //     .then((response) => response.json())
        //     .then((responseJson) =>{
        //         this.setState({
        //             data: responseJson
        //         })
        //     })
        //     .catch((error) =>{
        //         console.error(error);
        //     });
    }
    render() {
        // const posts = this.state.data.map((object, index) => {
        //     if(object.hasOwnProperty('name')){
        //         return (
        //             <Post key={index} content={object.content} name={object.name}/>
        //         );
        //     }
        // });
        return (
            <Container>
            <MapView style={styles.map}
                initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            />
            </Container>
        );
    }
}
var styles = StyleSheet.create({
  map:{
      width:width,
      height: height
  }
});
