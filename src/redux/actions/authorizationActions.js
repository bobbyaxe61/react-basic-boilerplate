import { AUTH_LOGIN_USER, AUTH_LOGOUT_USER, AUTH_REGISTER_USER, AUTH_REFRESH_TOKEN} from './types';
import Axios from '../../connection/client';
import handler from '../../exceptions/handler';
import { setAlertAction } from './masterAlertActions';
import {persistLastLogin, updatePersistedLastLogin, destroyLastLogin} from '../../support/sessionSupport';
import { randomString, characterRange } from '../../helpers/helper';

export const loginUserAction = (payLoad) => {
    let remember = payLoad.remember;
    return (dispatch) => {
        Axios.post(`auth/login`,{...payLoad})
        .then(data => {
            dispatch({type: AUTH_LOGIN_USER,payLoad: data});
            if(remember){persistLastLogin('session',data);}
        })
        .catch((error) => {
            handler(error);
        });
    }
}

export const logoutUserAction = () => {
    return (dispatch) => {
        destroyLastLogin('session');
        dispatch({type: AUTH_LOGOUT_USER,payLoad: {}});
    }
}

export const registerUserAction = (payLoad,redirectToLogin) => {
    return (dispatch) => {
        Axios.post(`auth/register`,{...payLoad})
        .then(data => {
            dispatch({type: AUTH_REGISTER_USER}); 
            dispatch(setAlertAction({id:randomString(8,characterRange('A','Z')) , alertType:'success', alertMessage:'Registration was successful, Please Login'}));
            redirectToLogin();
        })
        .catch((error) => {
            handler(error);
        });
    }
}

export const refreshUserTokenAction = (payLoad) => {
    return (dispatch) => {
        updatePersistedLastLogin('session',payLoad);
        dispatch({type: AUTH_REFRESH_TOKEN,payLoad: payLoad});
    }
}