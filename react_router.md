### Handling multiple pages with React-Router
#### Installing React-Router

`npm install --save react-router-dom`.
 
Make sure the "-dom" is there.  We NEVER want to install `react-router` by itself. We want a higher
level package:
- `react-router-dom`: for DOM react (even if we use Redux).
- `react-router-native`: for react native.
- `react-router-redux`: Bindings between Redux and React Router. 100% not necessary, and not recommended. Stephen
Grider recommends using  `react-router-dom` even in Redux projects.

#### Overview of how does React-Router-Dom work
We interact with react-router-dom through 4 components given in the library: 
- A `Router` (e.g. `BrowserRouter`): internally keeps track of all your navigation `history` and figures out the `path` of the current URL.
- A `history` object that is held by the router and is in charge of storing and changing the URL. All routers except 
the plain `Router` automatically create their own `history` objects 
(see [types of routers](#types-of-routers) and [programmatic navigation](#programmatic-navigation)).
- `Route`: compares the actual path with the `path` prop to render one of our components.
    - Note that if multiple `Route` components match the URL, all matching components get rendered.
- `Link`: see [navigation](#intentional-navigation-in-react-router).

```jsx harmony
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import PageOne from './PageOne';
import PageTwo from './PageTwo';

const App = () => {
    return(
        <div>
            <BrowserRouter>
                { /* Browser Router can only take one child, hence the div */}
                <div>
                    <Route path="/" exact component={PageOne}/>
                    <Route path="/pagetwo" component={PageTwo} />
                </div>
            </BrowserRouter>
        </div>
    );
};
export default App;
```
#### Path Matching
- Path matching is based on `currentPath.contains(pathInRoute)` string matching. 
    - e.g. For URL "foo.com/page/5", The current path is "/page/5".  The matching would be `"/page/5".contains("/")  => yes`
- The `exact` property in the `Route` component modifies the matching behaviour to exact matching.

#### Intentional Navigation in react-router
__i.e. when the user clicks a button__

- We DON'T want to do a full page refresh to navigate, since it will trigger a __full reload__ of all the JS.
    - All React/Redux state data gets lost on a full-page reload.
- We make use of the `Link` component provided by 'react-router-dom'.
    - Link still renders an `<a>` but prevents default, changes the URL in the browser and 
    updates the `History` inside the `BrowserRouter`, triggering component re-rendering.
    - `Link` may be used inside any of the [router types](#types-of-routers), but it MUST be used inside a router.
    (i.e. it cannot be used in a component that is not nested inside a router).
```jsx harmony
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const PageOne = () => {
    return (
        <div>
            PageOne
            <Link to="/pagetwo">Navigate to Page Two</Link>
        </div>
    );
};

const PageTwo = () => {
    return (
        <div>
            PageTwo
            <Link to="/">Navigate to Page One</Link>
        </div>
    );
};

const App = () => {
    return(
        <div>
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={PageOne}/>
                    <Route path="/pagetwo" component={PageTwo} />
                </div>
            </BrowserRouter>
        </div>
    );
};
```
#### Programmatic Navigation
Programmatic navigation is done through the `history` object.  If we change the url in the `history` object,
the app will navigate.

Given that the `history` object is automatically created by the all [types of routers](#types-of-routers), except
the plain `Router`, it can by tricky to get a handle to the `history` object within our code.

##### Approach 1: getting a handle on `history` through the props
Every object that is rendered within a router, automatically gets the `history` object inside the 
 props (`this.props.history`). With that, we just need to do `this.props.history.push('/some/path')` to do programmatic 
 navigation.
 
__Caveats__: when submitting forms, we typically want to navigate the user AFTER the async request has succeeded,
NOT after the user pushes the submit button.  For this reason, we need to use __approach 2__.
```jsx harmony
class StreamCreate extends React.Component {
    // ...
    onSubmit = (formValues) => {
        this.props.createStream(formValues);
        // Navigation after submit: this.props.history.push('/streams');
        // This is a problem because the user async request might fail and we will be navigating the user
        // before the async request resolves. The action creator is a better place to do this.
    };
}
```

##### Approach 2: creating our own `history` object to get an easy handle to it everywhere
We can create our own `history` object and inject it to plain `Router` to emmulate what the `BrowserRouter` component
would do, but getting a handle to `history`.

Creating our own history object:
```jsx harmony
// src/history.js
import { createBrowserHistory } from 'history';
export default createBrowserHistory(); //Auto installed by react-router-dom
```

Using a plain `Router` with our `history` object:
```jsx harmony
// src/components/App.js
import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from "../history";

const App = () => {
    return(
        <div className="ui container">
            {/* Inject our history into a plain router */}
            <Router history={history}>
                <div>
                    <Route path="/streams/new" exact component={StreamCreate}/>
                    <Route path="/streams/edit" exact component={StreamEdit}/>
                    {/* ... */}
                </div>
            </Router>
        </div>
    );
};
```

Getting a handle of our `history` object to navigate programmatically from within an action creator:
```jsx harmony
// src/actions/index.js
import history from "../history";

export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const response = await streams.post('/streams', {...formValues, userId });
        dispatch({type: CREATE_STREAM, payload: response.data});
        // Programmatic Navigation after the async request has finished and the action has been dispatched
        history.push('/');
    };
};
```

#### Types of router in react-router-dom
There are 3 types of router in react-router-dom. They exist to cater for different configurations of how the backend
server serves the React application bundle.js.  Here is an illustration of the problem:
 
![Why we need different types of routers](./diagrams/react-router-router-types-problem-setup.svg)

##### Types of routers
- `HashRouter`: the client manages it's URLs by appending a  # `example.com/#/foo`. In this format, the 
full page reloads always point to the root so the backend needs to be configured to return the SPA from the index.
- `MemoryRouter`: keeps state internally and does not modify the URL.  If the user refreshes, the react app goes back to the root.

#### Wildcard URL matching
We can use `react-router` to support urls like `/streams/edit/:id` and pass the information of the wildcard 
(`id` in this case) down to the component as a prop. To do that, we need to wire some things:

Configure the `Route` to support the wildcard parameter: 
```jsx harmony
// src/components/App.js
const App = () => {
    return(
        <div className="ui container">
            <Router history={history}>
                <div>
                    { /* :id indicates a URL param passed using the key id: */}
                    <Route path="/streams/edit/:id" exact component={StreamEdit}/>
                    { /* ... */}
                </div>
            </Router>
        </div>
    );
};
```

Use the wildcard parameter inside the corresponding component (`StreamEdit` in this example).  
- The `Router` automatically passes the `this.props.match` object to all elements rendered by it.
  - `this.props.match.params` contains an object with all the wildcard matches.
-  IMPORTANT: Each component than can be accessed through wildcard matching MUST be designed to work in isolation 
(i.e. it needs to fetch its own data).
  - It cannot assume that the data it needs to function is magically there in the redux store.

```jsx harmony
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from "../../actions";

class StreamEdit extends React.Component {
    componentDidMount() {
        // IMPORTANT: components that rely on wildcard navigation must be self-sufficient and
        // fetch the data that they need.  We cannot rely on the data being present on the redux store.
        const urlId = this.props.match.params.id;
        this.props.fetchStream(urlId);
    }

    render(){
        // On the first render, props.streams is undefined because things have not been loaded yet.
        if (!this.props.stream) {
            return <div>Loading...</div>;
        }
        return (<div>{this.props.stream.title}</div>);
    }
}

const mapStateToProps = (state, ownProps) => {
    // The Router in React-Router-Dom injects a match object as props that contains the wildcard matches
    // as params.
    const urlId = ownProps.match.params.id;
    return{
        stream: state.streams[urlId]
    };
};

export default connect(mapStateToProps, {fetchStream})(StreamEdit);
```
Link to routes that have wildcard matching:
```jsx harmony
import { Link } from 'react-router-dom';
// ...
<Link to={`/streams/edit/${stream.id}`}>Edit</Link>
```

#### Wildcard URL matching pitfalls and `Switch`
Vanilla wildcard URL matching can introduce false positive matching.
```jsx harmony
<Route path="/streams/new" exact component={StreamCreate}/>
<Route path="/streams/:id" exact component={StreamShow}/>
{/* ... */}
``` 
In the above example, when the user visits the url `streams/new`, BOTH routes will get matched with `id = new` in the
second one.

To limit the matching of a route to the first match, we use the `Switch` component.
```jsx harmony
import { Router, Route, Switch } from 'react-router-dom';
<Switch>
    {/* ... */}
    <Route path="/streams/new" exact component={StreamCreate}/>
    <Route path="/streams/:id" exact component={StreamShow}/>
    {/* ... */}
</Switch>
```
