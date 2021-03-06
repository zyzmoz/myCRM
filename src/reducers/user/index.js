import { createReducer } from '../../util/createReducer';
import { QUERY_USERS, GET_USER, START_DELETE_USER, CANCEL_DELETE_USER, CREATE_USER, UPDATE_USER } from '../../actions/user/constants';

let initialState = {};

const queryUsers = (state, payload) => {
  return { list: payload.data }
}

const getUser = (state, payload) => {
  return { ...state, object: payload.data }
}

const startDeleteUser = (state, payload) => {
  return {
    ...state,
    object: { ...payload.data, deleting: true }
  }
}

const cancelDeleteUser = (state, payload) => {
  return {
    ...state,
    object: { ...payload.data, deleting: false }
  }
}

const createUser = (state, payload) => {
  return { ...state }
}

const updateUser = (state, payload) => {
  return { ...state }
}

export default createReducer(initialState, {
  [QUERY_USERS]: queryUsers,
  [GET_USER]: getUser,
  [START_DELETE_USER]: startDeleteUser,
  [CANCEL_DELETE_USER]: cancelDeleteUser,
  [CREATE_USER]: createUser,
  [UPDATE_USER]: updateUser
});