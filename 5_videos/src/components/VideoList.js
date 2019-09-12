import React from 'react';
import VideoItem from "./VideoItem";

// This is using object de-structuring to get the videos property out of the props object
const VideoList = ({videos}) => {
    // This returns an array of JSX React Components that we can use in any other JSX
    const renderedList = videos.map( video => {
        return <VideoItem key={video.id.videoId} video={video} />;
    });

    return (
        <div>{ renderedList }</div>
    );
};

export default VideoList;

