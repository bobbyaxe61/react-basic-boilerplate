import {brain} from '../helpers/brain';

/**
 * Persist a logged in user details
 * @param {object} payLoad 
 * @return {boolean}
 */
export const persistLastLogin = (id, payLoad) => {
  let user = brain.get(id);

  // if no user record, create a user record
  if (!user) {
      brain.save(id,{loginDetails:payLoad});
      return true;
  }

  // if user record, over ride current record
  if (user.loginDetails) {
      brain.replace(id,{loginDetails:payLoad})
      return true;
  }
}

/**
 * Update persisted logged in user details
 * @param {object} payLoad
 */
export const updatePersistedLastLogin = (id, payLoad) => {
  let user = brain.get(id);

  // if no user record,end
  if (!user) {
    return false;
  }

  // if user record, over ride current record
  if (user.loginDetails) {
    try {
      brain.replace(id,{
        loginDetails:{
          data:{
            ...user.loginDetails.data,
            data:{
              ...user.loginDetails.data.data,
              token:payLoad.data.data.token
            }
          }
        }
      });
    } catch (error) {
      return false;
    }
    return true;
  }
}

/**
 * Retrieve persisted logged in user details, if any
 * @param {void}
 * @return {object|boolean}
 */
export const retrievePersistedLastLogin = (id) => {
  let user = brain.get(id);

  if (user && user.loginDetails) {
    return user;
  } else {
    return false;
  }
}

/**
 * Destroy all saved activity for current user session
 * @param {void}
 * @return {boolean}
 */
export const destroyLastLogin = (id) => {
  return brain.forget(id);
}

/**
 * Record and store request retires per user
 * @param {string} id 
 * @param {integer} maxRetries 
 */
export const retryAgain = (id, maxRetries) => {
  let user = brain.get(id);

  // if no user record, create a user record and allow retry
  if (!user) {
    brain.save(id,{retries:1})
    return true;
  }

  // if user retries exceeds the limit stated, clean user retry count and refuse retry
  if (user.retries && user.retries > maxRetries) {
    brain.replace(id,{...user,retries:0})
    return false;
  }

  // if user retries count is below the limit stated, increment user retry count and allow retry
  if (user.retries && user.retries < maxRetries) {
    brain.replace(id,{...user,retries:user.retries+1})
    return true;
  }
}