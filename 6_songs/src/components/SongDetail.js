import React from 'react';
import { connect } from 'react-redux';

const SongDetail = (props) => {
    if(props.selectedSong){
        return (
            <div>
                <div>{props.selectedSong.title}</div>
                <div>{props.selectedSong.duration}</div>
            </div>
        );
    }
    return <div>Please select a song</div>;
};

const mapStateToProps = state => {
  return {selectedSong: state.selectedSong};
};

export default connect(mapStateToProps)(SongDetail);