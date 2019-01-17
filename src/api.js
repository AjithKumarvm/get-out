import { AsyncStorage } from "react-native"

const registerUser = ({name, phone, houseId}, callBack) => {
  fetch('https://getout-na123.firebaseio.com/users.json', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({name, phone, houseId}),
  }).then((response) => response.json())
  .then((responseJson) => {
    console.warn(JSON.stringify(responseJson))
    callBack(true)
    saveUserData(responseJson.name)
  })
  .catch((error) => {
    console.error(error);
    callBack(false)
  });
}

const saveUserData = (userId) => {
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('@getOut:userId', userId);
    } catch (error) {
      // Error saving data
    }
  }
  _storeData()
}

const checkForUserId = (callBack) => {
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@getOut:userId');
      if (value !== null) {
        // We have data!!
        callBack(value)
      } else {
        callBack(false)
      }
     } catch (error) {
       // Error retrieving data
       callBack(false)
     }
  }
  _retrieveData()
}

export {
  registerUser,
  checkForUserId
}