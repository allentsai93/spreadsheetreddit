import {
    CHANGE_SEARCH_FIELD,
    REQUEST_SUBS_PENDING,
    REQUEST_SUBS_SUCCESS,
    REQUEST_SUBS_FAILED,
    CHANGE_SUB_CATEGORY
} from './constants.js';

const initialStateSearch = {
    searchField: 'all',
    category: ''
}

export const searchSubs = (state = initialStateSearch, action={}) => {
    switch(action.type) {
        case CHANGE_SUB_CATEGORY:
            return Object.assign({}, state, {category: action.payload})
        case CHANGE_SEARCH_FIELD:
            return Object.assign({}, state, {searchField: action.payload})
        default:
            return state;
    }
}


const initialStatePosts = {
    isPending: false,
    posts: [],
    error: ''
}

export const requestSubs = (state = initialStatePosts, action={}) => {
    switch(action.type) {
        case REQUEST_SUBS_PENDING:
            return Object.assign({}, state, {isPending: true})
        case REQUEST_SUBS_SUCCESS:
            return Object.assign({}, state, {posts: action.payload, isPending: false})
        case REQUEST_SUBS_FAILED:
            return Object.assign({}, state, {error: action.payload, isPending: false})
        default:
            return state;
    }
}