// useState allows us to use the state system in functional components
import React, {useState} from 'react';
import ResourceList from "./ResourceList";
import UserList from "./UserList";

const App = () => {
    // useState gives us access to the current value and the setState function of an INDEPENDENT slice of state.
    // Calling the setState function causes the component to automatically re-render.
    // Explanation:   [currentStateValue, functionToUpdateState] = functionFromReact( initialStateValue )
    // Analogies  :      this.state.foo    this.setState({foo: 'bar'})               state={foo: 'baz'}
    const [resource, setResource] = useState('posts');
    // Syntax: Array destructuring [redVar, greenVar] = ['red', 'green']

    // More on INDEPENDENT slice of state:
    // We can have multiple useStates in a component, and each will deal with their own independent state
    // const [count, setCount] = useState(0);

    return (
        <div>
            <UserList/>
            <div>
                <button onClick={() => setResource('posts')}>Posts</button>
                <button onClick={() => setResource('todos')}>Todos</button>
            </div>
            <ResourceList resource={resource}/>
        </div>
    );
};

export default App;