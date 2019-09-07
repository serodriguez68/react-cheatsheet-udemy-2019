import React from 'react';
import SearchBar from "./SearchBar";
import unsplash from "../api/unsplash";

class App extends React.Component {
    state = {images: []};

    // Callback for making a network request when the search term changes.
    // The network request is asynchronous, so we tag our function as `async` and
    // `await` to allow the promise to resolve
    onSearchSubmit = async (term) => {
         // axios (unsplash) get is async and returns a promise, so we need to deal with the promise.
        const response = await unsplash.get('/search/photos', {
            params: { query: term},
        });
        this.setState({images: response.data.results});
    };

    render() {
        return  (
            <div className="ui container" style={{marginTop: '10px'}}>
                <SearchBar onSearchSubmit={this.onSearchSubmit}/>
                Found: {this.state.images.length} images
            </div>
        );
    }
}

export default App;