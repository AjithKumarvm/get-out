import {CHANGE_INTERESTS} from './constants'

export const changeInterests = (interest, add) => ({
  type: CHANGE_INTERESTS,
  interest,
  add
})