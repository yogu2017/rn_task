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
    title:'设置',
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
            onPress={()=>this.props.navigation.navigate('UserSafe',{
                    //info:this.state.data,
                    callback:()=>{
                       //this._getMember_info()
                   }
            })}
            style={styles.set_list}
            >
            <Text style={styles.set_list_info}>安全设置</Text>
            <Image source={require('./../../assets/arrow.png')} style={styles.set_list_arrow} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>this.props.navigation.navigate('Account',{
                    //info:this.state.data,
                    callback:()=>{
                       //this._getMember_info()
                   }
            })}
            style={styles.set_list}
            >
            <Text style={styles.set_list_info}>通用</Text>
            <Image source={require('./../../assets/arrow.png')} style={styles.set_list_arrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.set_body}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>this.props.navigation.navigate('Account',{
                    //info:this.state.data,
                    callback:()=>{
                       //this._getMember_info()
                   }
            })}
            style={styles.set_list}
            >
            <Text style={styles.set_list_info}>隐私</Text>
            <Image source={require('./../../assets/arrow.png')} style={styles.set_list_arrow} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>this.props.navigation.navigate('UserSug',{
                    //info:this.state.data,
                    callback:()=>{
                       //this._getMember_info()
                   }
            })}
            style={styles.set_list}
            >
            <Text style={styles.set_list_info}>意见反馈</Text>
            <Image source={require('./../../assets/arrow.png')} style={styles.set_list_arrow} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>this.props.navigation.navigate('About',{
                    //info:this.state.data,
                    callback:()=>{
                       //this._getMember_info()
                   }
            })}
            style={styles.set_list}
            >
            <Text style={styles.set_list_info}>关于</Text>
            <Image source={require('./../../assets/arrow.png')} style={styles.set_list_arrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.set_login_out}>
          <TouchableOpacity
          activeOpacity={0.8}
          style={styles.set_login_out}
          >
            <Text style={styles.set_login_out_text}>退出账号</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
