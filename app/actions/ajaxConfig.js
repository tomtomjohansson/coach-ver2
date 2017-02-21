import storage from 'react-native-simple-store';
import {Platform} from 'react-native';

let rootUrl;
if (Platform.OS === 'ios') {  
  rootUrl = __DEV__ ? 'http://localhost:3000' : 'http://something.com';
} else {
  rootUrl = __DEV__ ? 'http://10.0.3.2:3000' : 'http://something.com';
}


const getHeaders = async () => {
  const userToken = await storage.get('user_token');
  if (userToken) {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    };
  } else {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }
};

const saveToken = async token => {
  storage.save('user_token', token);
};

export {
  rootUrl,
  getHeaders,
  saveToken
};
