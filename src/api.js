import { AsyncStorage } from "react-native"
import { loadUserData, changeVotes } from './actions'
import _ from 'lodash'
import {ACTIVITES} from './constants'

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
    setAsync('userId', responseJson.name)
    callBack(true)
  })
  .catch((error) => {
    console.error(error);
    callBack(false)
  });
}

const setAsync = (key, value, callBack = null) => {
  _storeData = async () => {
    try {
      await AsyncStorage.setItem(`@getOut:${key}`, value);
      callBack && callBack(true)
    } catch (error) {
      callBack && callBack(false)
      // Error saving data
    }
  }
  _storeData()
}

const getAsync = (key, callBack) => {
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(`@getOut:${key}`);
      if (value !== null) {
        // We have data!!
        callBack(value)
      } else {
        callBack(null)
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  _retrieveData()
}

const getUserInfo = (callBack) => {
  getAsync('userId', userId => {
    if (userId) {
      fetch(`https://getout-na123.firebaseio.com/users/${userId}.json`).then((response) => response.json())
      .then((responseJson) => {
        responseJson.userId = userId
        loadUserData(responseJson)
        callBack(responseJson)
      })
      .catch((error) => {
        console.error(error);
        callBack(false)
      });
    } else {
      // error
      callBack(false)
    }
  })
}

const submitVotes = (interests, callBack) => {
  getUserInfo((userData) => {
    if(userData) {
      const {houseId, userId} = userData
      fetch(`https://getout-na123.firebaseio.com/activities/${houseId}/${userId}.json`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({interests}),
      }).then((response) => response.json())
      .then((responseJson) => {
        callBack(responseJson)
      })
      .catch((error) => {
        console.error(error);
        callBack(false)
      });
    } else {
      callBack(false)
    }
  })
}

const getVotes = (callBack = () => {}, dispatch) => {
  getUserInfo((userData) => {
    if(userData) {
      const {houseId} = userData
      fetch(`https://getout-na123.firebaseio.com/activities/${houseId}.json`).then((response) => response.json())
      .then((responseJson) => {
        dispatch(changeVotes(responseJson))
        callBack(responseJson)
        console.log('getVotes', responseJson)
      })
      .catch((error) => {
        console.error(error);
        callBack(false)
      });
    } else {
      callBack(false)
    }
  })
}

const curatedResults = votes => {
  votes =  _.flatten(_.concat(_.map(votes, (vote) => vote.interests)))
  const count = (str, ch) => _.sumBy(str, x => x === ch)
  votes = _.map(votes, vote => {
    const interest = ACTIVITES.filter(activity => activity.id === vote)
    return {
      count: count(votes, vote),
      interest: interest && interest.length ? interest[0] : null
    }
  })
  votes = _.reverse(_.sortBy(votes, 'count'))
  return votes
}

export {
  registerUser,
  submitVotes,
  getUserInfo,
  getVotes,
  setAsync,
  getAsync,
  curatedResults
}