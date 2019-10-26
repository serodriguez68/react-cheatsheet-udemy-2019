import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner,";
import useLocation from "./useLocation";

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

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);