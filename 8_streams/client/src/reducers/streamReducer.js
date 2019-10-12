import _ from 'lodash';
import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from "../actions/types";

export default (prevStreams = {}, action) => {
 switch (action.type) {
     case FETCH_STREAM:
         return { ...prevStreams, [action.payload.id]: action.payload };
     case CREATE_STREAM:
         return { ...prevStreams, [action.payload.id]: action.payload };
     case EDIT_STREAM:
         return { ...prevStreams, [action.payload.id]: action.payload };
     case DELETE_STREAM:
         return _.omit(prevStreams, action.payload);
     case FETCH_STREAMS:
         // The second ... spreads the object returned from map keys and merges it with prevStream
         return { ...prevStreams, ..._.mapKeys(action.payload, 'id') };
     default:
         return prevStreams;
 }
};