## Basic React Concepts
##### What is the difference between React and ReactDOM?
React is a library that contains how al components work.
ReactDOM is a library that deals with putting those components on the DOM.  If we were using React Native, then there would be a library to render the components inside the app.

##### What is a React Component?
![What is a react component](./diagrams/what_is_a_component.png)

##### Functional Components vs Class Based Components.
- _Use Functional Components_ for very simple content (e.g. only render HTML using some props passed to it).
- _Use Class Components_ for everything else (e.g. complex logic, handling any user interaction).
![Benefits of Class Components](./diagrams/class-components-benefits.png)

##### What are Props in react and why do they exist?
![The Props System](./diagrams/props-system.png)
Customization can be either to:
1) Customize how a component looks.
2) Customize how a user interacts with it.

Children cannot pass props to the parent (only parent to child). 

## Working on React Projects
##### Tooling: How do I start a new react project?
You can use the `create-react-app` command line tool.  You install it using `npm install -g create-react-app`.

##### What is the basic structure of a React project?
- src: where all the code goes (js and css).
    - There is a special file `index.js` which is the "root" of your react application.
- public: where static HTML and assets go.
- node_modules: all of the dependencies of the project (we never want to manually go inside it).
- package.json: analogous to the gemfile

##### How do I start the development server? 
`npm start`

##### Naming Conventions
- React component files are named using CamelCase. For example `CommentDetails.js` for the `CommentDetail` component. 

## Working with JSX
##### Differences between HTML and JSX
1. Custom inline styling
```html
<!-- HTML -->
<div style="background-color: red;"></div>
```
```jsx
// JSX - Note: 1) JS object for properties, 2) CamelCase for dashed properties.
// Outer curly braces represent JS interpolation, Inner {} represent a JS object
<div style={{backgroundColor: 'red'}}></div>
```

2. The HTML class in a tag `<label class="foo">...` turns into `<label className="foo">...`

3. Referencing JS variables in JSX
```jsx
const App = () => {
	const buttonText = 'Click Me!';
	return (
		<button>{buttonText}</button>
	);
}
```
We can use `{}`to interpolate any JS within JSX. The only limitation is: we __cannot__ use a JS object to print it out as text. For example, the next snippet will result in a _"Objects are not valid as a react child"_ error.
```jsx
// Wrong
const App = () => {
	const buttonText = {text: 'Click Me'};
	return (
		<button>{buttonText}</button>
	);
}

// Right
const App = () => {
	const buttonText = {text: 'Click Me'};
	return (
		<button>{buttonText.text}</button>
	);
}
```

4. There are other differences in property names like `<label for="foo">...` turns into `<label htmlFor="foo">`.  Many of these won't crash your app. As a general rule, if you see a _did you mean X_ warning message in the browser console, it is because you are using an invalid property name from React's point of view. 


## Working with React
##### Exporting and importing components
![Exporting and importing components](./diagrams/exporting-and-importing-components.png)

##### Passing and Receiving Props
Props can only be passed from the parent to a child (not the other way around).
```jsx harmony
// Passing: Just like custom HTML attributes
const App = () => {
    return (
        <div className="ui container comments">
            <CommentDetail author='Sam'  body='This is comment 1'  avatarUrl={faker.image.avatar()}/>
        </div>
    );
};
```

```jsx harmony
// Receiving props in functional components: passed as an object as the first argument.
const CommentDetail = (props) => {
    return (
        <div className="comment">
            <a className="avatar" href="/">
                <img alt="avatar" src={props.avatarUrl}/>
            </a>
            <div className="content">
                <a href="/" className="author">{props.author}</a>
                <div className="text">{props.body}</div>
            </div>
        </div>
    );
};

// Receiving props in class based component: added to a property this.props
class CommentDetail extends React.Component {
    someFunction() {
        console.log(this.props.author);
    }
}
```

##### Injecting custom children to a component
We will use the following example to illustrate:
![Injecting custom children](./diagrams/injecting-custom-children.png)
```jsx harmony
// index.js
// ApprovalCard gets injected the custom CommentDetail component
const App = () => {
    return (
        <div className="ui container comments">
            <ApprovalCard>
                <CommentDetail author='Sam' body='This is comment 1' avatarUrl={faker.image.avatar()}/>
            </ApprovalCard>
        </div>
    );
};
```

