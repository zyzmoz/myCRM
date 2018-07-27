import {createReducer} from '../../util/createReducer';
import {
  LOGIN, LOGOUT
} from '../../actions/auth/constants';

const initialState = {
  
}

const login = (state, payload) => {
  return {...payload.auth};
}

const logout = (state, payload) =>{
  return {};
}

export default createReducer(initialState, {
  [LOGIN]: login,
  [LOGOUT]:logout
});