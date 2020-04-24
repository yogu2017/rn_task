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
    title:'我的消息',
    headerRight:(
          <TouchableOpacity activeOpacity={0.8} style={{marginRight: 5}} onPress={navigation.state.params.navigatePress}>
            <Text style={{marginRight:5, width:50, color:'#1E90FF',textAlign:"center",fontSize: 12}} >
                全部已读
            </Text>
          </TouchableOpacity>)
  })
  constructor(props) {
  super(props);
  this.state = {

     };
  }
  _all_read(){
    Fn.showToast('OK')
  }
  componentDidMount(){
    this.props.navigation.setParams({ navigatePress:this._all_read.bind(this)});
  }
  render() {
    return (
      <View style={[styles.container,styles.msg_container]}>
        <View style={styles.msg_body}>
          <TouchableOpacity
          style={styles.msg_list}
          activeOpacity={0.8}
          >
            <Image style={styles.msg_img} source={require('./../../assets/sys_notice.png')}/>
            <View>
              <View style={styles.msg_list_style} >
                <Text style={styles.msg_source}>系统消息</Text>
                <Text style={styles.msg_time}>2019.5.11</Text>
              </View>
              <View style={styles.msg_list_style} >
                <Text style={styles.msg_dsc} numberOfLines={1}>最新一条的详细内容之类的东西阿斯达是的最新一条的详细内容之类的东西阿斯达是的</Text>
                <View style={styles.msg_num_bg}>
                  <Text style={styles.msg_num}>1</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.msg_body}>
          <TouchableOpacity
          style={styles.msg_list}
          activeOpacity={0.8}
          >
            <Image style={styles.msg_img} source={require('./../../assets/sys_notice.png')}/>
            <View>
              <View style={styles.msg_list_style} >
                <Text style={styles.msg_source}>张大千呀</Text>
                <Text style={styles.msg_time}>2019.5.11</Text>
              </View>
              <View style={styles.msg_list_style} >
                <Text style={styles.msg_dsc} numberOfLines={1}>快点来做任务吧啊</Text>
                <View style={styles.msg_num_bg}>
                  <Text style={styles.msg_num}>3</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
