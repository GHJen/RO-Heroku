import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ENTRIES = 'GET_ENTRIES'
const NEW_ENTRY = 'NEW_ENTRY'

/**
 * INITIAL STATE
 */
const defaultEntries = []

/**
 * ACTION CREATORS
 */
const getEntries = entries => ({type: GET_ENTRIES, entries})

/**
 * THUNK CREATORS
 */
export const gotEntries = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/entries/${userId}`)
    dispatch(getEntries(data || defaultEntries))
  } catch (err) {
    console.error(err)
  }
}
export const addEntry = (userId, prompt, text) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/entries/${userId}`, {prompt, text})
    dispatch(getEntries(data))
  } catch (err) {
    console.error(err)
  }
}

export const removeEntry = entryId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/entries/${entryId}`)
    dispatch(getEntries(data))
  } catch (err) {
    console.error(err)
  }
}

export const addTag = (entryId, tag) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/entries/${entryId}`, {
      action: 'add',
      tag
    })
    dispatch(getEntries(data))
  } catch (err) {
    console.error(err)
  }
}

export const removeTag = (entryId, tag) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/entries/${entryId}`, {
      action: 'remove',
      tag
    })
    dispatch(getEntries(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultEntries, action) {
  switch (action.type) {
    case GET_ENTRIES:
      return action.entries
    default:
      return state
  }
}