```jsx harmony
// ApprovalCard.js
// Injected children get assigned by react to props.chilren
const ApprovalCard = (props) => {
    return (
        <div className="ui card">
            <div className="content">{props.children}</div>
            {/*...*/}
        </div>
    );
};
```

##### Rules for creating Class Based components
Class based components must comply 3 rules:
1. Must be a JS Class
2. Must __extend__ React.Component
3. Must define a `render` method that returns some JSX. This method defines how the component renders itself.


##### Rules for the State System
1. Only usable with class components.

    1.1 Note: Now it can technically by used with functional components through the 'hooks' system.
2. You will confuse props with state.
3. 'State' is a JS object that contains data relevant to a singular component.
4. Updating 'state' on a component causes the component to (almost) instantly re-render. Re-rendering also triggers the re-rendering of ALL CHILD components.
5. State must be initialized when a component is created. This can be done in 2 equivalent ways (They are equivalent
once Babel transpiles the code.) 
```jsx harmony
// Option 1: Explicitly initialize inside the constructor method
class App extends React.Component {
    // The constructor takes props as an argument
    constructor(props) {
        super(props); // We always have to call super inside the constructor
        // This is the ONLY time we directly assign this.state (for any other time use setState)
        this.state = { lat: null };
    }
    // ...
}

// Option 2: Use shorthand class property initialization
class App extends React.Component {
     state = { lat: null };
    // ...
}
```

6. State can __only__ be updated using the function `setState`.
```jsx harmony
class App extends React.Component {
    myFunction() {
        myAsyncFunction(
            // On Success
            (myArg) => {
                // We use setState, NOT this.state.lat = ....
                this.setState({ lat: myArg})
            },
            // On Failure
            (err) => console.log(err)
        );
    }
}
```

##### Anti-Pattern: Place API calls or heavy logic inside the `render` method
The `render` method is called by React VERY frequently.  If we put any API calls or heavy logic inside it, we might
be doing unnecessary extra work.

##### Handling Errors Gracefully
Using a `errorMessage` property inside the component's state is a simple and nice way to handle errors.  For this
we also need to define how the component renders when the `errorMessage` property is present. Here is a simple example
(note there are more elegant ways to do the conditional rendering):
```jsx harmony
class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { lat: null, errorMessage: '' };
    }
    // ...
    render() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }
        if (!this.state.errorMessage && this.state.lat) {
            return <div>Latitude: {this.state.lat}</div>
        }
        return <div>Loading...</div>
    }
}
```

##### Class Components'Lifecycle methods
![Component Lifecycle methods](./diagrams/component_lifecycle_methods.svg)
- `constructor`: when the component is instantiated.
- `render`: compulsory to define it.
- `componentDidMount`: called ONE time when the component first shows on the screen.
- Updates are caused by changes in state through the `setState` method.
- `componentDidUpdate`: called every time the component gets updated.  It is called AFTER `render` when the state changes.  
- `componentWillUnmount`: called when the component is going to be removed from the screen. Typically used for cleanup.

##### Pattern: Use configuration objects for conditional rendering
When we need to get some text, class names (etc) based on a condition, configuration objects are a better alternative
than `if..else` statements.  See example:
```jsx harmony
//  This is the configuration object
const seasonConfig = {
    summer: {
        text: 'Let\'s hit the Beach',
        iconName: 'sun'
    },
    winter: {
        text: 'Burr, it is chilly',
        iconName: 'snowflake'
    }
};
// ...
const SeasonDisplay = (props) => {
    const season = getSeason(props.lat, new Date().getMonth()); // returns either 'summer' or 'winter'
    const {text, iconName} = seasonConfig[season]; // Destructurizing a JS object
    return (
        <div>
            <i className={`icon ${iconName}`} />
            <h1>{text}</h1>
            <i className={`icon ${iconName}`} />
        </div>
    );
};
```

##### Pattern: Creating Component-Specific CSS
A common pattern is to create a dedicated stylesheet for each component which is in charge of defining the styles 
of the component.  For example, for the `SeasonDisplay.js`, we create a `SeasonDisplay.css`.

Inside the `SeasonDisplay.js` we:
- `import SeasonDisplay.css` and Babel will make that the stylesheet gets correctly imported in the HTML.
- Add a matching `season-display` class to the root of the returned JSX so that we can specifically target elements
inside that component.

