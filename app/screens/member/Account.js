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
    title:'我的账户',
    headerRight:(
          <TouchableOpacity activeOpacity={0.8} style={{marginRight: 5}} onPress={navigation.state.params.navigatePress}>
            <Text style={{marginRight:5, width:50, color:'#1E90FF',textAlign:"center",fontSize: 14}} >
                明细
            </Text>
          </TouchableOpacity>)
  })
  constructor(props) {
  super(props);
  this.state = {

     };
  }
  _order_detail(){
    Fn.showToast('OK')
  }
  componentDidMount(){
    this.props.navigation.setParams({ navigatePress:this._order_detail.bind(this)});
  }
  render() {
    return (
      <View style={styles.set_container}>
        <View style={styles.account_head}>
          <Text style={styles.account_name}>账户余额（元）</Text>
          <Text style={styles.account_num}>1.00</Text>
        </View>
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
            <View style={styles.account_list}>
              <Image source={require('./../../assets/recharge.png')} style={styles.account_icon} />
              <Text style={styles.set_list_info}>充值</Text>
            </View>
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
            <View style={styles.account_list}>
              <Image source={require('./../../assets/cash_out.png')} style={styles.account_icon} />
              <Text style={styles.set_list_info}>提现</Text>
            </View>
            <Image source={require('./../../assets/arrow.png')} style={styles.set_list_arrow} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
