import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

export default class TabbedFooter extends Component {
    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button>
                        <Icon name="camera" />
                        <Text>Camera</Text>
                    </Button>
                    <Button active>
                        <Icon name="settings" />
                        <Text>Settings</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}
