import React, { Component } from 'react';
import { StyleSheet, Dimensions, AsyncStorage, Text } from 'react-native'
import { Container } from 'native-base';
import MapView from 'react-native-maps'

var {height, width } = Dimensions.get('window');

export default class PostingsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            latitude: 0.0, longitude: 0.0, data: []
        }
    }
    componentDidMount(){
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

                this.setState({latitude: position['coords']['latitude'],
                longitude: position['coords']['longitude']});

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
                    this.setState({data: responseJson})
                  })
                  .catch((error) =>{
                    console.error(error);
                  });
            },
            //Catch for location
            (error) => {
                console.log(error);
            }
        );
    }

    componentWillUnmount(){
        navigator.geolocation.clearWatch(this);
    }

    render() {
        console.log(this.state.data);
        const posts = this.state.data.map((object, index) => {
            return <MapView.Marker key={index} coordinate={{latitude: object['location']['coordinates'][1],
                    longitude: object['location']['coordinates'][0]}}>
                    <MapView.Callout style={styles.plainView}>
                        <Text>{object['content']}</Text>
                        <Text></Text>
                        <Text>Posted by: {object['name']}</Text>
                    </MapView.Callout>
                    </MapView.Marker>
        });
        return (
            <Container>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.0042,
                        longitudeDelta: 0.0021,
                    }}>
                    { posts }
                </MapView>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    plainView: {
        width: 200,
    },
  map:{
      width:width,
      height: height
  }
});
