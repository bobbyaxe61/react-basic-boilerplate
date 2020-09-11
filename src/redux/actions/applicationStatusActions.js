import { APP_STATUS_IDLE, APP_STATUS_PROCESSING} from './types';

export const appStatusIdleAction = () => {
    return (dispatch) => {
        dispatch({type: APP_STATUS_IDLE});
    }
}

export const appStatusProcessingAction = () => {
    return (dispatch) => {
        dispatch({type: APP_STATUS_PROCESSING});
    }
}