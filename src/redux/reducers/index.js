import {combineReducers} from 'redux';
import authorizationReducer from './authorizationReducer';
import alertReducer from './alertReducer';
import applicationStatusReducer from './applicationStatusReducer';
export default combineReducers({
    authorization: authorizationReducer,
    alert: alertReducer,
    applicationStatus: applicationStatusReducer,
});