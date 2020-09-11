import axios from 'axios';
import { getUserDetails, storeInstance } from '../support/reducerSupport';
import { retryAgain } from '../support/sessionSupport';
import { refreshUserTokenAction, logoutUserAction } from '../redux/actions/authorizationActions';

// Refresh token
const refreshTokenAction = async (token = null) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh`,{},{headers:{Authorization:'Bearer '+token}})
  .then(data => {
    // Send new token to reducer
    storeInstance().dispatch(refreshUserTokenAction(data));
    return data;
  })
  .catch((error) => {
    return error.response;
  });
}

// Handle success response
const successResponseHandler = (response) => {

  // No content response (204)
  if (response.status === 204) { response.data = {data:{}}; }

  // Return processed response
  return response;
}

// Handle failure response
const failureResponseHandler = async (error) => {

  // No network response (ECONNABORTED)
  if (!error.response || error.code === 'ECONNABORTED'){
    // alert(`Could not connect to network`);
    return Promise.reject(error);
  }

  // No authorization response (401)
  if (error.response && error.response.status === 401) {
    try {

      // Get current user details
      const userDetails = getUserDetails();
      const token = userDetails.token;
      const id = userDetails.id;

      // Check if retry limit has been exceeded
      if(!retryAgain(id+'_retries',5)){throw new Error(error)}

      // Attempt to refresh expired token
      let refreshTokenResponse = await refreshTokenAction(token);

      // Handle token refresh blacklisting caused by a prior request having refreshed the token already
      if (refreshTokenResponse.status.toString().split('')[0] !== '2') {
        refreshTokenResponse = {data:{data:{access_token:getUserDetails().token}}}
      }

      // Retry the failed request with returned token
      return await instance.request({...error.config, headers: {
        ...error.config.headers,
        Authorization: 'Bearer '+refreshTokenResponse.data.data.access_token,},
      })
      .then((response)=>{
        // reset retries
        retryAgain(id+'_retries',1);

        // return response
        return successResponseHandler(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });

    } catch (error) {

      // Logout user
      storeInstance().dispatch(logoutUserAction());
      return Promise.reject(error);
    }
  }

  // Return unprocessed error
  return Promise.reject(error);
}

// Create an axios instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 60000,
  headers:{Authorization:''}
});

// Add a request interceptor
instance.interceptors.request.use(req => {

  // Get logged in user details
  const userDetails = getUserDetails();
  const token = userDetails.token ?? 'default';

  // inject tokens to headers
  req.headers['Authorization'] = 'Bearer '+token;

  // Reattach the base url
  if (!req.baseURL) {
    req.url = process.env.REACT_APP_API_URL+'/'+req.url;
  }

  return req;
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {return successResponseHandler(response);},
  (error) => {return failureResponseHandler(error);}
);

export default instance;