import React from 'react';
import { View } from 'react-native';
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base';

const AppHeader = () => {
  return (
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
  );
};


export default AppHeader;
