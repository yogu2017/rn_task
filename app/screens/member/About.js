/* @c'est-la-vie*/

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import styles from './../../Style/Index';
import Fn from './../../function/Fun';
export default class Index extends Component {
  static navigationOptions =({navigation})=>({
    title:'关于我们',
  })
  constructor(props) {
  super(props);
  this.state = {

     };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>关于</Text>
      </View>
    );
  }
}
