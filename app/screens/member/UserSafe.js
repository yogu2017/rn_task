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
    title:'安全设置',
  })
  constructor(props) {
  super(props);
  this.state = {

     };
  }
  render() {
    return (
      <View style={styles.set_container}>
        <View style={styles.set_body}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>this.props.navigation.navigate('UserCPwd',{
                    //info:this.state.data,
                    callback:()=>{
                       //this._getMember_info()
                   }
            })}
            style={styles.set_list}
            >
            <Text style={styles.set_list_info}>修改密码</Text>
            <Image source={require('./../../assets/arrow.png')} style={styles.set_list_arrow} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>this.props.navigation.navigate('UserSmodal',{
                    //info:this.state.data,
                    callback:()=>{
                       //this._getMember_info()
                   }
            })}
            style={styles.set_list}
            >
            <Text style={styles.set_list_info}>最近登录</Text>
            <Image source={require('./../../assets/arrow.png')} style={styles.set_list_arrow} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
