import {CHANGE_INTERESTS, LOAD_USER_DATA, CHANGE_VOTES, SET_LOADERS} from './constants'

export const changeInterests = (id, add) => ({
  type: CHANGE_INTERESTS,
  id,
  add
})

export const loadUserData = (data) => ({
  type: LOAD_USER_DATA,
  data
})

export const changeVotes = (votes) => ({
  type: CHANGE_VOTES,
  votes
})

export const setLoader = (loader, value) => ({
  type: SET_LOADERS,
  loader,
  value
})