import React from 'react';
import Modal from 'react-native-simple-modal';
import {Text, TouchableOpacity, View} from 'react-native';
import { Content, Form, Button, Text, Card } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import { FormInput } from './FormInput';

class ModalForMessage extends React.Component {
  state = {
    open: false,
    message: ''
  };
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
          <Form>
            <Card>
                <FormInput
                    labelProp='enter a message'
                    value={this.state.message}
                    onChangeText={ email => this.setState({ message }) }
                />
            </Card>
            <Card>
                <Button full success onPress={() => this.setState({open: false})}>
                    <Text>Post</Text>
                </Button>
            </Card>
          </Form>
        </View>
      </Modal>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    flex:1,
    fontSize: 20,
    height: 22,
    color: 'white',
  }
});

export default ModalForMessage;
