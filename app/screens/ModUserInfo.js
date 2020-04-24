/* @c'est-la-vie*/

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  Button
} from 'react-native';
import styles from '../Style/Index';
import Fn from '../function/Fun';
import global from '../function/global';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-picker'; //第三方相机
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
const options = [ '取消','男', '女'];
export default class Index extends Component {
  static navigationOptions =({navigation})=>({
    title:'我的资料',
    headerRight:(
          <TouchableOpacity activeOpacity={0.8} style={{marginRight: 5}} onPress={navigation.state.params.navigatePress}>
            <Text style={{marginRight:5, width:40, color:'#1E90FF',textAlign:"center",fontSize: 17}} >
                保存
            </Text>
          </TouchableOpacity>)
  })
  constructor(props) {
  super(props);
  this.state = {
      datetime:"2019-05-05",
      visible: false,
      visibleemail: false,
      visibleaddr: false,
      info:[]
     };
  }
  handlePress(index) {
    if (index==0) {
      return
    }
    this.setState({
      sexcode:index,
      sex:options[index],
      img_url:''
    })
  }
  _upload(){
    var img_url = this.state.img_url;
    var fileName = this.state.fileName;
    var uploadURL = Fn.requestUrl+'member/uploadavatar';
     let formData = new FormData();//如果需要上传多张图片,需要遍历数组,把图片的路径数组放入formData中
     let file = {uri: img_url, type: 'image/jpeg', name: fileName};   //这里的key(uri和type和name)不能改变,
     formData.append("file",img_url);   //这里的files就是后台需要的key
     let headers = new Headers();
     let params={file:img_url}
     headers.append('token', this.state.token);
     headers.append('mac', global.mac);
     headers.append('logsys', global.log_sys);
     headers.append('phone', global.phone);
     headers.append('Content-Type', 'application/json');
    fetch(uploadURL,{
         method:'POST',
         headers:headers,
         body:JSON.stringify(params),
     })
         .then((response) => response.json() )
         .then((data)=>{
           if(data.code==1){
             Fn.showToast('头像更新成功');
           }
             //var img_url = data.files.files.url;
             //var headimg = Fn.requestUrl+img_url;
             //this.setState({img_url:img_url});
             //Fn.showToast('头像上传成功');
             //that.props.navigation.state.params.callback();
             //console.log('responseData',data);
         })
         .catch((error)=>{console.error('error',error)
           alert(error)
           });
  }
  cameraAction = () =>{
    var that = this
    const options  = {
        //底部弹出框选项
        title:'请选择图片',
        cancelButtonTitle:'取消',
        takePhotoButtonTitle:'拍照',
        chooseFromLibraryButtonTitle:'选择相册',
        quality:0.75,
        allowsEditing:true,
        maxWidth:200,
        maxHeight:200,
        noData:false,
        storageOptions: {
            skipBackup: true,
            path:'images'
        }
    }
       ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          //console.log('User cancelled image picker');
        }
        else if (response.error) {
          //console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          //console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let img_url = response.uri;
          let fileName  = response.fileName;
          // You can also display the image using data:
          let source = 'data:image/jpeg;base64,' + response.data;
          that.setState({
            nickHeadPic: img_url,
            img_url:source,
            fileName:fileName
          });
          that._upload();
        }
       });
    }
  _save_info(){
    var that = this;
    var url = Fn.requestUrl+'member/changeinfo';
    if (!this.state.img_url) {
    var img_url = this.state.avator;
  }else{
    var img_url = this.state.img_url;
  }
    var nickname = this.state.nickname;
    var sex = this.state.sexcode;
    var datetime = this.state.datetime;
    var email = this.state.email;
    var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (!re.test(email)) {
      //alert("邮箱格式不正确");
      //return;
    };
    let params={
      nickname:nickname,
      province_id:'1',
      city_id:'1',
      county_id:'1',
      birthday:datetime,
      sex:sex,
    };
    let token=this.state.token;
    Fn.postheader(url,params,token,function(data){
      if(data==1){
        Fn.showToast('更新资料成功');
        that.props.navigation.state.params.callback()
        that.props.navigation.goBack();
      }

    })
  }
  _getMember_city(){
    AsyncStorage.getItem('token',(error,token)=>{
      var that = this;
      var params = {pid:13268};
      var token = token;
      var url = Fn.requestUrl+'ajax/city';
      Fn.postheader(url,params,token,function(data){
        //alert(JSON.stringify(data))
        console.log(data)

      })
    })
  }
  closeModal(){
    this.setState({
      visible:false,
      visibleemail:false,
      visibleaddr:false,
    })
  }
  succModal(){
    this.setState({
      visible:false,
      nickname:this.state.newnickname,
    })
  }
  succModal1(){
    this.setState({
      visibleemail:false,
      email:this.state.newemail
    })
  }
  componentDidMount(){
    this.props.navigation.setParams({ navigatePress:this._save_info.bind(this)});
    AsyncStorage.getItem('token',(error,token)=>{
      this.setState({
        token:token
      })
    });
    this._getMember_city();
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.member_info_body}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.cameraAction}
            style={styles.member_info_first}>
            <Text style={styles.member_info_listname}>头像:</Text>
            <Image style={styles.member_info_avator} source={{uri:'https://facebook.github.io/react/logo-og.png'}}/>
            <Image source={require('../assets/arrow.png')} style={styles.member_info_arrow} />
          </TouchableOpacity>
          <View style={styles.member_info_title}>
            <Text style={styles.member_info_listname}>账号:</Text>
            <Text style={styles.member_account}>{this.state.user_id}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>{this.setState({visible:true})}}
            style={styles.member_info_title}>
            <Text style={styles.member_info_listname}>昵称:</Text>
            <Text style={styles.member_info_nickname}>{this.state.nickname}</Text>
            <Image source={require('../assets/arrow.png')} style={styles.member_info_arrow} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=> this.ActionSheet.show()}
            style={styles.member_info_title}
          >
            <Text style={styles.member_info_listname}>性别:</Text>
            <Text style={styles.member_info_nickname}>{this.state.sex}</Text>
            <Image source={require('../assets/arrow.png')} style={styles.member_info_arrow} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=> {this.setState({visibleaddr:true})}}
            style={styles.member_info_title}
          >
            <Text style={styles.member_info_listname}>所在地区:</Text>
            <Text style={styles.member_info_nickname}>{this.state.sex}</Text>
            <Image source={require('../assets/arrow.png')} style={styles.member_info_arrow} />
          </TouchableOpacity>
          <View style={styles.member_info_title}>
            <Text style={styles.member_info_listname}>生日:</Text>
            <DatePicker
              style={styles.member_date}
              date={this.state.datetime}
              mode="date"
              locale="zh"
              format="YYYY-MM-DD"
              minDate="1950-01-01"
              maxDate="2099-01-01"
              confirmBtnText="确定"
              cancelBtnText="取消"
              showIcon={false}
              onDateChange={(datetime) => {this.setState({datetime: datetime});}}
             />
             <Image source={require('../assets/arrow.png')} style={styles.member_info_arrow} />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>{this.setState({visibleemail:true})}}
            style={styles.member_info_title}>
            <Text style={styles.member_info_listname}>邮箱:</Text>
            <Text style={styles.member_info_nickname}>{this.state.email}</Text>
            <Image source={require('../assets/arrow.png')} style={styles.member_info_arrow} />
          </TouchableOpacity>
        </View>
        {this.state.changetime!=null?(
          <View style={styles.lasttimeview}>
            <Text style={styles.lasttime}>上次更新时间：{Fn.change(this.state.changetime)}</Text>
          </View>
        ):null}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.visible}
        >
          <View style={styles.member_modal_body}>
            <View style={styles.member_modal}>
              <Text style={styles.modal_type}>昵称：</Text>
              <TextInput
                style={styles.modal_nickname}
                defaultValue={this.state.nickname}
                onChangeText={(newnickname)=>this.setState({
                newnickname:newnickname
              })}
              />
              <View style={styles.modal_btn}>
                <Button title='取消' onPress={this.closeModal.bind(this)}/>
                <Button title='确定' onPress={this.succModal.bind(this)}/>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.visibleemail}
        >
          <View style={styles.member_modal_body}>
            <View style={styles.member_modal}>
              <Text style={styles.modal_type}>邮箱：</Text>
              <TextInput
                style={styles.modal_nickname}
                defaultValue={this.state.email}
                onChangeText={(newemail)=>this.setState({
                newemail:newemail
              })}
              />
              <View style={styles.modal_btn}>
                <Button title='取消' onPress={this.closeModal.bind(this)}/>
                <Button title='确定' onPress={this.succModal1.bind(this)}/>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.visibleaddr}
        >
          <View style={styles.member_modal_body}>
            <View style={styles.member_modal}>
              <Text style={styles.modal_type}>地区选择</Text>
              <TextInput
                style={styles.modal_nickname}
                defaultValue={this.state.email}
                onChangeText={(newemail)=>this.setState({
                newemail:newemail
              })}
              />
              <View style={styles.modal_btn}>
                <Button title='取消' onPress={this.closeModal.bind(this)}/>
                <Button title='确定' onPress={this.succModal1.bind(this)}/>
              </View>
            </View>
          </View>
        </Modal>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={options}
          cancelButtonIndex={0}
          onPress={this.handlePress.bind(this)}
        />
      </View>
    );
  }
}
