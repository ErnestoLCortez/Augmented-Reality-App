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
            latitude: null, longitude: null
        }
    }
    componentWillMount(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({latitude: position['coords']['latitude'],
                longitude: position['coords']['longitude']})
        });
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
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.0042,
                        longitudeDelta: 0.0021,
                    }}>

                </MapView>
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
