import React from 'react';
import Modal from 'react-native-simple-modal';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

class ModalForMessage extends React.Component {
  state = {open: false};
  render() {
    return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => this.setState({open: true})}>
        <Icon name="star-half" style={styles.actionButtonIcon} />
      </ActionButton>
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
