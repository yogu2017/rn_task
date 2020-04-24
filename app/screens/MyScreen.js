/**
 * 个人中心
 */
 /* @c'est-la-vie*/

 import React, { Component } from 'react';
 import {
   View,
   Text,
   StyleSheet,
   Image,
   SafeAreaView,
   Platform,
   TouchableOpacity
 } from 'react-native';
 import styles from '../Style/Index';
 import Fn from '../function/Fun';
 import DeviceInfo from 'react-native-device-info';
 import AsyncStorage from '@react-native-community/async-storage';
 export default class Index extends Component {
   constructor(props) {
   super(props);
   this.state = {
     data:[],
     oss_url:'../assets/my.png'
      };
   }
   _getMember_info(){
     AsyncStorage.getItem('token',(error,token)=>{
       var that = this;
       var params = {};
       var token = token;
       var url = Fn.requestUrl+'member/getinfo';
       Fn.postheader(url,params,token,function(data){
         //alert(JSON.stringify(data))
         console.log(data.data.info)
         if (data.code==1) {
           that.setState({
             data:data.data.info
           })
         }else{
           alert(data.msg)
         }
       })
     })
   }
   _get_online(){
     let that=this;
       AsyncStorage.getItem('token',(error,token)=>{
           if (token) {
             let url = Fn.requestUrl+'member/logindirect';
             let params = {
               HTTP_TOKEN:token,
               Http_Mac:DeviceInfo.getUniqueID(),
               Http_Phone:DeviceInfo.getDeviceId(),
               log_sys:(Platform.OS==='ios'?2:1)
             }
               Fn.postRequest(url,params,function(data){
                 if(data.code==1){
                   try {
                     AsyncStorage.setItem('token',data.data.Http_Token);
                   } catch (e) {
                     //console.log(e);
                   }
                   that._getMember_info();
                 }else{
                   Fn.showToast('长时间未登录，请重新登录');
                   that.props.navigation.navigate('login');
                 }
               })
           }else{
             try {
               AsyncStorage.setItem('token','');
             } catch (e) {
               console.log(e);
             }
             return
           }
       });
   }
   componentWillMount(){

   }
   componentDidMount(){
     AsyncStorage.getItem('oss_url',(error,oss_url)=>{
     this.setState({
       oss_url:oss_url
     })
   })
     this._get_online();
   }
   render() {
     return (
       <SafeAreaView style={styles.container}>
       <View style={styles.member_avator_view}>
       {
         (this.state.data=='')?
         (<Image style={styles.member_avator} source={require('../assets/my.png')}/>):
         (<Image style={styles.member_avator} source={{uri:this.state.oss_url+this.state.data.avatar}}/>)
       }
         <Text style={styles.member_list_info}>{(this.state.data.nickname=='') ? (this.state.data.mobile ):(this.state.data.nickname)}</Text>
       </View>
       <View style={styles.member_body}>
         <TouchableOpacity
           activeOpacity={0.8}
           onPress={()=>this.props.navigation.navigate('ModUserInfo',{
                   //info:this.state.data,
                   callback:()=>{
                      //this._getMember_info()
                  }
           })}
           style={styles.member_list}
           >
           <Image source={require('../assets/info.png')} style={styles.member_list_icon} />
           <Text style={styles.member_list_info}>我的资料</Text>
           <Image source={require('../assets/arrow.png')} style={styles.member_list_arrow} />
         </TouchableOpacity>
       </View>
       <View style={styles.member_body}>
         <TouchableOpacity
           activeOpacity={0.8}
           onPress={()=>this.props.navigation.navigate('Account',{
                   //info:this.state.data,
                   callback:()=>{
                      //this._getMember_info()
                  }
           })}
           style={styles.member_list}
           >
           <Image source={require('../assets/money.png')} style={styles.member_list_icon} />
           <Text style={styles.member_list_info}>我的账户</Text>
           <Image source={require('../assets/arrow.png')} style={styles.member_list_arrow} />
         </TouchableOpacity>
       </View>
       <View style={styles.member_body}>
         <TouchableOpacity
           activeOpacity={0.8}
           onPress={()=>this.props.navigation.navigate('UserTask',{
                   //info:this.state.data,
                   callback:()=>{
                      //this._getMember_info()
                  }
           })}
           style={styles.member_list}
           >
           <Image source={require('../assets/my_task.png')} style={styles.member_list_icon} />
           <Text style={styles.member_list_info}>我的任务</Text>
           <Image source={require('../assets/arrow.png')} style={styles.member_list_arrow} />
         </TouchableOpacity>
       </View>
       <View style={styles.member_body}>
         <TouchableOpacity
           activeOpacity={0.8}
           onPress={()=>this.props.navigation.navigate('UserMsg',{
                   //info:this.state.data,
                   callback:()=>{
                      //this._getMember_info()
                  }
           })}
           style={styles.member_list}
           >
           <Image source={require('../assets/my_msg.png')} style={styles.member_list_icon} />
           <Text style={styles.member_list_info}>我的消息</Text>
           <View style={styles.member_list_info_bg}>
             <Text style={styles.member_list_info_num}>5</Text>
           </View>
           <Image source={require('../assets/arrow.png')} style={styles.member_list_arrow} />
         </TouchableOpacity>
       </View>
       <View style={styles.member_body}>
         <TouchableOpacity
           activeOpacity={0.8}
           onPress={()=>this.props.navigation.navigate('UserAuth',{
                   //info:this.state.data,
                   callback:()=>{
                      //this._getMember_info()
                  }
           })}
           style={styles.member_list}
           >
           <Image source={require('../assets/idcard.png')} style={styles.member_list_icon} />
           <Text style={styles.member_list_info}>实名认证</Text>
           <Image source={require('../assets/arrow.png')} style={styles.member_list_arrow} />
         </TouchableOpacity>
       </View>
       <View style={styles.member_body}>
         <TouchableOpacity
           activeOpacity={0.8}
           onPress={()=>this.props.navigation.navigate('UserSet',{
                   //info:this.state.data,
                   callback:()=>{
                      //this._getMember_info()
                  }
           })}
           style={styles.member_list}
           >
           <Image source={require('../assets/set.png')} style={styles.member_list_icon} />
           <Text style={styles.member_list_info}>设置</Text>
           <Image source={require('../assets/arrow.png')} style={styles.member_list_arrow} />
         </TouchableOpacity>
       </View>
       </SafeAreaView>
     );
   }
 }
