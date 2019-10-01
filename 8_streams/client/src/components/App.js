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