import React from 'react';
import { connect } from 'react-redux';
import {selectSong} from "../actions";

class SongList extends React.Component {
    // Helper method to render list
    renderList(){
        const songs = this.props.songs;
        const renderedSongs = songs.map( song => {
            return (
                <div className='item' key={song.title}>
                    <div className="right floated content">
                        <button className="ui button primary"
                                // This is the "wrapped" action creator function mentioned below
                                onClick={() => this.props.selectSong(song)}>
                            Select
                        </button>
                    </div>
                    <div className="content">{`${song.title} - ${song.duration}`}</div>
                </div>
            );
        });
        return renderedSongs
    }

    render() {
        return <div className='ui divided list'>{this.renderList()}</div>;
    }
}

// MAIN WIRING

// This is how we configure that we want to get this connect component to be notified of changes
// on a particular piece of state from the whole redux store.
// By convention we call this function `mapStateToProps`
const mapStateToProps = (state) => {
    // This object is going to be mapped to the props inside the SongList.
    // i.e. Inside Songlist this.props === { songs: state.songs }
    return { songs: state.songs };
};

// `connect` takes 2 args:
// 1) The mapStateToProps function
// 2) An object with action creators (e.g. { selectSong:  selectSong }, abbreviated using ES6 syntax)
//    `connect` wraps all action creators in the `dispatch` function and maps this "wrapped" functions inside the
//     props. That is why we can call `this.props.selectSong()` directly without having to use `dispatch`
export default connect(mapStateToProps, {selectSong})(SongList);