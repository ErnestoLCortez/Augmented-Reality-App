import React, { Component } from 'react';
import { Container, Content, ListItem, Text, Separator } from 'native-base';

export default class PostingsList extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render() {
        this.getPosts();
        return (
            <Container>
                <Content>
                    <ListItem>
                    </ListItem>
                </Content>
            </Container>
        );
    }
    getPosts(){
        return fetch('https://terrasite.herokuapp.com/api/arposts')
            .then((response) => response.json())
            .then((responseJson) =>{
                console.log(responseJson);
                return responseJson;
            })
            .catch((error) =>{
                console.error(error);
            });
    }
}
