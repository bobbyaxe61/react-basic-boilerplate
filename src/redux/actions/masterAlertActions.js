import { MASTER_SET_ALERT, MASTER_CLEAR_ALERT, MASTER_SET_MULTI_ALERT } from './types';

/**
 * 
 * @param {object} payLoad 
 * Note that payLoad must be an object must have 
 * the keys of alertType and alertMessage respectively
 */
export const setAlertAction = (payLoad) => {
    return (dispatch) => { dispatch({
            type: MASTER_SET_ALERT,
            payLoad: {...payLoad}
        });
    }
}

/**
 * 
 * @param {object} payLoad 
 * Note that payLoad must be an array of objects which must have 
 * the keys of alertType and alertMessage respectively
 */
export const setMultiAlertAction = (payLoad) => {

    return (dispatch) => { dispatch({
            type: MASTER_SET_MULTI_ALERT,
            payLoad: {...payLoad}
        });
    }
}

export const clearAlertAction = (payLoad) => {
    return (dispatch) => { dispatch({
            type: MASTER_CLEAR_ALERT,
            payLoad: payLoad
        });
    }
}