Example:
```jsx harmony
// SeasonDisplay.js
import './SeasonDisplay.css';

const SeasonDisplay = (props) => {
    // ...
    return (
        // Note the season-display class
        <div className={`season-display ${season}`}>
            {/* ... */}
        </div>
    );
};
```

```css
.season-display {
    display: flex;
    justify-content: center;
}

.season-display.winter i {
    color: blue;
}

.season-display.summer i {
    color: red;
}
```
##### Default props
Default props are used when we want a component to have a props with a default value in case the parent component
does not specify a particular prop.
```jsx harmony
const Spinner = (props) => {
    return(
        <div className="ui active dimmer">
            <div className="ui big text loader">{props.message}</div>
        </div>
    );
};

// Default Props is a JS object in the main body of the Spinner.js file
Spinner.defaultProps = {
    message: 'Loading...'
};
```

##### Pattern: Clean Conditional Rendering Through Helper Methods
As a general rule, we want to avoid having more than ONE return in the `render` method or having any heavy logic in it.
To avoid this, we can create custom _helper methods_ that abstract better the conditional logic.
```jsx harmony
class App extends React.Component {
    //...
    // This is a helper method that unloads the conditional logic from the render method
    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>;
        }
        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }
        return <Spinner message = 'Determining your Location...'/>;
    }

    render() {
        return (
            <div className="some-class-that-is-always-needed">
                {this.renderContent()}
            </div>
        );
    }
}
```
##### Handling User Interaction With Event Handlers
We can detect user interaction through special props like `onChange`.  It is our job
to define a **callback function** that will handle the event with any custom logic we need.

The most used special properties are:
- `onClick`: any HTML element can be wired up with `onClick`.
- `onChange`: triggered when a user changes an input.  Only input fields trigger `onChange`.
- `onSubmit`: only forms trigger `onSubmit`.

Here is an example for handling `onChange` on a Search Bar.
```jsx harmony
class SearchBar extends React.Component {
    // Used as a callback function to handle the change
    // "event" is passed by default to all event handlers
    onInputChange(event) {
        // Whatever logic I need
        console.log(event.target.value);
    }

    render() {
        return (
            <form>
                <label>Image Search</label>
                {/* onChange is a special property name that gets triggered when the input changes. */}
                {/* We provide the callback function to handle the change */}
                {/* Note that this example shows an uncontrolled element for simplicity. We prefer controlled elements */}
                <input type="text" onChange={this.onInputChange}/>
                
                {/* An alternative frequently used syntax is using arrow functions when the handlers are small */}
                <input type="text" onChange={ (e) => console.log(e.target.value) }/>
            </form>
        );
    }
}
```
##### Controlled vs Uncontrolled Elements
Depending on how we wire up them, HTML input elements can be classified as **controlled** or **uncontrolled**.

Uncontrolled elements are elements in which the "truth" of the data is sitting inside the HTML. In the following 
example, if we wanted to find the text in the input field from an arbitrary point in the component (e.g. from 
`componentDidUpdate`), we have no choice but to reach out to the HTML input element and read the value.

```jsx harmony
class SearchBar extends React.Component {
    onInputChange(event) { /* Whatever logic I need  */ }
    
    componentDidUpdate() {
        // To find out the search term, we have no option but to reach out to the HTML input.
    } 

    render() {
        return (
            <form>
                <label>Image Search</label>
                <input type="text" onChange={this.onInputChange}/>
            </form>
        );
    }
}
```

If we wire things differently we can make sure that the JS Component contains all the data and drives the HTML
(not the other way around).  __We always prefer controlled elements__. 
```jsx harmony
class SearchBar extends React.Component {
    // We use component state to store the search term.  In this way, we can reach for the state
    // at any arbitrary point to figure out the term.
    state = { term: ''};

    render() {
        return (
            <form className="ui form">
                <label>Image Search</label>
                {/* We fix (control) the value of the input through the state to make sure that */}
                {/* react DRIVES the HTML and not the other way around */}
                <input
                    type="text"
                    value={this.state.term}
                    onChange={ (e) => this.setState({term: e.target.value}) } />
            </form>
        );
    }
}
```

##### Common Error: TypeError: Cannot read property 'state' of undefined / How `this` works in Javascript

