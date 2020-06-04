import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PROMPTS = 'GET_PROMPTS'
const ERROR_MSG = 'ERROR_MSG'
// const NEW_PROMPT = 'NEW_PROMPT'

/**
 * INITIAL STATE
 */
const defaultPrompts = []

/**
 * ACTION CREATORS
 */
const getPrompts = prompts => ({type: GET_PROMPTS, prompts})
const errorMsg = message => ({type: ERROR_MSG, message})

/**
 * THUNK CREATORS
 */
export const gotPrompts = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/prompts/${userId}`)
    dispatch(getPrompts(data || defaultPrompts))
  } catch (err) {
    console.error(err)
  }
}
export const addPrompt = (userId, prompt) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/prompts/${userId}`, {prompt})
    if (Array.isArray(data)) dispatch(getPrompts(data))
  } catch (err) {
    console.error(err)
  }
}

export const removePrompt = promptId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/prompts/${promptId}`)
    dispatch(getPrompts(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultPrompts, action) {
  switch (action.type) {
    case GET_PROMPTS:
      return action.prompts
    // case ERROR_MSG:
    //   return action.message
    default:
      return state
  }
}
