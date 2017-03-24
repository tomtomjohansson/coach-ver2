import storage from 'react-native-simple-store';
import {Platform} from 'react-native';

let rootUrl;
if (Platform.OS === 'ios') {
  rootUrl = __DEV__ ? 'http://localhost:3000' : 'http://139.162.151.160:3000';
} else {
  rootUrl = __DEV__ ? 'http://37.139.10.122:3000' : 'http://37.139.10.122:3000';
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
