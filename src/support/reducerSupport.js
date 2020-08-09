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
const getUserDetails = (application) => {
    const tree = applicationTree();

    if (application === 'master' && !isEmptyObject(tree.master.auth)){
        return tree.master.auth
    }

    return false;
}

export {storeInstance, applicationTree, getUserDetails};