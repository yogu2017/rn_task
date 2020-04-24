/* @c'est-la-vie*/

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import styles from './../../Style/Index';
import Fn from './../../function/Fun';
export default class Index extends Component {
  static navigationOptions =({navigation})=>({
    title:'我的任务',
    headerRight:(
          <TouchableOpacity activeOpacity={0.8} style={{marginRight: 5}} onPress={navigation.state.params.navigatePress}>
            <Image source={require('./../../assets/search.png')} style={styles.account_icon} />
          </TouchableOpacity>)
  })
  constructor(props) {
  super(props);
  this.state = {
    select:1
     };
  }
  _select1(){
    this.setState({select:1});
  }
  _select2(){
    this.setState({select:2});
  }
  _select3(){
    this.setState({select:3});
  }
  _select4(){
    this.setState({select:4});
  }
  _task_search(){
    Fn.showToast('OK')
  }
  componentDidMount(){
    this.props.navigation.setParams({ navigatePress:this._task_search.bind(this)});
  }
  render() {
    return (
      <View style={styles.task_container}>
        <View style={styles.task_body}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this._select1.bind(this)}
            style={(this.state.select==1)?(styles.task_sel):(styles.task_unsel)}
          >
            <Text style={(this.state.select==1)?(styles.task_sel_text):''}>全部</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this._select2.bind(this)}
            style={(this.state.select==2)?(styles.task_sel):(styles.task_unsel)}
          >
            <Text style={(this.state.select==2)?(styles.task_sel_text):''}>未通过</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this._select3.bind(this)}
            style={(this.state.select==3)?(styles.task_sel):(styles.task_unsel)}
          >
            <Text style={(this.state.select==3)?(styles.task_sel_text):''}>待审核</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this._select4.bind(this)}
            style={(this.state.select==4)?(styles.task_sel):(styles.task_unsel)}
          >
            <Text style={(this.state.select==4)?(styles.task_sel_text):''}>已完成</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.task_list_body}>
          <View style={styles.task_list_item}>
            <View >
              <Image source={{uri:'https://cn.bing.com/th?id=OHR.PipingPlover_ZH-CN0992806167_1920x1080.jpg'}} style={styles.task_img} />
            </View>
            <View style={styles.task_item_right}>
              <Text>已完成</Text>
            </View>
          </View>

        </View>
      </View>
    );
  }
}
