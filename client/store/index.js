import { createStore, applyMiddleware } from 'redux';
// import yourReducer from './yourReducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';



function reducer (state = {}, action) {
  return state;
}

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;

