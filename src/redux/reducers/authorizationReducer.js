import { AUTH_LOGIN_USER, AUTH_LOGOUT_USER, AUTH_REGISTER_USER, AUTH_REFRESH_TOKEN} from '../actions/types';

const initialState = {
    user: {},
    refreshToken:'',
    token:'',
    tokenExpiry:'',
}

export default function (state=initialState, action) {

    switch (action.type) {
        case AUTH_LOGIN_USER:
            return {
                ...state,
                user:action.payLoad.data.data.user,
                refreshToken:action.payLoad.data.data.refreshToken,
                token:action.payLoad.data.data.token,
                tokenExpiry:action.payLoad.data.data.tokenExpiry,
            }

        case AUTH_LOGOUT_USER:
            return {
                ...state,
                user:{},
                refreshToken:'',
                token:'',
            }

        case AUTH_REGISTER_USER:
            return {
                ...state,
                user:{} 
            }

        case AUTH_REFRESH_TOKEN:
            return {
                ...state,
                token:action.payLoad.data.data.token,
            }

        default:
            return state;
    }
}