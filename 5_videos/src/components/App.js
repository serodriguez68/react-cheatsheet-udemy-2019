import React from 'react';
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import youtube from "../apis/youtube";

class App extends React.Component {
    state = { videos: [] };

    fetchVideos = async (term) => {
        console.log(`Fetching videos for "${term}"`);
        const response = await youtube.get('/search', {params: {q: term}});
        console.log(response.data.items);
        this.setState({videos: response.data.items});
    };

    render() {
        return (
            <div className='ui container'>
                <SearchBar onSearchSubmit={this.fetchVideos}/>
                <VideoList videos={this.state.videos}/>
            </div>
        );
    }
}

export default App;