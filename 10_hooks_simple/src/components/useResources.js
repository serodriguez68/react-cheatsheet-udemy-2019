// useState hook: allows use of state in function-based components. See App.js for a detailed explanation.
// useEffect hook: allows use of 'lifecycle methods' in function-based components
import {useState, useEffect} from 'react';
import axios from 'axios';


// Code Reuse with hooks
// useResources is a utility function that gets a resource type (e.g. 'posts') and returns an array of resources.
// This function an easily be used by other components.
// This utility function holds no presentation logic, only api interaction logic.
const useResources = (resource) => {
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

    return resources;
};

export default useResources;