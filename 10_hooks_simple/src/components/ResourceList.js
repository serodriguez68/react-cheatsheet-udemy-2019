// useState hook: allows use of state in function-based components. See App.js for a detailed explanation.
// useEffect hook: allows use of 'lifecycle methods' in function-based components
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ResourceList = ({ resource }) => {
    const [resources, setResources] = useState([]);

    // A custom function we built to fetch data and update the state
    const fetchResource = async (resource) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/${resource}`);
        setResources(response.data);
    };

    // useEffect is a hook serves the function componentDidMount + componentDidUpdate combined (wrt a class component).
    // It takes 2 arguments:
    // 1. An 'effect' function that will get called when the conditions at 2 are met.
    // 2. An array of stuff.  The effect function will get called when the stuff passed on this re-render
    //    is different from the stuff on the previous re-render (including the first render)
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