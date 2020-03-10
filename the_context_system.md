
## React Context
Note: the app `9_translate_context` contains the code samples for this section.

###  Motivation
- *The Props System:* communicate from parent to DIRECT child.
- *The Context System:* Pass data from a PARENT component to ANY NESTED child component. 
    - Not necessarily the direct children.
    - It is just about data communication, just like props so it is not full replacement of Redux.
    - Sometimes we just want to communicate something from the parent to a deeply nested
    child and the components in the middle don't really care about the communication.
    - Using only props, we end up using the intermediate components just to push down data, even if they don't care.
![What is the Context System?](./diagrams/react-context-system-motivation.svg)

### How does the Context System work?
The context system works as a pipeline that pushed data down from parents to children.

#### Create a dedicated context object
The first thing we want to do when working with context is to create dedicated context objects that we import inside
other files only when needed. We do so by creating a `contexts` folder and creating a `someContext.js` file per
context we are interested in.

Each context object represents a pipeline of data that is passed down from the parents to all children.

```jsx harmony
// src/contexts/LanguageContext.js
import React from 'react';
export default React.createContext();
```

#### How to get information IN and OUT of the context object in the pipeline
![ How to get information in and out of the pipe](./diagrams/react-context-how-to-use.svg)

##### There are 2 ways to get data IN.
###### Way 1. By setting a default value 
 - This is barely usable, way 2 makes much more sense.   
```jsx harmony
// src/contexts/LanguageContext.js
import React from 'react';
// createContext takes a default value.  It can be anything (e.g. an object, an array, etc...)
export default React.createContext('english');
```

###### Way 2. By using a `Provider` component withing the parent component.
- Allows us to modify the default value.
- `Provider` is a component that allows us to signal the scope of a particular INSTANCE of a context object.
  - Every time we use the `<LangContext.Provider value={...}>...</LangContext.Provider>` a new instance of 
  `LangContext` is created and used only within the scope of whatever is nested. 
  - NOT the same `provider` than the one from `react-redux`.
```jsx harmony
import React from 'react';
import UserCreate from "./UserCreate";
import LanguageContext from "../contexts/LanguageContext";

class App extends React.Component {
    state = { language: 'english' };

    onLanguageChange = (newLanguage) => {
        this.setState({language: newLanguage});
    };

    render() {
        return (
            <div className="ui container">
                <div>
                    Select a Language:&nbsp;
                    <i className="flag us" onClick={() => this.onLanguageChange('english') }/>
                    <i className="flag nl" onClick={() =>  this.onLanguageChange('dutch') } />
                </div>
                {/* - With the LanguageContext.Provider component we create an instance of the LangContext */}
                {/*   - That instance is scoped to the all children nested within */}
                {/* - With the value property, we can modify the value of the context. We can use anything for the value. */}
                <LanguageContext.Provider value={this.state.language} >
                    <UserCreate/>
                </LanguageContext.Provider>

                {/* This is ANOTHER INSTANCE of LanguageContext that is completely independent from the one above */}
                <LanguageContext.Provider value={'english'} >
                    <UserCreate/>
                </LanguageContext.Provider>
            </div>
        );
    }
}

export default App;
```


##### There are 2 ways to get data OUT

###### Way 1: By using `this.context`
```jsx harmony
import React from 'react';
import LanguageContext from "../contexts/LanguageContext";

class Button extends React.Component {
    // Connect the Language Context to the Component
    // contextType is a special property for React.
    static contextType = LanguageContext;

    render() {
        // this.context is used to get the data in the contexts
        const text = this.context === 'english' ? 'Submit' : 'Voorleggen';
        return(
            <button className="ui button primary">{text}</button>
        );
    }
}

export default Button;
```

###### Way 2: By creating a `Consumer` component
- The `Consumer` component is automatically created within the `context` object.
- We use the `Consumer` whenever we want to use the value inside the context.

```jsx harmony
import React from 'react';
import LanguageContext from "../contexts/LanguageContext";

class Button extends React.Component {
    render() {
        return(
            <button className="ui button primary">
                <LanguageContext.Consumer>
                    {/* We always need to provide a function as a child to the Consumer */}
                    {/* The function is called with the context value as an argument and we */}
                    {/* can put any logic we want within the function (including returning other components) */}
                    {(value) => value === 'english' ? 'Submit' : 'Voorleggen'}
                </LanguageContext.Consumer>
            </button>
        );
    }
}
export default Button;
```

###### When to use a `Consumer` instead of `this.context`
- We need to use `Consumer` when we need to access data out of MULTIPLE context objects within a single component.
    - The `this.context` approach only allows for one context per object to be used.

```jsx harmony
import React from 'react';
import LanguageContext from "../contexts/LanguageContext";
import ColorContext from "../contexts/ColorContext";

class Button extends React.Component {

    renderButton(color){
        return(
            <button className={`ui button ${color}`}>
                <LanguageContext.Consumer>
                    {(value) => value === 'english' ? 'Submit' : 'Voorleggen'}
                </LanguageContext.Consumer>
            </button>
        );
    }

    render() {
        return(
            // To read from multiple contexts we nest Consumer components.
            // The same rule of having a consumer return a function applies.
            // In this case we use a helper function to organize the code
            <ColorContext.Consumer>
                { (color) => this.renderButton(color) }
            </ColorContext.Consumer>
        );
    }
}

export default Button;
``` 

```jsx harmony
import React from 'react';
import UserCreate from "./UserCreate";
import LanguageContext from "../contexts/LanguageContext";
import ColorContext from "../contexts/ColorContext";

class App extends React.Component {
    state = { language: 'english', color: 'red' };
    //...
    render() {
        return (
            <div className="ui container">
                {/* To pass in multiple contexts, we just nest providers. */}
                {/* Order does not matter in this case */}
                <LanguageContext.Provider value={this.state.language} >
                    <ColorContext.Provider value={this.state.color}>
                        <UserCreate/>
                    </ColorContext.Provider>
                </LanguageContext.Provider>
            </div>
        );
    }
}

export default App;
```
###  Does Context replace Redux?
Not really, vanilla Context only provides ONE of the many other things that redux provides.
 - Redux 
  - Features: 
    - Distributes data to various components
    - Centralizes data in a store
    - Provides a mechanism for changing data in the store
  - Pros: 
      - Excellent documentation
      - Well-known design patterns
      - Tremendous amount of open source libraries
- Context:
  - Features:
    - Distribute data to various components
  - Pros:
    - No extra libraries
  - Cons:
    - Hard to build 'store' components that need to reach into other 'store' components 
- Stephen Grider does NOT personally recommend replacing `redux` with context.
 
If you want to know how to replace `redux` with `Context`, watch the "Replacing Redux with Context" section in
Udemy. 
   - There is a fair amount of work involved in doing this properly. 



