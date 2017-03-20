import React, { Component } from 'react';
import { Container, Content, ListItem, Text, Separator } from 'native-base';

export default class SettingsView extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Separator bordered>
                        <Text>Profile</Text>
                    </Separator>

                    <ListItem >
                        <Text>Sign Out</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Account</Text>
                    </ListItem>
                    <ListItem last>
                        <Text>Display Name</Text>
                    </ListItem>

                    <Separator bordered>
                        <Text>Testing</Text>
                    </Separator>

                    <ListItem>
                        <Text>GPS Test</Text>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}
