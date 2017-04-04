module.exports = async function getAPIToken(idToken){
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