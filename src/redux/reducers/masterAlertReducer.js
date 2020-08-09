import { MASTER_SET_ALERT, MASTER_CLEAR_ALERT, MASTER_SET_MULTI_ALERT } from '../actions/types';

const initialState = {
    alerts: [],
}

export default function (state=initialState, action) {

    switch (action.type) {
        case MASTER_SET_ALERT:
            return {
                ...state,
                alerts:[...state.alerts,action.payLoad],
            }

        case MASTER_SET_MULTI_ALERT:
            return {
                ...state,
                alerts:[action.payLoad],
            }

        case MASTER_CLEAR_ALERT:
            return {
                ...state,
                alerts:action.payLoad
            }

        default:
            return state;
    }
}