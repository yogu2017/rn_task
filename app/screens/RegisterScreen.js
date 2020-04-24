/* @c'est-la-vie*/

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import styles from '../Style/Index';
import Fn from '../function/Fun';
import DeviceInfo from 'react-native-device-info';
export default class Index extends Component {
  constructor(props) {
  super(props);
  this.state = {
    phonenum:'',
    codeText:'获取验证码',
    inputCode:'',
    password:'',
    code:'',
    num:60
     };
  }
 //验证码事件
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
   let url = Fn.requestUrl+'sms/register';
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
 _onPressRegin(){

   var that =this;
   var phonenum = this.state.phonenum;
   var inputCode = this.state.inputCode;
   var password = this.state.password;
   var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
   if(!phonenum || !inputCode){
     Fn.showToast('手机号、验证码不能为空');
     //this.refs.toast.show('手机号和验证码不能为空',800);
     return;
   }
   if (!myreg.test(phonenum)) {
     Fn.showToast('手机号码格式不正确');
     //this.refs.toast.show('手机号码格式不正确',800);
     return false;
   }
   if (password.length<6) {
     Fn.showToast('密码不能少于6位数');
     //this.refs.toast.show('请输入6位数以上密码',800);
     return;
   }
   let url = Fn.requestUrl+'member/register';
   let params = {
     mobile:phonenum,
     code:inputCode,
     Http_Password:password,
     Http_Mac:DeviceInfo.getUniqueID(),
     Http_Phone:DeviceInfo.getDeviceId(),
     log_sys:(Platform.OS==='ios'?2:1)
   }
   Fn.postRequest(url,params,function(data){
     if(data.code==1){
       Fn.showToast(data.msg);
       that.props.navigation.goBack();
     }else{
       Fn.showToast(data.msg);
     }
   })
   //Fn.showToast(url);
 }
 componentWillUnmount(){
   //clearInterval(timer);
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
            <View style={styles.login_inputView}>
              <Image
                source={require('../assets/password.png')}
                style={styles.inputImg}
              />
              <TextInput
              placeholder='请输入8-16位字母与数字组合'
              secureTextEntry={true}
              placeholderTextColor='#fff'
              maxLength={12}
              underlineColorAndroid="transparent"
              style={styles.login_input}
              onChangeText={(password)=>this.setState({
                password:password
              })}
               />
            </View>
            <TouchableOpacity
              style={styles.login_btn}
              activeOpacity={0.8}
              onPress={this._onPressRegin.bind(this)}
              >
              <Text style={{fontSize: 18,color: '#fff',fontWeight: 'bold'}}>注册</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
          activeOpacity={0.8}
          onPress={()=>this.props.navigation.goBack()}
           style={styles.login_reg}>
            <Text style={styles.login_reg_txt}>已经有账户？去登录。</Text>
          </TouchableOpacity>
        </ScrollView>
    );
  }
}
