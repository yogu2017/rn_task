//RooterNavigator
import {createAppContainer,createStackNavigator,createSwitchNavigator} from 'react-navigation';
import MainNavigator from './MainNavigator';
import DetailScreen from './DetailScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ForgetPwdScreen from './ForgetPwdScreen';
import ModUserInfoScreen from './ModUserInfo';//我的资料
import AccountScreen from './member/Account';//我的账户
import UserTaskScreen from './member/UserTask';//我的任务
import UserMsgScreen from './member/UserMsg';//我的消息
import UserAuthScreen from './member/UserAuth';//实名认证
import UserSetScreen from './member/UserSet';//设置
import UserSafeScreen from './member/UserSafe';//安全设置
import UserSugScreen from './member/UserSug';//意见反馈
import AboutScreen from './member/About';//关于
const navigator = createStackNavigator({
    home:{
       screen:MainNavigator,
       navigationOptions: ({navigation}) => ({
        header: null, //设置页面有无标题,
        headerBackTitle:'返回'
    })
    },
    detail:{
        screen:DetailScreen,
    },
      login:{
          screen: LoginScreen,
          navigationOptions: ({navigation}) => ({
           header: null //设置页面有无标题
       })
      },
      register:{
          screen: RegisterScreen,
          navigationOptions: ({navigation}) => ({
           header: null //设置页面有无标题
       })
      },
      forgetPwd:{
          screen: ForgetPwdScreen,
          navigationOptions: ({navigation}) => ({
           header: null //设置页面有无标题
       })
      },
      ModUserInfo:{
          screen: ModUserInfoScreen,
          navigationOptions: ({navigation}) => ({
           headerBackTitle:'返回'
       })
      },
      Account:{
          screen: AccountScreen,
          navigationOptions: ({navigation}) => ({
           headerBackTitle:'返回'
       })
      },
      UserTask:{
          screen: UserTaskScreen,
          navigationOptions: ({navigation}) => ({
           headerBackTitle:'返回'
       })
      },
      UserMsg:{
          screen: UserMsgScreen,
          navigationOptions: ({navigation}) => ({
           headerBackTitle:'返回'
       })
      },
      UserAuth:{
          screen: UserAuthScreen,
          navigationOptions: ({navigation}) => ({
           headerBackTitle:'返回'
       })
      },
      UserSet:{
          screen: UserSetScreen,
          navigationOptions: ({navigation}) => ({
           headerBackTitle:'返回'
       })
      },
      UserSafe:{
          screen: UserSafeScreen,
          navigationOptions: ({navigation}) => ({
           headerBackTitle:'返回'
       })
      },
      UserSug:{
          screen: UserSugScreen,
          navigationOptions: ({navigation}) => ({
           headerBackTitle:'返回'
       })
      },
      About:{
          screen: AboutScreen,
          navigationOptions: ({navigation}) => ({
           headerBackTitle:'返回'
       })
      },
});

export default createAppContainer(navigator);
