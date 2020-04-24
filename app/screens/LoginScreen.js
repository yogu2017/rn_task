/* @c'est-la-vie*/

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Animated,
} from 'react-native';
import Fn from '../function/Fun';
import styles from '../Style/Index';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
export default class Index extends Component {
  constructor(props) {
  super(props);
  this.state = {
    phonenum:'',
    password:'',
    codeText:'获取验证码',
    fadeAnim: new Animated.Value(1),
    margin:new Animated.Value(0),
    fadeAnim1: new Animated.Value(0),
    margin1:new Animated.Value(800),
    logintext:0,
    display:'none',
    display1:'flex',
    num:60
     };
  }
 componentWillMount(){
   AsyncStorage.getItem('token',(error,token)=>{
       if (token) {
         //alert(token)
       }else{
         return
       }
   });
 }
  componentDidMount(){

  }
  _sendCode(){
    var that =this;
    var codeText = this.state.codeText;
    if (codeText != '获取验证码') {
      return;
    }
    var phone = this.state.phonenum;
    if (phone==''||phone.length<11) {
     Fn.showToast('手机号输入有误，请检查后重试');
      return;
    }
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(phone)) {
      Fn.showToast('手机号码格式不正确');
      return false;
    }
    //**获取验证码*//
    let url = Fn.requestUrl+'sms/login';
    let params={"mobile":phone};
    Fn.postRequest(url,params,function(data){
      if(data.code==1){
     Fn.showToast(data.msg);
      let num = that.state.num;
        timer = setInterval(function(){
          that.setState({
            num:num-1
          })
          num--;
          if (num<1) {
            clearInterval(timer);
            that.setState({codeText:'获取验证码',num:60})
          }else{
            that.setState({codeText:num+'秒后可重试'})
          }
        },1000)
      }else{
       alert(data.msg);
      }
    })
  }
  _onPressLogin(){
    var that = this;
    var phonenum = this.state.phonenum;
    var password = this.state.password;
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(phonenum)) {
      Fn.showToast('手机号码不正确')
      return false;
    }
    if (password=='') {
      Fn.showToast('密码不能为空')
      return false;
    }
    var url = Fn.requestUrl+'member/login';
    var params={
      mobile:phonenum,
      Http_Password:password,
      Http_Mac:DeviceInfo.getUniqueID(),
      Http_Phone:DeviceInfo.getDeviceId(),
      log_sys:(Platform.OS==='ios'?2:1)
    }
    Fn.postRequest(url,params,function(data){
      if(data.code==1){
        Fn.showToast(data.msg);
        that.props.navigation.goBack();
        try {
          AsyncStorage.setItem('token',data.data.Http_Token);
          AsyncStorage.setItem('oss_url',data.data.oss_url);
        } catch (e) {
          console.log(e);
        }
        // that.props.navigation.goBack();
        // that.props.navigation.state.params.callback();
      }else{
        Fn.showToast(data.msg)
      }
    })
  }
  _onPressSmsLogin(){
    var that = this;
    var phonenum = this.state.phonenum;
    var code = this.state.inputCode;
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(phonenum)) {
      Fn.showToast('手机号码不正确')
      return false;
    }
    var url = Fn.requestUrl+'member/mobilelogin';
    var params={
      mobile:phonenum,
      code:code,
      Http_Mac:DeviceInfo.getUniqueID(),
      Http_Phone:DeviceInfo.getDeviceId(),
      log_sys:(Platform.OS==='ios'?2:1)
    }
    Fn.postRequest(url,params,function(data){
      if(data.code==1){
        Fn.showToast(data.msg);
        that.props.navigation.goBack();
        try {
          AsyncStorage.setItem('token',data.data.Http_Token);
        } catch (e) {
          console.log(e);
        }
        // that.props.navigation.goBack();
        // that.props.navigation.state.params.callback();
      }else{
        Fn.showToast(data.msg)
      }
    })
  }
  _onChange(){
    this.setState({
      logintext:1,
      display:'flex',
      display1:'none',
    })
    Animated.parallel([
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 0,
                    duration: 500
                }
            ),
            Animated.timing(
                this.state.margin,
                {
                    toValue: 700,
                    duration: 800
                }
            )
        ]).start();
        Animated.parallel([
                Animated.timing(
                    this.state.fadeAnim1,
                    {
                        toValue: 1,
                        duration: 500
                    }
                ),
                Animated.timing(
                    this.state.margin1,
                    {
                        toValue: 0,
                        duration: 800
                    }
                )
            ]).start();
  }
  _onChange1(){
    this.setState({
      logintext:0,
      display:'none',
      display1:'flex',
    })
    Animated.parallel([
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 1,
                    duration: 600
                }
            ),
            Animated.timing(
                this.state.margin,
                {
                    toValue: 0,
                    duration: 600
                }
            )
        ]).start();
        Animated.parallel([
                Animated.timing(
                    this.state.fadeAnim1,
                    {
                        toValue: 0,
                        duration: 600
                    }
                ),
                Animated.timing(
                    this.state.margin1,
                    {
                        toValue: 700,
                        duration: 600
                    }
                )
            ]).start();
  }
  render() {
    return (
      <ScrollView style={styles.container} scrollEnabled={false}>

        <StatusBar barStyle={'light-content'} />
        <Image  source={require('../assets/bg.png')} style={styles.bg} />
        <View style={[styles.login_center,styles.center]}>
          <View style={styles.login_title}>
            <Text style={styles.login_txt}>TASK</Text>
          </View>
          <Animated.View style={[styles.downViewStyle, {marginLeft: this.state.margin,opacity: this.state.fadeAnim,display: this.state.display1}]}>
            <View style={styles.login_inputView}>
              <Image
                source={require('../assets/account.png')}
                style={styles.inputImg}
              />
              <TextInput
              placeholder='请输入账号/手机号'
              placeholderTextColor='#fff'
              maxLength={11}
              keyboardType='numeric'
              underlineColorAndroid="transparent"
              style={styles.login_input}
              onChangeText={(phonenum)=>this.setState({
                phonenum:phonenum
              })}
               />
            </View>
            <View style={styles.login_inputView}>
              <Image
                source={require('../assets/password.png')}
                style={styles.inputImg}
              />
              <TextInput
              placeholder='请输入密码'
              placeholderTextColor='#fff'
              secureTextEntry={true}
              maxLength={12}
              underlineColorAndroid="transparent"
              style={styles.login_input}
              onChangeText={(password)=>this.setState({
                password:password
              })}
               />
               <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>this.props.navigation.navigate('forgetPwd')}
                style={styles.login_forget}>
                <Text style={{color:'#fff'}}>忘记密码？</Text>
               </TouchableOpacity>
            </View>
          </Animated.View>
          <Animated.View style={[styles.downViewStyle, {marginLeft: this.state.margin1,opacity: this.state.fadeAnim1,display: this.state.display}]}>
            <View style={styles.login_inputView}>
              <Image
                source={require('../assets/account.png')}
                style={styles.inputImg}
              />
              <TextInput
              placeholder='请输入手机号'
              maxLength={11}
              keyboardType='numeric'
              placeholderTextColor='#fff'
              underlineColorAndroid="transparent"
              style={styles.login_input}
              onChangeText={(phonenum)=>this.setState({
                phonenum:phonenum
              })}
               />
            </View>
            <View style={styles.login_inputView}>
              <Image
                source={require('../assets/code.png')}
                style={styles.inputImg}
              />
              <TextInput
              placeholder='请输入验证码'
              keyboardType='numeric'
              placeholderTextColor='#fff'
              maxLength={4}
              underlineColorAndroid="transparent"
              style={styles.login_input}
              onChangeText={(inputCode)=>this.setState({
                inputCode:inputCode
              })}
               />
               <TouchableOpacity
                activeOpacity={0.8}
                onPress={this._sendCode.bind(this)}
                style={styles.login_forget}>
                <Text style={{color:'#fff'}}>{this.state.codeText}</Text>
               </TouchableOpacity>
            </View>
          </Animated.View>
          <TouchableOpacity
            onPress={(this.state.logintext==0)?(this._onPressLogin.bind(this)):(this._onPressSmsLogin.bind(this))}
            style={styles.login_btn}
            activeOpacity={0.8}
            >
            <Text style={{fontSize: 18,color: '#fff',fontWeight: 'bold'}}>登录</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(this.state.logintext==0)?(this._onChange.bind(this)):(this._onChange1.bind(this))}
            style={styles.sms_login}
            activeOpacity={0.8}
            >
            <Text style={{fontSize: 14,color: '#fff',fontWeight: 'bold'}}>{(this.state.logintext==0)?'用短信验证码登录':'账号密码登录'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
        activeOpacity={0.8}
        onPress={()=>this.props.navigation.navigate('register')}
         style={styles.login_reg}>
          <Text style={styles.login_reg_txt}>还没有账户？去注册。</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
