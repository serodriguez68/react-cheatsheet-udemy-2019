import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPosts =  () => {
    const response = jsonPlaceholder.get('/posts');

    return {
        type: 'FETCH_POSTS',
        payload: response
    };
};




