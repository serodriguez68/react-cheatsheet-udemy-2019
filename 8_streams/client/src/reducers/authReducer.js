import {SIGN_IN, SIGN_OUT} from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};

export default (signInState = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {...signInState, isSignedIn: true, userId: action.payload};
        case SIGN_OUT:
            return {...signInState, isSignedIn: false, userId: null};
        default:
            return signInState;
    }
};