import React from 'react';

class VideoItem extends React.Component {
    render() {
        const video = this.props.video;
        return(
            <div>
                <img src={video.snippet.thumbnails.medium.url} alt=""/>
                {video.snippet.title}
            </div>
        );
    }
}

export default VideoItem;