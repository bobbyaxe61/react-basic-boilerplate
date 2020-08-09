/**
 * Store data
 * @param {string} key 
 * @param {object|array} value 
 * @return {boolean}
 */
const save = (key, value) => {

    // check if key exists
    if(get(key)){return false}

    localStorage.setItem(key, JSON.stringify(value))
    if (get(key)) {
        return true;
    }

    return false;
}

/**
 * Replace stored data
 * @param {string} key 
 * @param {object|array} value 
 * @return {boolean}
 */
const replace = (key, value) => {

    localStorage.setItem(key, JSON.stringify(value))
    if (get(key)) {
        return true;
    }

    return false;
}

/**
 * Add to stored data
 * @param {string} key 
 * @param {object|array} value 
 * @param {string} field
 * @param {object|array} alternative
 * @return {boolean}
 */
const add = (key, value, field, alternative) => {

    let result = get(key);

    let operation = !result?
        save(key, {...alternative, [field]:[value] })
    :
        replace(key, {...result, [field]:[...result[field], value]})
    ;

    if (operation && get(key)) {
        return true;
    }

    return false;
}

/**
 * Find and return stored data 
 * @param {string} key 
 * @return {null|array|object}
 */
const get = (key) => {
    const item = localStorage.getItem(key);

    if (item) {
        return JSON.parse(item);
    }

    return null;
}

/**
 * Find and delete stored data
 * @param {string} key 
 * @return {boolean}
 */
const forget = (key) => {

    localStorage.removeItem(key)
    if (!get(key)) {
        return true;
    }

    return false;
}

/**
 * Delete all stored data
 * @return {boolean}
 */
const nuke = () => {

    save('nuke',{nuke:'nuke'})
    localStorage.clear()
    if (!get('nuke')) {
        return true;
    }

    return false;
}

/**
 * Memory location with ability to store, get and delete data
 */
export const brain = {save, add, get, forget, nuke, replace};