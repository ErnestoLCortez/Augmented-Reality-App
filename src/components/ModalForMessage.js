import React from 'react';
import Modal from 'react-native-simple-modal';
import {Text, TouchableOpacity, View} from 'react-native';

class ModalForMessage extends React.Component {
  state = {open: false};
  render() {
    return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => this.setState({open: true})}>
        <Text>Open modal</Text>
      </TouchableOpacity>
      <Modal
        offset={this.state.offset}
        open={this.state.open}
        modalDidOpen={() => console.log('modal did open')}
        modalDidClose={() => this.setState({open: false})}
        style={{alignItems: 'center'}}>
        <View>
          <Text style={{fontSize: 20, marginBottom: 10}}>ModalForMessage Component</Text>
          <TouchableOpacity
            style={{margin: 5}}
            onPress={() => this.setState({open: false})}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    );
  }
}

export default ModalForMessage;
