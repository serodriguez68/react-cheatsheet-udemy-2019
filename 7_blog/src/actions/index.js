import jsonPlaceholder from "../apis/jsonPlaceholder";

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