Note: this is a complex issue, to get a full understanding of the problem, re-watch videos __"84. Understanding 'this'
in Javascript"__ and __"85. Solving Context Issues"__ from Stephen Grider's Udemy course. 

The error is caused by how the context system works in JS (i.e. what value is assigned to `this` at runtime).

The next code exemplifies the problem:
```jsx harmony
class SearchBar extends React.Component {
    state = { term: ''};

    render() {
        return (
            /* Here we 'rip out' onFormSubmit from the SearchBar instance and give it to `onSubmit` */
            <form className="ui form" onSubmit={ this.onFormSubmit }>
                    <label>Image Search</label>
                    <input
                        type="text"
                        value={this.state.term}
                        onChange={ (e) => this.setState({term: e.target.value}) } />
            </form>
        );
    }
    
    onFormSubmit(event) {
            event.preventDefault();
            // Here `this` causes the problem because the function is called outside the scope of the
            // SearchBar instance.  In that context `this = undefined`.
            console.log(this.state.term);
        }
}
``` 
_Rule of thumb: the value of `this` inside a JS function_

`this` inside a function takes the value of the instance on which the function is being called
(i.e. what is left of the dot). For example, given an arbitrary function `myFun` that contains `this` inside it.
```js
myCar.myFun(); // `this` refers to the myCar instance
myTruck.myFun(); // `this` refers to the myTruck instance
myFun2 = myCar.myFun; // Rip out myFun and assign it to myFun2.
myFun2(); //`this` refers to `undefined` since myFun2 is not being called on any instance.
```  

_Solutions to the `this` context problem_
There are many solutions to this problem, we name the most popular.


- Solution 1: Fix the value of `this` inside the problematic function by binding it inside the `constructor`
```js
class SearchBar extends React.Component {
    state = { term: ''};
    
    constructor(props) {
        super(props);
        // Bind returns a new version of the function with the `this` keyword fixed to the current SearchBar instance.
        this.onFormSubmit = this.onFormSubmit.bind(this);
   }

    render() {
        return (
            <form className="ui form" onSubmit={ this.onFormSubmit }>
                    <label>Image Search</label>
                    <input
                        type="text"
                        value={this.state.term}
                        onChange={ (e) => this.setState({term: e.target.value}) } />
            </form>
        );
    }
    
    onFormSubmit(event) {
            event.preventDefault();
            // Once binded, `this` will always refer to the SearchBar instance 
            // (i.e. it is no longer context dependent).
            console.log(this.state.term);
        }
}
```

- Solution 2: Use ES6 arrow functions to declare instance methods. 
Arrow functions automatically bind the value of `this`. This is the most common method.
```jsx harmony
class SearchBar extends React.Component {
    state = { term: ''};

    render() {
        return (
            <form className="ui form" onSubmit={ this.onFormSubmit }>
                    <label>Image Search</label>
                    <input
                        type="text"
                        value={this.state.term}
                        onChange={ (e) => this.setState({term: e.target.value}) } />
            </form>
        );
    }
    
    onFormSubmit = (event) => {
        event.preventDefault();
        // Here `this` would cause the problem.  However, arrow functions automatically bind this to the instance.
        console.log(this.state.term);
    };
}
```

- Solution 3: Wrap callback inside an arrow function (that automatically binds `this`).
```jsx harmony
class SearchBar extends React.Component {
    state = { term: ''};

    render() {
        return (
            // Wrapping the callback with an arrow function automatically binds `this`
            <form className="ui form" onSubmit={ (e) => this.onFormSubmit(e) }>
                    <label>Image Search</label>
                    <input
                        type="text"
                        value={this.state.term}
                        onChange={ (e) => this.setState({term: e.target.value}) } />
            </form>
        );
    }
    
    onFormSubmit(event) {
            event.preventDefault();
            console.log(this.state.term);
        }
}
```

##### Communicating from Child to Parent through callbacks
By design, React only allows data to be pushed DOWN from parents to children through the props system.  If we want to communicate from a child to a parent, the parent needs to provide a callback function and the child will hold it as a prop to use it when necessary.

![Children to parent communication](./diagrams/children_to_parent_communication.svg)

