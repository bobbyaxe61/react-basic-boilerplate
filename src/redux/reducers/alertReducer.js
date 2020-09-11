import { ALERT_SET, ALERT_CLEAR, ALERT_SET_MULTI } from '../actions/types';

const initialState = {
    alerts: [],
}

export default function (state=initialState, action) {

    switch (action.type) {
        case ALERT_SET:
            return {
                ...state,
                alerts:[...state.alerts,action.payLoad],
            }

        case ALERT_SET_MULTI:
            return {
                ...state,
                alerts:[action.payLoad],
            }

        case ALERT_CLEAR:
            return {
                ...state,
                alerts:[]
            }

        default:
            return state;
    }
}