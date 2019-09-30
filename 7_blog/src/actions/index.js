import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from 'lodash';

// Pattern: re-use other smaller action creators in case we need to use them stand alone
// This "combo" action creators allow us to do custom logic and control the amount of calls that we do
export const fetchPostsAndUsers = () => {
    return async (dispatch, getState) => {

        // Hard to understand: Whenever we call an action creator within another action creator, we need to manually
        // dispatch the action and let redux-thunk handle if it is a JS object or a function.
        // In this example `fetchPosts()` returns an inner function. We need to dispatch that so that redux-thunk
        // takes care of the rest.
        await dispatch(fetchPosts()); // We await for the API call to be completed before continuing


        // Do some processing. eg find only the unique user uds
        const allUserIds = _.map(getState().posts, 'userId');
        const userIds = _.uniq(allUserIds);

        // Call another action creator to fetch users
        // We don't have to use await because we no longer care when is the user actually fetched.
        userIds.forEach( id => dispatch(fetchUser(id)));
    }
};

export const fetchPosts =  () => {
    // We are going to return a function so that redux-thunk uses it.
    // This function will get called by redux-thunk with the dispatch and getState functions
    // injected as arguments.
    // We don't care about what the inner function returns, the only thing that we care is that the inner function
    // dispatches an action.
    return async (dispatch, getState) => {
            const response = await jsonPlaceholder.get('/posts');
            dispatch({ type: 'FETCH_POSTS', payload: response.data });
    };
};

export const fetchUser = (id) => {
    return async (dispatch, getState) => {
        const response = await jsonPlaceholder.get(`/users/${id}`);
        dispatch({type: 'FETCH_USER', payload: response.data});
    };
};


// Memoized solution
// (+) Does not repeat requests for users that have already been fetched (no N+1)
// (-) If we legitimately wanted to re-fetch a user (for example if his data changed on the server), we cannot do it.
// export const fetchUser = id => {
//     return dispatch => {
//         return _fetchUser(id, dispatch);
//     };
// };
// const _fetchUser = _.memoize((async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({type: 'FETCH_USER', payload: response.data});
// }));


