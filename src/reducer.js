import {
  CHANGE_INTERESTS,
  LOAD_USER_DATA,
  CHANGE_VOTES,
  SET_LOADERS
} from './constants'

const defaultState = {
  userInterests: [],
  votes: null,
  votingEnded: false,
  loaders: {}
}
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_INTERESTS: {
      return {
        ...state,
        userInterests: [...state.userInterests.filter(id => id !== action.id), action.add ? action.id : []]
      }
    }
    case LOAD_USER_DATA: {
      return {
        ...state,
        userData: action.data
      }
    }
    case CHANGE_VOTES: {
      return {
        ...state,
        votes: action.votes,
        votingEnded: Object.keys(action.votes).length >= 2
      }
    }
    case SET_LOADERS: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          [action.loader]: action.value
        }
      }
    }
    default:
      return state
  }
}

export default reducer