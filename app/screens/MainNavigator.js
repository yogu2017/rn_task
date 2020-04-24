//MainNavigator
import React, {Component} from 'react';
import {Text, View,Image} from 'react-native';
import {createBottomTabNavigator,createAppContainer,createStackNavigator} from 'react-navigation';
import Index from './MainScreen';
import Add from './AddScreen';
import My from './MyScreen';
const MainStack = createBottomTabNavigator({
    任务大厅:{
        screen:Index,
        navigationOptions:{

            tabBarIcon:({focused})=>{
                if(focused){
                  return(
                    <Image source={require('../assets/home_sel.png')} style={{
                      width:30,height:30
                    }}></Image>
                  )
                }else{
                  return(
                    <Image source={require('../assets/home.png')} style={{
                      width:30,height:30
                    }}></Image>
                  )
                }
              }
        }
    },
    发布任务:{
        screen:Add,
        navigationOptions:{

            tabBarIcon:({focused})=>{
                if(focused){
                  return(
                    <Image source={require('../assets/add_sel.png')} style={{
                      width:30,height:30
                    }}></Image>
                  )
                }else{
                  return(
                    <Image source={require('../assets/add.png')} style={{
                      width:30,height:30
                    }}></Image>
                  )
                }
              }
        }
    },
    个人中心:{
        screen:My,
        navigationOptions:{

            tabBarIcon:({focused})=>{
                if(focused){
                  return(
                    <Image source={require('../assets/my_sel.png')} style={{
                      width:30,height:30
                    }}></Image>
                  )
                }else{
                  return(
                    <Image source={require('../assets/my.png')} style={{
                      width:30,height:30
                    }}></Image>
                  )
                }
              }
        }
    },
},
{
    tabBarOptions: {
        //当前选中的tab bar的文本颜色和图标颜色
        activeTintColor: '#e75a48',
        //当前未选中的tab bar的文本颜色和图标颜色
        inactiveTintColor: '#000',
        //是否显示tab bar的图标，默认是false
        showIcon: true,
        //showLabel - 是否显示tab bar的文本，默认是true
        showLabel: true,
        //是否将文本转换为大小，默认是true
        upperCaseLabel: false,
        //material design中的波纹颜色(仅支持Android >= 5.0)
        pressColor: '#788493',
        //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
        pressOpacity: 0.8,
        //tab bar的样式
        style: {
            backgroundColor: '#fff',
            paddingBottom: 1,
            borderTopWidth: 0.2,
            paddingTop:1,
            borderTopColor: '#eee',
        },
        //tab bar的文本样式
        labelStyle: {
            fontSize: 11,
            margin: 1
        },
        //tab 页指示符的样式 (tab页下面的一条线).
        indicatorStyle: {height: 0},
    },
     //tab bar的位置, 可选值： 'top' or 'bottom'
     tabBarPosition: 'bottom',
     //是否允许滑动切换tab页
     swipeEnabled: true,
     //是否在切换tab页时使用动画
     animationEnabled: false,
     //是否懒加载
     lazy: true,
     //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
     backBehavior: 'none',

}
);

export default createAppContainer(MainStack);
