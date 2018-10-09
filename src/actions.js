import {
    CHANGE_SEARCH_FIELD,
    REQUEST_SUBS_PENDING,
    REQUEST_SUBS_SUCCESS,
    REQUEST_SUBS_FAILED,
    CHANGE_SUB_CATEGORY
} from './constants.js';

export const setSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
})

export const setCategory = (text) => ({
    type: CHANGE_SUB_CATEGORY,
    payload: text
})

export const requestSubs = () => (dispatch, getState) => {
    dispatch({ type: REQUEST_SUBS_PENDING });
    fetch(`https://www.reddit.com/r/${getState().searchSubs.searchField + getState().searchSubs.category}.json?`)
      .then(response => response.json())
      .then(posts =>  dispatch({ type: REQUEST_SUBS_SUCCESS, payload: posts.data.children}))
      .catch(error => dispatch({ type: REQUEST_SUBS_FAILED, payload: error}))
}

