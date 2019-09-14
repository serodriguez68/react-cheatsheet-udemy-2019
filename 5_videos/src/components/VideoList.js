import React from 'react';
import VideoItem from "./VideoItem";

// This is using object de-structuring to get the videos and onVideoSelect property out of the props object
const VideoList = ({ videos, onVideoSelect }) => {
    // This returns an array of JSX React Components that we can use in any other JSX
    const renderedList = videos.map( video => {
        return <VideoItem key={video.id.videoId} video={video} onVideoSelect={onVideoSelect}/>;
    });

    return (
        <div className='ui relaxed divided list'>{ renderedList }</div>
    );
};

export default VideoList;

