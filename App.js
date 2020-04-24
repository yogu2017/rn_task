import React, {Component} from 'react';
import {StyleSheet, Text, View,Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import Navigation from './app/screens/MainNavigator';
import Navigation from './app/screens/RooterNavigater';
import DeviceInfo from 'react-native-device-info';
import Fn from './app/function/Fun';
import global from './app/function/global';
//import Navigation from './app/screens/DrawNavigator';
type Props = {};

export default class App extends Component<Props> {

  componentDidMount(){
    // AsyncStorage.getItem('token',(error,token)=>{
    //     if (token) {
    //       let url = Fn.requestUrl+'member/logindirect';
    //       let params = {
    //         HTTP_TOKEN:token,
    //         Http_Mac:DeviceInfo.getUniqueID(),
    //         Http_Phone:DeviceInfo.getDeviceId(),
    //         log_sys:(Platform.OS==='ios'?2:1)
    //       }
    //         Fn.postRequest(url,params,function(data){
    //           if(data.code==1){
    //             try {
    //               AsyncStorage.setItem('token',data.data.Http_Token);
    //             } catch (e) {
    //               //console.log(e);
    //             }
    //           }else{
    //             Fn.showToast('长时间未登录，请重新登录');
    //             this.props.navigation.navigate('login');
    //           }
    //         })
    //     }else{
    //       try {
    //         AsyncStorage.setItem('token','');
    //       } catch (e) {
    //         console.log(e);
    //       }
    //       return
    //     }
    // });

  }

  render() {
    return (
      <View style={styles.container}>
      <Navigation></Navigation>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
