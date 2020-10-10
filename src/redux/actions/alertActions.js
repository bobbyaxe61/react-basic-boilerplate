import { ALERT_SET, ALERT_CLEAR, ALERT_SET_MULTI } from './types';

/**
 * 
 * @param {object} payLoad 
 * Note that payLoad must be an object must have 
 * the keys of alertType and alertMessage respectively
 */
export const setAlertAction = (payLoad) => {
    return (dispatch) => { dispatch({
            type: ALERT_SET,
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
            type: ALERT_SET_MULTI,
            payLoad: [...payLoad]
        });
    }
}

export const clearAlertAction = () => {
    return (dispatch) => { dispatch({
            type: ALERT_CLEAR
        });
    }
}