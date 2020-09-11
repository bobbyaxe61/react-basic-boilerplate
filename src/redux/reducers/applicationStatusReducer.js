import { APP_STATUS_IDLE, APP_STATUS_PROCESSING } from '../actions/types';

const initialState = {
    isProcessing:false,
    isIdle:true,
}

export default function (state=initialState, action) {

    switch (action.type) {
        case APP_STATUS_IDLE:
            return {
                ...state,
                isProcessing:false,
                isIdle:true,
            }

        case APP_STATUS_PROCESSING:
            return {
                ...state,
                isProcessing:true,
                isIdle:false,
            }

        default:
            return state;
    }
}