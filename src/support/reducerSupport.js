import store from '../redux/store';
import { isEmptyObject } from '../helpers/helper';

const storeInstance = () => {
    return store;
}

/**
 * Get the application redux tree
 * @param {void}
 * @return {object}
 */
const applicationTree = () => {
    return storeInstance().getState();
}

/**
 * Get the logged in users details if any
 * @param {void}
 * @return {object|boolean}
 */
const getUserDetails = () => {
    const tree = applicationTree();

    if (!isEmptyObject(tree.authorization)){
        return tree.authorization
    }

    return false;
}

export {storeInstance, applicationTree, getUserDetails};