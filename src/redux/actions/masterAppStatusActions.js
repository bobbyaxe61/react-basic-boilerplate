import { MASTER_APP_STATUS_IDLE, MASTER_APP_STATUS_PROCESSING} from './types';

export const setAppStatusIdleAction = () => {
    return (dispatch) => {
        dispatch({type: MASTER_APP_STATUS_IDLE});
    }
}

export const setAppStatusProcessingAction = () => {
    return (dispatch) => {
        dispatch({type: MASTER_APP_STATUS_PROCESSING});
    }
}