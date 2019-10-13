import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from "../../actions";


class StreamEdit extends React.Component {
    componentDidMount() {
        // IMPORTANT: components that rely on wildcard navigation must be self-sufficient and
        // fetch the data that they need.  We cannot rely on the data being present on the redux store.
        const urlId = this.props.match.params.id;
        this.props.fetchStream(urlId);
    }

    render(){
        if (!this.props.stream) {
            return <div>Loading...</div>;
        }
        return (<div>{this.props.stream.title}</div>);
    }
}

const mapStateToProps = (state, ownProps) => {
    // The Router in React-Router-Dom injects a match object as props that contains the wildcard matches
    // as params.
    const urlId = ownProps.match.params.id;
    return{
        stream: state.streams[urlId]
    };
};

export default connect(mapStateToProps, {fetchStream})(StreamEdit);