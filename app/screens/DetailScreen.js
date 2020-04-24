import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';
import styles from '../Style/Index';
import Fn from '../function/Fun';
export default class DetailScreen extends Component{
  static navigationOptions =({navigation})=>({
    title:'任务详情',
  })
  constructor(props) {
  super(props);
  this.state = {

     };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.detail_container}>
          <View>
            <Text>有手机+(WIFI)在家就能做的任务</Text>
          </View>
          <View style={styles.detail_time}>
            <Text style={styles.detail_time_c}>2019-05-23</Text>
            <Text style={styles.detail_time_c}>浏览：200次</Text>
          </View>
          <View>
            <Text style={styles.detail_money}>￥20.00/次</Text>
          </View>
        </View>
        <View style={styles.detail_line}></View>
        <View style={[styles.detail_container,styles.detail_desc]}>
          <Text style={[styles.detail_title,styles.detail_marginbottom]}>任务描述</Text>
          <View>
            <Text>任务类型：微信分享</Text>
            <Text>结算方式：微信或支付宝</Text>
            <Text>任务时间：2019/05/23-2919/05/30</Text>
          </View>
        </View>
        <View style={styles.detail_line}></View>
        <View style={styles.detail_container}>
          <Text style={styles.detail_title}>截止时间：2019-06-01</Text>
        </View>
        <View style={styles.detail_line}></View>
        <View style={styles.detail_container}>
          <Text style={styles.detail_title}>详细内容</Text>
          <Text style={styles.detail_content}>分享到朋友圈，截图，点赞，分享到微信群</Text>
        </View>
        <View style={styles.detail_foot}>
          <TouchableOpacity
          activeOpacity={0.8}
          style={styles.detail_foot_item}
          >
            <Text style={styles.set_login_out_text}>询问</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.detail_foot_item,styles.detail_foot_left]}
          >
            <Text style={styles.set_login_out_text}>申请任务</Text>
          </TouchableOpacity>
        </View>
        <Text>detail页面</Text>
        <Text>hello,{this.props.navigation.state.params.name}</Text>
        <Text onPress={()=>{this.props.navigation.state.params.callBack('我很好')}}>回调函数</Text>
      </View>
    );
  }
}
