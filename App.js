/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState} from 'react';
import {
  StyleSheet,
  StatusBar
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { LoginButton, AccessToken } from 'react-native-fbsdk';


const App: () => React$Node = () => {
  const [user,setUser] = useState({})
  // let user = {}

  const initUser =  (token)=> {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      // Some user object has been set up somewhere, build that user here
      let user = {}
      user.name = json.name
      user.id = json.id
      user.user_friends = json.friends
      user.email = json.email
      user.username = json.name
      user.loading = false
      user.loggedIn = true
      user.avatar = setAvatar(json.id)  
      
      setUser(user)
    })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
  }
  console.log("User = ",user)

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: err = ",error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log("succes login")
                    console.log(data.accessToken.toString())
                    console.log("Data = ",data)
                    initUser(accessToken)

                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
