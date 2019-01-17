import {
  CHANGE_INTERESTS
} from './constants'

const defaultState = {
  userInterests: []
}
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_INTERESTS: {
      return {
        ...state,
        userInterests: [...state.userInterests.filter(interest => interest !== action.interest), action.add ? action.interest : []]
      }
    }
    default:
      return state
  }
}

export default reducer