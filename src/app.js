import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';

export default class App extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
          <Title>TerraSite???</Title>
          </Body>
          <Right>
          </Right>
        </Header>
      </Container>
    );
  }
}