```jsx harmony
// Parent
class App extends React.Component {
    
    // The callback function for communication
    onSearchSubmit = (term) => {
        console.log(`From app: ${term}`);
    };

    render() {
        return  (
            <div className="ui container" style={{marginTop: '10px'}}>
	        {/* Pass down callback function as prop */}
                <SearchBar onSearchSubmit={this.onSearchSubmit}/>
            </div>
        );
    }
}

// Child
class SearchBar extends React.Component {
    state = { term: ''};

    onFormSubmit = (event) => {
        event.preventDefault();
        // Use Callback function to notify parent
        this.props.onSearchSubmit(this.state.term);
    };
}
```

### Making API requests with react
React itself does NOT do network requests.  For this we need to use an external library like `axios` or
the built-in function `fetch`.

#### Axios vs Fetch
- `fetch` is a built-in function to do network requests that does not add any overhead. However, it is very basic
and requires coding some boilerplate code.
- `axios` is a higher level 3rd party library that handles requests in a very predictable way.  Axios is recommended
to perform the API requests on react apps.
    - `npm install --save axios`  
    
#### Working with JS Promises
A promise is an object that represents the eventual completion or failure of an asynchronous operation.  Promises are
frequently used in JS for network requests and it is up to the developers to code what should happen when the
promise succeeds or fails.

In the context of API requests, there are 2 options for handling promises: 1) `promise.then`, 2) `async`, `await`

Note: more information can be found on video _"92. Handling Requests with Async Await"_ from Stephen Grider's course.

##### Option 1: Using `promise.then()`
The `then` method allows us to give the promise a callback to execute once the promise succeeds.
```jsx harmony
class App extends React.Component {

    // Callback for making a network request when the search term changes.
    onSearchSubmit = (term) => {
        axios.get('https://api.unsplash.com/search/photos', {
            params: { query: term},
            headers: {
                Authorization: 'Client-ID someRandomToken'
            }
        }).then((response)=>{
            // axios.get is async and returns a promise, so deal with it with `then` callback
            console.log(response.data.results);
            // Do whatever you need to do...
        })
    };

    render() { /*...*/ }
}
```

##### Option 2: Using `async` and `await`
This is a newer syntax that allows us to write simpler and cleaner code.
```jsx harmony
class App extends React.Component {

    // Callback for making a network request when the search term changes.
    // The network request is asynchronous, so we tag our function as `async` and
    // `await` to allow the promise to resolve
     onSearchSubmit = async (term) => {
         // axios.get is async and returns a promise, so we need to deal with the promise.
         const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: { query: term},
            headers: {
                Authorization: 'Client-ID someRandomToken'
            }
        });
        this.setState({images: response.data.results});
    };

    render() { /*...*/ }
}
```
#### Creating Custom API Clients with axios
With axios, we can create a dedicated client that is configured to make requests with whatever configuration we 
set it up. This allows us to extract all the configuration, and authentication logic for a particular service
into a dedicated file.

For example, for communicating with the unsplash API we could:
```jsx harmony
// 1. Create a file in src/api/unsplash.js that will hold the dedicated unsplash client
import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID someRandomToken'
    }
});

// 2. Then we only use this pre-configured client in all other places we need to communicate with unsplash
import unsplash from "../api/unsplash";

class App extends React.Component {
    onSearchSubmit = async (term) => {
        // Here we use the pre-configured unsplash client
        const response = await unsplash.get('/search/photos', {
            params: { query: term},
        });
        // ...
    };
}
```
### Rendering a List of Components
Rendering lists of information is very common in any application. The most common way of doing it is using
the JS `map` function over an array of elements that contain the data of what we want to display.  For example:
```jsx harmony
const ImageList = (props) => {
    // In this example props.images = [
    //                                   {id: ..., url: ..., description: ...},
    //                                   {id: ..., url: ..., description: ...}
    //                                ]

    // The arrow function inside the map is making use of destructuring assignment of each image object.
    // That is equivalent to (image) => {... image.id   .... image.urls.regular ...}
    const images = props.images.map(({id, urls, description}) => {
        return <img key={id} src={urls.regular} alt={description} />;
    });
    return <div>{images}</div>;
};
```
__Warning:__"Each child in array or iterator should have a unique `key` prop". This is a warning given by react
if we omit the 'key' prop on each element of the list. 
- The `key` prop helps react figure out which changes need to be done on the DOM.
- Giving a key increases the performance of the front-end, but it is solely a performance consideration.
- The `key` only needs to be assigned to the outer-most / root HTML tag of each of the elements in the list.
- Only collections require the `key` prop. 

