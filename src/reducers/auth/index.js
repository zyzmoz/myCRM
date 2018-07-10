import {createReducer} from '../../util/createReducer';
import {
  LOGIN
} from '../../actions/auth/constants';

const initialState = {
  
}

const login = (state, payload) => {
  return {...payload.auth};
}

export default createReducer(initialState, {
  [LOGIN]: login
});