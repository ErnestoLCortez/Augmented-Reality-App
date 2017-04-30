import { AsyncStorage } from 'react-native';

export const getAPIToken = async function getAPIToken(idToken){
  return fetch('https://terrasite.herokuapp.com/authenticate', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'idToken': idToken
    })
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.token;
    })
    .catch((error) => {
      console.log(error);
      return null;
    })
};

export const savePost = async function savePost(postDetails){
    var backendToken = null;
    var firebaseToken = null;
  try {
    backendToken = AsyncStorage.getItem('JWT_TOKEN');
    firebaseToken = AsyncStorage.getItem('ID_TOKEN');
  } catch(err) {
    console.log(err);
  }
  //Using fetch library to post to backend db using heroku link
  return fetch('https://terrasite.herokuapp.com/api/arposts', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': backendToken,
      'idtoken': firebaseToken
    },
    body: JSON.stringify(postDetails)
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.token;
    })
    .catch((error) => {
      console.log(error);
      return null;
    })
};

export const fetchPoints = async function fetchPoints(){
  navigator.geolocation.getCurrentPosition(
    (position) => {
      var backendToken = null;
      var firebaseToken = null;
      try {
        backendToken = AsyncStorage.getItem('JWT_TOKEN');
        firebaseToken = AsyncStorage.getItem('ID_TOKEN');
      } catch(err) {
        console.log(err);
      }
      fetch('https://terrasite.herokuapp.com/api/arposts/' +
        position['coords']['latitude'] + '/' + position['coords']['longitude'] + '/0' ,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': backendToken,
          'idtoken': firebaseToken
        }})
        .then((response) => response.json())
        .then((responseJson) =>{
          return responseJson;
        })
        .catch((error) =>{
          console.error(error);
        });
    },
    (error) => {alert(JSON.stringify(error))},
    {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
  );
};