### The React Reference System
- Refs give access to a single DOM element.
- We create refs in the constructor, store them in an instance variables and assign them to a particular
jsx as props.
    - Theoretically, we could save a ref to the state, but that is not necessary because refs don't change.
    - Only things that change should be stored in `state`.
- `this.myRef.current` is a handle to the HTML element that was rendered in the DOM.
```jsx harmony
class ImageCard extends React.Component {

    // 1. Refs need to be created in the constructor
    constructor(props) {
        super(props);
        // 2. Create a ref and store it in the `imageRef` instance variable
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        // 4. Use ref to access the DOM element
        console.log(this.imageRef.current);
    }

    render () {
        const { description, urls } = this.props.image;
        return (
            <div>
                {/* 3. Assign  ref to jsx element */}
                <img ref={this.imageRef}
                     src={urls.regular}
                     alt={description} />
            </div>
        )
    }
}
```

### Manipulation of CSS through React
If we want our React app to change some styling, we need to do it as __inline styles__ in the JSX elements. 
For example: 
```jsx harmony
class ImageCard extends React.Component {    
    // ...

    render () {
       // ...
        return (
            // Add CSS inline through React
            <div style={{gridRowEnd: `span ${this.state.spans}`}}>
                <img ref={this.imageRef}
                     src={urls.regular}
                     alt={description} />
            </div>
        )
    }
}
```

## React Fragments
By default, to return sibling elements in JSX we are forced to wrap them with a "dummy div" so that we only return one
element.

This wrapping may be unacceptable in some circumstances. For example, it might throw-off the styling of a CSS 
framework that expects a specific structure.

`React.Fragment`s allow us to use "an invisible wrapper" that does not get rendered in the DOM.

```jsx harmony
const actions = (
        <React.Fragment>
            <button className="ui button negative">Delete</button>
            <button className="ui button">Cancel</button>
        </React.Fragment>
    );
```  

## React's Hook system
See the `10_hooks_simple` and `TODO` projects for sample applications built with hooks.

### Motivation
![React's hook system motivation](./diagrams/react-hooks-motivation.svg)
- At first, it may seem that we are trying to emulate `state` and `lifecycle methods` in function components.
This is NOT the reason to use them. 
- We use them because they makes it __easy to share logic between components__.
  - They solve problems of code re-use that are hard to achieve with class based components.

### Some Available Hooks
These are some of the available hooks. The documentation contains more.
![available hooks](./diagrams/react-hooks-available-hooks.svg)

### The `useState` hook
```jsx harmony
// useState allows us to use the state system in functional components
import React, {useState} from 'react';

const App = () => {
    // useState gives us access to the current value and the setState function of an INDEPENDENT slice of state.
    // Calling the setState function causes the component to automatically re-render.
    // Explanation:   [currentStateValue, functionToUpdateState] = functionFromReact( initialStateValue )
    // Analogies  :      this.state.foo    this.setState({foo: 'bar'})               state={foo: 'baz'}
    const [resource, setResource] = useState('posts');
    // Syntax: Array destructuring [redVar, greenVar] = ['red', 'green']

    // More on INDEPENDENT slice of state:
    // We can have multiple useStates in a component, and each will deal with their own independent state
    const [count, setCount] = useState(0);

    return (
        <div>
            <div>
                <button onClick={() => setResource('posts')}>Posts</button>
                <button onClick={() => setResource('todos')}>Todos</button>
            </div>
            {resource}
        </div>
    );
};

export default App;
```
### The `useEffect` hook
```jsx harmony
// useEffect hook: allows use of 'lifecycle methods' in function-based components
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ResourceList = ({ resource }) => {
    const [resources, setResources] = useState([]);

    // A custom function we built to fetch data and update the state
    // useEffect forces us to declare a helper function for async requests to use within the effect.
    // If we don't do this, we will get a warning related to "cleanup"
    const fetchResource = async (resource) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/${resource}`);
        setResources(response.data);
    };

    // useEffect is a hook serves the function componentDidMount + componentDidUpdate combined.
    // It takes 2 arguments:
    // 1. An 'effect' function that will get called when the conditions at 2 are met.
    // 2. An array of stuff.  The effect function will get called when the stuff passed on this re-render
    //    is different from the stuff on the previous re-render.
    //    - The function always gets called on the first render (i.e. on mount)
    //    - If the second argument is an empty array [], the function only gets called "on mount".
    //    - If the second argument is not given, the function always gets called when render happens (i.e. on mount and update)
    //
    // The effect of (2) is equivalent to guarding componentDidUpdate for change on a class-based component. e.g:
    // async componentDidUpdate(prevProps) {
    //     if (!prevProps.resource !== this.props.resource) {
    //         const response = await axios.get(`https://jsonplaceholder.typicode.com/${resource}`);
    //         this.setState({resources: response.data});
    //     }
    // }
    useEffect(
        () => {fetchResource(resource)},
        [resource]
    );

    return  <div>{resources.length}</div>;
};

