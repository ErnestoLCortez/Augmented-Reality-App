import React, { PropTypes, Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { mixins, variables } from '../constants';
import { removeArObject } from '../actions/augmented';

class ArObject extends Component {

  constructor(props){
    super(props);
    this.state = {
      offScreenLeft: false,
      offScreenRight: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if((nextProps.startingPosX + nextProps.xOffset) < 0) {
      this.setState({ offScreenLeft: true });
    } else {
      this.setState({ offScreenLeft: false });
    }
    if((nextProps.startingPosX + nextProps.xOffset) > variables.SCREEN_WIDTH) {
      this.setState({ offScreenRight: true });
    } else {
      this.setState({ offScreenRight: false });
    }
  }
  shouldComponentUpdate(nextProps) {
    return (
      this.props.xOffset != nextProps.xOffset ||
      this.props.yOffset != nextProps.yOffset
    )
  }

  render() {
    return (
      <View style={styles.root}>
        <Image
          source={require('../assets/images/marker.png')}
          resizeMode='contain'
          style={[
            styles.arTarget,
            {
              top: this.props.startingPosY + this.props.yOffset,
              left: this.props.startingPosX + this.props.xOffset
            }
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    ...mixins.arObject,
    ...mixins.row
  },
  arTarget: {
    ...mixins.arObject,
    height: variables.AR_OBJECT_SIZE,
    width: variables.AR_OBJECT_SIZE
  }
});

function mapStateToProps({ augmented }) {
  return {
    ...augmented
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeArObject: (arObjIndex) => dispatch(removeArObject(arObjIndex))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArObject);