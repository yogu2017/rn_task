/* @c'est-la-vie*/

import React, { Component } from 'react';
import {
  View,
  TextInput,
  Picker,
  ScrollView,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import styles from './../../Style/Index';
import Fn from './../../function/Fun';
import ActionSheet from 'react-native-actionsheet';
import AsyncStorage from '@react-native-community/async-storage';
const options = [ '取消','意见', '投诉','其他'];
export default class Index extends Component {
  static navigationOptions =({navigation})=>({
    title:'意见反馈',
  })
  constructor(props) {
  super(props);
  this.state = {
    sugcode:1,
    sugname:'意见',
    title:'',
    contents:''
     };
  }
  handlePress(index) {
    if (index==0) {
      return
    }
    this.setState({
      sugcode:index,
      sugname:options[index],
    })
  }
  _upsug(){
    let that=this;
    let url=Fn.requestUrl+'notice/addopinion';
    let title=that.state.title;
    let contents=that.state.contents;
    let sugcode=that.state.sugcode;
    if(title==''){
      Fn.showToast('标题不能为空');
      return;
    }
    if(contents==''){
      Fn.showToast('内容不能为空');
      return;
    }
    let params={
      title:title,
      content:contents,
      type:sugcode,
    };
    let token=this.state.token;
    Fn.postheader(url,params,token,function(data){
      if(data.code==1){
        Fn.showToast('您的反馈已收到！');
        that.props.navigation.goBack();
      }else{
        Fn.showToast(data.msg);
      }

    })
  }
  componentDidMount(){
    AsyncStorage.getItem('token',(error,token)=>{
      this.setState({
        token:token
      })
    });
  }
  render() {
    const token = this.state.token;
    return (
      <ScrollView style={styles.container}
      scrollEnabled={false}>
        <View style={{marginTop: 15,marginLeft: 15,marginRight: 15}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=> this.ActionSheet.show()}
            style={styles.member_info_title}
          >
            <Text style={styles.member_info_listname}>请选择您要反馈的类型:</Text>
            <Text style={styles.member_info_nickname}>{this.state.sugname}</Text>
            <Image source={require('./../../assets/arrow.png')} style={styles.member_info_arrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.sug_title}>
          <TextInput placeholder={'请输入标题,25字以内'} maxLength={25} style={styles.sug_text_input} onChangeText={(title)=>this.setState({
            title:title
          })}/>
        </View>
        <View style={styles.sug_con}>
          <TextInput
           placeholder={'请输入内容,200字以内'}
           multiline = {true}
           maxLength={200}
           numberOfLines={8}
           onChangeText={(contents)=>this.setState({contents:contents})}
           />
        </View>
        <TouchableOpacity
        style={styles.sug_btn}
        activeOpacity={0.8}
        onPress={this._upsug.bind(this)}
        >
          <Text style={{color: '#fff',fontSize: 16}}>提交</Text>
        </TouchableOpacity>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={options}
          cancelButtonIndex={0}
          onPress={this.handlePress.bind(this)}
        />
      </ScrollView>
    );
  }
}