export default ResourceList;
```

### Code re-use with custom Hooks
This section illustrates code re-use with some examples. Custom hooks allow us to encapsulate business logic outside
view logic and re-use it whenever needed.

#### Example 1: The `useLocation` custom Hook 
This example illustrates a simple custom hook that follows community convention .
##### The Custom Hook
```jsx harmony
import {useState, useEffect} from 'react';

// Gets the user's latitude from the browser's geolocation and
// returns the latitude and an errorMessage
const useLocation =  () => {
    // Internally uses 2 independent pieces of state
    const [lat, setLat] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const getUserLocation = () => {
        // Gets 2 function callbacks: On success, On failure
        window.navigator.geolocation.getCurrentPosition(
            (position) => setLat(position.coords.latitude),
            (err) => setErrorMessage(err.message)
        );
    };

    useEffect(() => getUserLocation(), []);
    // It is community convention that hooks return values in array format
    return [lat, errorMessage];
};

export default useLocation;
```
##### Using the custom hook
```jsx harmony
import React from 'react';
import useLocation from "./useLocation";
// ...

const App = () =>  {
    // We use the custom hook as if it where any other hook (follows community convention).
    const [lat, errorMessage] = useLocation();
    let content;
    if (errorMessage) {
        content =  <div>Error: {errorMessage}</div>;
    } else if (!errorMessage && lat) {
        content =  <SeasonDisplay lat={lat} />
    } else {
        content =  <Spinner message = 'Determining your Location...'/>;
    }
    return <div className="some-class-that-is-always-needed">{content}</div>;
};
```

#### Example 2: The `useResources` custom Hook
This example illustrates that multiple usages of the custom hook behave like independent instances (keep reading).

The `useResources` custom hook: 
- Encapsulates the logic of calling an api.
- Encapsulates the logic of when resources need to be re-fetched (using `useEffect`). 
- Separates the presentation logic form the api logic.
- Every use of `useResources` scopes down an "instance" of the `useState` and `useEffect` that is tied THAT particular
component that used it. 
  - In this example, `UserList` and `ResourceList` both have independent records of `state` and `effect`. 
  - For example, the `useEffect` inside `ResourceList`, uses the information from the previous re-rendering
  of `ResourceList` to decide if the effect should get called. 
    - As opposed to using information from the previous application-wide call to `useResources`.

##### Reusable function
```jsx harmony
import {useState, useEffect} from 'react';
import axios from 'axios';

// Code Reuse with hooks
// useResources is a utility function that gets a resource type (e.g. 'posts') and returns an array of resources.
// This function an easily be used by other components.
// This utility function holds no presentation logic, only api interaction logic.
const useResources = (resource) => {
    const [resources, setResources] = useState([]);
    const fetchResource = async (resource) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/${resource}`);
        setResources(response.data);
    };
    
    useEffect(
        () => {fetchResource(resource)},
        [resource]
    );

    return resources;
};

export default useResources;
```

##### Components using the re-usable function
```jsx harmony
import React from 'react';
import useResources from "./useResources";

const UserList = () => {
 const users = useResources('users');
 return(
   <ul>
       { users.map( user => <li key={user.id}>{user.name}</li>) }
   </ul>
 );
};

export default UserList;
```

```jsx harmony
import React from 'react';
import useResources from './useResources';

const ResourceList = ({ resource }) => {
    const resources = useResources(resource);
    return  (
        <ul>
            {resources.map((record) => <li key={record.id}>{record.title}</li>)}
        </ul>
    );
};

export default ResourceList;
```
