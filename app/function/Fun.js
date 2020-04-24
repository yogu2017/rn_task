/* @c'est-la-vie*/
'use strict';
import Toast from 'react-native-root-toast';
import global from './global';
let Fn = {
 requestUrl: 'https://api.favoritefilms.cn/',
  _goback(){
    //this.props.navigation.goBack();
  },
  // _member(){
  //     this.props.navigation.navigate('Member',{
  //       user_id:this.state.user_id,
  //       callback:()=>{
  //         this.setState({
  //           isLogin:false,
  //           right:false
  //         })
  //       }
  //     })
  // },
  // _msgList(){
  //     this.props.navigation.navigate('List')
  // },
  showToast(content){
    let toast = Toast.show(content, {
    duration: 800,
    position: 400,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
      });
  },
  creatCode(length){
    if(length == undefined){
			length = 4;
		}
		var pow = Math.pow(10,length);
		var code = Math.floor(Math.random() * pow + pow / 10).toString();
		return code.substr(0, length);
  },
countdown(num){
    if (code.length==6) {
      var num;
      var timer = setInterval(function(){
        num--;
        if (num==0) {
          clearInterval(timer);
          that.setState({codeText:'发送验证码'})
        }else{
          that.setState({codeText:num+'秒后可重试'})
        }
      },1000)
    }
  },
  //带headerpost请求

  postheader(url,params,token,callback){
      let headers = new Headers();
      headers.append('token', token);
      headers.append('mac', global.mac);
      headers.append('logsys', global.log_sys);
      headers.append('phone', global.phone);
      headers.append('Content-Type', 'application/json');
     fetch(url, {
         method: 'POST',
         headers:headers,
         body:JSON.stringify(params),
       })
       .then((response) => response.json() )
       .then((json)=>{
         callback(json)
       })
       .catch((error)=>{console.error('error',error)
         alert(error)
     });
 },
  //网络请求GET
  getRequest(url,params,callback){
    if (params) {
              let paramsArray = [];
              //拼接参数
              Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
              if (url.search(/\?/) === -1) {
                  url += '?' + paramsArray.join('&')
              } else {
                  url += '&' + paramsArray.join('&')
              }
          }
    fetch(url,{
        method:'GET',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
    .then((response)=>response.json())
    .then((json)=>{
        callback(json);
      })
      .catch((error)=>{
        console.error('error',error)
          alert(error);
      });
  },
  //网络请求POST
   postRequest(url,params,callback){
      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type':'application/json;charset=UTF-8',
          },
          body:JSON.stringify(params),
        })
        .then((response) => response.json() )
        .then((json)=>{
          callback(json)
        })
        .catch((error)=>{console.error('error',error)
          alert(error)
      });
  },
  //时间转换函数
  change(timestamp) {
　　let currentUnixTime = Math.round((new Date()).getTime() / 1000);       // 当前时间的秒数
　　let deltaSecond = currentUnixTime - parseInt(timestamp, 10);            // 当前时间与要转换的时间差（ s ）
　　let result;
　　if (deltaSecond < 60) {
　　　　result = deltaSecond + '刚刚';
　　} else if (deltaSecond < 3600) {
　　　　result = Math.floor(deltaSecond / 60) + '分钟前';
　　} else if (deltaSecond < 86400) {
　　　　result = Math.floor(deltaSecond / 3600) + '小时前';
　　} else if(deltaSecond <2592000) {
　　　　result = Math.floor(deltaSecond / 86400) + '天前';
　　}else{
    result=new Date(parseInt(timestamp) * 1000).toLocaleString().substr(0,19)  //大于一个月显示日期格式
   }
　　return result;
},
//计算距离
 toRad(d) {  return d * Math.PI / 180; },
 getDisance(lat1, lng1, lat2, lng2) {
    var dis = 0;
    var radLat1 = toRad(lat1);
    var radLat2 = toRad(lat2);
    var deltaLat = radLat1 - radLat2;
    var deltaLng = toRad(lng1) - toRad(lng2);
    var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    return dis * 6378137;
},
// 手机号隐藏中间四位数
hidephone(num){
  var newNum = num.substr(0, 3) + '****' + num.substr(7);
  return newNum;
},
}
export default Fn;
