import React from 'react';
import ReactDOM from 'react-dom';

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

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);