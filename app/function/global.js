import {Dimensions,Platform,StatusBar} from  'react-native';
import DeviceInfo from 'react-native-device-info';
const mac = DeviceInfo.getUniqueID();
const phone = DeviceInfo.getDeviceId();
const log_sys = (Platform.OS==='ios'?2:1);
let global={
  mac:mac,
  phone:phone,
  log_sys:log_sys,
};
export default global;
