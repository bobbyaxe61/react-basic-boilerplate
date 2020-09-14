import { setMultiAlertAction, setAlertAction } from '../redux/actions/alertActions';
import { isEmptyObject, randomString, characterRange, isEnv } from '../helpers/helper';
import { storeInstance } from '../support/reducerSupport';

const handler = (errorObject) => {

    if (errorObject.response) {

        let errors = errorObject.response.data.errors;

        if (!isEmptyObject(errors)) {

            // Map through errors
            let errorList = [];
            Object.keys(errors).map((item,key)=>{
                return errorList.push({id:randomString(8,characterRange('A','Z')), alertType:'danger', alertMessage:errors[item].toString()});
            })

            // Request made and server responded with an error
            if(!isEnv('REACT_APP_ENV','production')){
                console.log('Error Response', errorObject.response.headers, errorObject.response.data, errorObject.response.status);
            }

            // Send found errors to alert
            storeInstance().dispatch(setMultiAlertAction(...errorList));

        } else {
            // Request made and server responded with an error
            if(!isEnv('REACT_APP_ENV','production')){
                console.log('Error Response', errorObject.response);
            }

            // Send found errors to alert
            storeInstance().dispatch(setAlertAction({id:randomString(8,characterRange('A','Z')), alertType:'warning', alertMessage:'Server is Conflicted'}));
        }

    } else if (errorObject.request) {
        // The request was made but no response was received
        if(!isEnv('REACT_APP_ENV','production')){
            console.error('Unknown Response', errorObject.request);
        }

        // Send found errors to alert
        storeInstance().dispatch(setAlertAction({id:randomString(8,characterRange('A','Z')), alertType:'danger', alertMessage:'Server is Unavailable'}));

    } else {
        // Something happened in setting up the request that triggered an Error
        if(!isEnv('REACT_APP_ENV','production')){
            console.error('Unknown Error', errorObject.message);
        }

        // Send found errors to alert
        storeInstance().dispatch(setAlertAction({id:randomString(8,characterRange('A','Z')), alertType:'info', alertMessage:'Application is Unavailable'}));
    }
} 


export default handler;