import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text, Container, Content } from 'native-base';
import PostingsList from './PostingsList';
import SettingsView from './SettingsView';
import CameraView from './CameraView';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class Navigator extends Component {
  constructor(props){
    super(props);
    this.state = {
      tab1: false,
      tab2: true,
      tab3: false,
      ComponentPicked: PostingsList
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
      ComponentPicked: PostingsList
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
              <Text active={this.state.tab1}>Camera</Text>
            </Button>
            <Button active={this.state.tab2} onPress={() => this.toggleTab2()} >
              <Icon active={this.state.tab2} name="ios-person" />
              <Text active={this.state.tab2}>Posts</Text>
            </Button>
            <Button active={this.state.tab3} onPress={() => this.toggleTab3()} >
              <Icon active={this.state.tab3} name="settings" />
              <Text active={this.state.tab3}>Settings</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

// injects global props at root level
function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);