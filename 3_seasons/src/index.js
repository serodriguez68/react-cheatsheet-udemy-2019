import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner,";

class App extends React.Component {
    // We use shorthand property initialization to initialize the state of the component.
    state = { lat: null, errorMessage: '' };

    componentDidMount() {
        // Gets 2 function callbacks: On success, On failure
        window.navigator.geolocation.getCurrentPosition(
            // We use setState, NOT this.state.lat = ....
            (position) => this.setState({ lat: position.coords.latitude}),
            (err) => this.setState({errorMessage: err.message})
        );
    }

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

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);