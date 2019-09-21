import React from 'react';
import { connect } from 'react-redux';

const SongDetail = ({song, noSongText}) => {
    if(song){
        return (
            <div>
                <h3>Details for:</h3>
                <p>Title: {song.title}</p>
                <p>Duration: {song.duration}</p>
            </div>
        );
    }
    return <div>{noSongText}</div>;
};

const mapStateToProps = state => {
  return {song: state.selectedSong};
};

export default connect(mapStateToProps)(SongDetail);