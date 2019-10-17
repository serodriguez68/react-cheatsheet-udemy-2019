import React from 'react';
import {connect} from 'react-redux';
import {fetchStream} from "../../actions";


class StreamShow extends React.Component{
    componentDidMount() {
        // IMPORTANT: components that rely on wildcard navigation must be self-sufficient and
        // fetch the data that they need.  We cannot rely on the data being present on the redux store.
        const urlId = this.props.match.params.id;
        this.props.fetchStream(urlId);
    }

    render() {

        if(!this.props.stream) {
            return <div>Loading...</div>;
        }
        const {title, description} = this.props.stream;
        return (
            <div>
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