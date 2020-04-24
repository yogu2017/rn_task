/* @c'est-la-vie*/

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class Index extends Component {
  static navigationOptions =({navigation})=>({
    title:'实名认证',
  })
  constructor(props) {
  super(props);
  this.state = {

     };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>实名认证</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
