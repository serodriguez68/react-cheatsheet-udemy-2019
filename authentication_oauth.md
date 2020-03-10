## Authentication with React using OAuth

### Types of OAuth Authentication
![Types of OAuth Authentication](./diagrams/types-of-oauth.svg)

### OAuth for Browser Apps Flow Overview
![OAuth for Browser Apps Flow Overview](./diagrams/oauth-for-browsers-flow.svg)


### Configuring Google to use oAuth
The Video _209. Creating OAuth Credentials_ from Udemy has a detailed step by step on how to create the credentials
on the Google developer console.

### Adding Oauth to a vanilla React project
To add the Google OAuth client library, you need to add it in the `<head>` of your HTML.
```html
<head>
  <!-- ...  -->
  <script src="https://apis.google.com/js/api.js"></script>
</head>
```
That loads the google api `gapi` in the window scope of the browser.

#### React side of things

In this example, we create a dedicated `GoogleAuth` component that will handle the authentication logic.

We use `gapi.load` to load the specific part of Google's API library we are interested in (gapi is very big so
developers need to download only the parts needed) and `initialize` the client with our configured credentials.

`gapi.client.init` is an async call that returns a promise, so we can use `then` to put some custom logic
for when the initialization process finishes.

Additionally, we use the provided `auth.isSignedIn.listen` listener to add a callback that updates our state
whenever the sign is status changes.

Finally, we wire 2 `onClick` event handlers for the sign it and sign out buttons.

```jsx harmony
import React from 'react';

class GoogleAuth extends React.Component {
    // When the app first loads we don't know if the user is signed in or not, so we should not assume anything
    state = { isSignedIn: null };

    componentDidMount() {
        // arg 1: What part of the gapi library we want to load
        // arg 2: Callback of what to do once the load has finished
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                // Given when you configure your console.developers.google.com console
                clientId: `${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}`,
                // What info form the users do we want to get access to.
                scope: 'email'
            }).then(() => {
                // window.gapi.client.init returns a promise. We use `then` to get save a reference to the
                // auth instance in the component's state so that we can easily reference it later.
                // The authInstance contains many convenient methods like
                // - auth.signIn(): opens Google's authentication popup
                // - auth.isSignedIn.get(): true if the user is signed in
                // - auth.isSignedIn.listen(callback): a listener that is called when the isSignedIn status changes
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn: this.auth.isSignedIn.get()});
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    // Needs to be arrow function to bind `this` since it will be used as a callback.
    onAuthChange = () => {
        this.setState({isSignedIn: this.auth.isSignedIn.get()});
    };

    // Callback function for when the user clicks sign in
    onSignInClick = () => {
      this.auth.signIn();
    };

    // Callback function for when the user clicks sign out
    onSignOutClick = () => {
      this.auth.signOut();
    };

    renderAuthButton() {
        if(this.state.isSignedIn === null) {
            return null; // A spinner could also work
        } else if (this.state.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

export default GoogleAuth;
```

Storing whether a user is signed in or not inside the state of a single component can potentially be a problem if
there are other components that need to know that information.  To fix this [we can use Redux](#adding-oauth-to-a-react-redux-project)
to store that information in the central redux store.

### Adding OAuth to a React-Redux project

- Motivation: We want to store whether a user is sign in or sign out in the redux store to allow any component to know 
if a user is signed in or sign out.
- There are 2 approaches to add OAuth to react-redux projects

#### Approach 1: Centralize Authentication Logic into a component
- (+) All Auth logic is centralized into a single component. Less wiring and good for future reference.
- (-) It does not follow Redux conventions closely. In theory, only action creators should be responsible for changing
the app's state. With this approach, the GoogleAuthComponent is changing the state of our app through
the interaction with `gapi`.
- This is the approach this course uses favoring future reference.
![Approach 1: Centralize Authentication Logic into a component](./diagrams/oauth-in-react-redux-approach-1.svg)

##### The `GoogleAuthComponent`
Compared to the vanilla react approach, the `GoogleAuthComponent` needs some changes:
- The notion of a user being signed in or not needs to be injected from the redux store using `mapStateToProps`.
This entails that `isSignedIn` will no live inside the component's props
- When a user attempts to sign in or sign out, `GoogleAuthComponent` must update the redux store by dispatching
actions using the action creators.

```jsx harmony
import React from 'react';
import { connect } from 'react-redux';
import {signIn, signOut} from "../actions";


class GoogleAuth extends React.Component {

    componentDidMount() {
        // arg 1: What part of the gapi library we want to load
        // arg 2: Callback of what to do once the load has finished
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                // Given when you configure your console.developers.google.com console
                clientId: `${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}`,
                // What info form the users do we want to get access to.
                scope: 'email'
            }).then(() => {
                // window.gapi.client.init returns a promise. We use `then` to get save a reference to the
                // auth instance in the component's state so that we can easily reference it later.
                // The authInstance contains many convenient methods like
                // - auth.signIn(): opens Google's authentication popup
                // - auth.isSignedIn.get(): true if the user is signed in
                // - auth.isSignedIn.listen(callback): a listener that is called when the isSignedIn status changes.
                //   The callback is called with a boolean that represents if the user is signed in
                this.auth = window.gapi.auth2.getAuthInstance();
                // Use action creators to update the redux store when the library finishes initialization
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    // Needs to be arrow function to bind `this` since it will be used as a callback.
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            const userId = this.auth.currentUser.get().getId(); // Provides Google's userID
            this.props.signIn(userId);
        } else {
            this.props.signOut();
        }
    };

    // Callback function for when the user clicks sign in
    onSignInClick = () => {
      this.auth.signIn(); // Use wrapped-with-dispatch action creator
    };

    // Callback function for when the user clicks sign out
    onSignOutClick = () => {
      this.auth.signOut(); // Use wrapped-with-dispatch action creator
    };

    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null; // A spinner could also work
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
    mapStateToProps,
    {signIn, signOut}
)(GoogleAuth);
```

##### `Action Creators`
```jsx harmony
// src/actions/index.js
import {SIGN_IN, SIGN_OUT} from './types';

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
```
##### `Reducers` 
```jsx harmony
// src/reducers/authReducer
import {SIGN_IN, SIGN_OUT} from '../actions/types';

const INITIAL_STATE = { isSignedIn: null, userId: null };

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

// src/reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
    auth: authReducer
});
```
 
#### Approach 2: Distribute Authentication logic to follow Redux conventions
- (+) Follows Redux Convention by interacting with `gapi` inside the action creators.
- (-) The auth logic gets distributed among the action creators and the `GoogleAuthComponent`,
 making it harder to trace for future reference.
 - The code for this approach is not given in the course.
![Approach 2: Distribute Authentication logic to follow Redux conventions](./diagrams/oauth-in-react-redux-approach-2.svg)