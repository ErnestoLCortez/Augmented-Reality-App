import React, { Component } from 'react';
import { Content, Text } from 'native-base';

export class Post extends Component{
    render(){
        return(
            <Content>
                    <Text>{this.props.name}</Text>
                    <Text>{this.props.content}</Text>
            </Content>
            );
    }
}
