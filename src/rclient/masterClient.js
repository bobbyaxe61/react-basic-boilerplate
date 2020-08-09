import axios from 'axios';
import { getUserDetails, storeInstance } from '../support/reducerSupport';
import { retryAgain } from '../support/sessionSupport';
import { refreshUserTokenAction, logoutUserAction } from '../redux/actions/masterAuthActions';

// Create an axios instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 60000,
  headers:{Authorization:''}
});

// Add a request interceptor
instance.interceptors.request.use(req => {

  // Get logged in user details
  const userDetails = getUserDetails('master');
  const token = userDetails.token ?? 'default';

  // inject tokens to headers
  req.headers['Authorization'] = 'Bearer '+token;

  return req;
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
    return response;
  },
  async (error) => {
    
    // check if the error error is due to expired token
    if (error.response && error.response.status === 401 && error.response.data.expiredToken) {
      try {
        const userDetails = getUserDetails('master');
        const { user, refreshToken } = userDetails;
        const { _id, email} = user;

        // Refresh token and retry request
        await axios.post(`${process.env.REACT_APP_API_URL}auth/refresh`,{id:_id, email:email, refreshToken:refreshToken})
        .then((refreshTokenResponse)=>{

          // Send new token to reducer
          storeInstance().dispatch(refreshUserTokenAction(refreshTokenResponse));

          // Check if retry limit has been exceeded
          if(!retryAgain(_id+'_retries',5)){return Promise.reject(error);}

          // Retry the failed request with returned token
          instance.request({
            ...error.config,
            headers: {
              ...error.config.headers,
              Authorization: 'Bearer '+refreshTokenResponse.data.data.token,
            },
          })
          .then((newResponse)=>{
            return newResponse;

          }).catch((error) => {
            return Promise.reject(error);

          });

        }).catch((error)=>{
          return Promise.reject(error);
        });

      } catch (err) {

        // Logout user
        storeInstance().dispatch(logoutUserAction());

        return Promise.reject(error);
      }
    }

    if (error.code === 'ECONNABORTED'){
      alert(`Could not connect to network`);
    }

    return Promise.reject(error);
  }
);

export default instance;