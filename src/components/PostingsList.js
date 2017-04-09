import React, { Component } from 'react';
import { Container, Content, ListItem, Text } from 'native-base';
import { Post } from './Post';

export default class PostingsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        fetch('https://terrasite.herokuapp.com/api/arposts')
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
