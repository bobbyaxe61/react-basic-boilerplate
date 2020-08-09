import { MASTER_LOGIN_USER, MASTER_LOGOUT_USER, MASTER_REGISTER_USER, MASTER_REFRESHED_TOKEN} from './types';
import Axios from '../../rclient/masterClient';
import handler from '../../exceptions/handler';
import { setAlertAction } from './masterAlertActions';
import {persistLastLogin, updatePersistedLastLogin, destroyLastLogin} from '../../support/sessionSupport';

export const loginUserAction = (payLoad) => {
    let remember = payLoad.remember;
    return (dispatch) => {
        Axios.post(`auth/o/token`,{...payLoad})
        .then(data => {
            dispatch({type: MASTER_LOGIN_USER,payLoad: data});
            if(remember){persistLastLogin('master_session',data);}
        })
        .catch((error) => {
            handler(error);
            // console.log(error);
        });
    }
}

export const logoutUserAction = () => {
    return (dispatch) => {
        destroyLastLogin('master_session');
        dispatch({type: MASTER_LOGOUT_USER,payLoad: {}});
    }
}

export const registerUserAction = (payLoad,redirectToLogin) => {
    return (dispatch) => {
        Axios.post(`auth/register`,{...payLoad})
        .then(data => {
            dispatch({type: MASTER_REGISTER_USER}); 
            dispatch(setAlertAction({id:Math.random(), alertType:'success', alertMessage:'Registration was successful, Please Login'}));
            redirectToLogin();
        })
        .catch((error) => {
            handler(error);
            // console.log(error);
        });
    }
}

export const refreshUserTokenAction = (payLoad) => {
    return (dispatch) => {
        updatePersistedLastLogin('master_session',payLoad);
        dispatch({type: MASTER_REFRESHED_TOKEN,payLoad: payLoad});
    }
}