import React from 'react';
import flv from 'flv.js';
import {connect} from 'react-redux';
import {fetchStream} from "../../actions";


class StreamShow extends React.Component{

    constructor(props) {
        super(props);
        // Create a ref that points to the video element
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        // IMPORTANT: components that rely on wildcard navigation must be self-sufficient and
        // fetch the data that they need.  We cannot rely on the data being present on the redux store.
        const urlId = this.props.match.params.id;
        this.props.fetchStream(urlId);
        this.buildPlayer(); // Try to build player during the initial render
    }

    //Try to build player when the component is updated
    componentDidUpdate() {
        this.buildPlayer();
    }

    // When we navigate out of this component, we need to do clean-up by stopping the streaming.
    componentWillUnmount() {
        this.player.destroy(); // Stops streaming video and detach from html video element
    }

    // Initialize the video player
    buildPlayer() {
        // Do nothing if there is a player already or we have not fetched the stream yet
        if (this.player || !this.props.stream){
            return;
        }
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${this.props.stream.id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {

        if(!this.props.stream) {
            return <div>Loading...</div>;
        }
        const {title, description} = this.props.stream;
        return (
            <div>
                <video ref={this.videoRef} style={{width: '100%'}} controls={true} />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    // The Router in React-Router-Dom injects a match object as props that contains the wildcard matches as params.
    const urlId = ownProps.match.params.id;
    return {stream: state.streams[urlId]};
};

export default connect(mapStateToProps,{fetchStream})(StreamShow);