import streams from "../apis/streams";
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types';

export const signIn = (userId) => {
  return {
      type: SIGN_IN,
      payload: userId
  };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const response = await streams.post('/streams', {...formValues, userId });
        dispatch({type: CREATE_STREAM, payload: response.data});
        // Do programmatic navigation right here
    };
};

export const fetchStreams = () => {
    return async (dispatch, _) => {
        const response = await streams.get('/streams');
        dispatch({type: FETCH_STREAMS, payload: response.data});
    };
};

export const fetchStream = (id) => {
    return async (dispatch, _) => {
        const response = await streams.get(`/streams/${id}`);
        dispatch({type: FETCH_STREAM, payload: response.data});
    };
};

export const editStream = (id, updatedStream) => {
    return async (dispatch, _) => {
        const response = await streams.put(`/streams/${id}`, updatedStream);
        dispatch({type: EDIT_STREAM, payload: response.data});
    };
};

export const deleteStream = (id) => {
    return async (dispatch, _) => {
        await streams.delete(`/streams/${id}`);
        dispatch({type: DELETE_STREAM, payload: id});
    };
};
