const INITIAL_STATE = {
  isSignedIn: null
};

export default (signInState = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {...signInState, isSignedIn: true};
        case 'SIGN_OUT':
            return {...signInState, isSignedIn: false};
        default:
            return signInState;
    }
};