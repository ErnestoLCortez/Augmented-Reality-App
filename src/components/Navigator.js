import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text, Container, Content } from 'native-base';
import LoginForm from './LoginForm';
import SettingsView from './SettingsView';
import CameraView from './CameraView';

export default class Navigator extends Component {
    constructor(props){
        super(props);
        this.state = {
            tab1: false,
            tab2: true,
            tab3: false,
            ComponentPicked: LoginForm
        };
    }
    toggleTab1(){
        this.setState({
            tab1: true,
            tab2: false,
            tab3: false,
            ComponentPicked: CameraView
        });
    }
    toggleTab2(){
        this.setState({
            tab1: false,
            tab2: true,
            tab3: false,
            ComponentPicked: LoginForm
        });
    }
    toggleTab3(){
        this.setState({
            tab1: false,
            tab2: false,
            tab3: true,
            ComponentPicked: SettingsView
        });
    }
    render() {
        return (
            <Container>
                <Content>
                    <this.state.ComponentPicked/>
                </Content>
                <Footer>
                <FooterTab>
                    <Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
                        <Icon active={this.state.tab1} name="camera" />
                        <Text>Camera</Text>
                    </Button>
                    <Button active={this.state.tab2} onPress={() => this.toggleTab2()} >
                        <Icon active={this.state.tab2} name="ios-person" />
                        <Text>Logging</Text>
                    </Button>
                    <Button active={this.state.tab3} onPress={() => this.toggleTab3()} >
                        <Icon active={this.state.tab3} name="settings" />
                        <Text>Settings</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
        );
    }
}
