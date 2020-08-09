import { MASTER_LOGIN_USER, MASTER_LOGOUT_USER, MASTER_REGISTER_USER, MASTER_REFRESHED_TOKEN} from '../actions/types';

const initialState = {
    user: {},
    refreshToken:'',
    token:'',
}

export default function (state=initialState, action) {

    switch (action.type) {
        case MASTER_LOGIN_USER:
            return {
                ...state,
                user:action.payLoad.data.data.user,
                refreshToken:action.payLoad.data.data.refreshToken,
                token:action.payLoad.data.data.token,
            }

        case MASTER_LOGOUT_USER:
            return {
                ...state,
                user:{},
                refreshToken:'',
                token:'',
            }

        case MASTER_REGISTER_USER:
            return {
                ...state,
                user:{}
            }

        case MASTER_REFRESHED_TOKEN:
            return {
                ...state,
                token:action.payLoad.data.data.token,
            }

        default:
            return state;
    }
}