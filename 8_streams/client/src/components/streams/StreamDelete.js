import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import {fetchStream, deleteStream} from "../../actions";

class StreamDelete extends React.Component  {

    componentDidMount() {
        // IMPORTANT: components that rely on wildcard navigation must be self-sufficient and
        // fetch the data that they need.  We cannot rely on the data being present on the redux store.
        const urlId = this.props.match.params.id;
        this.props.fetchStream(urlId);
    }

    onDeleteClick = () => this.props.deleteStream(this.props.stream.id);

    renderActions() {
        return (
            <React.Fragment>
                <button onClick={this.onDeleteClick} className="ui button negative">Delete</button>
                <Link to='/' className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?';
        }
        return `Are you sure you want to delete the stream with title: "${this.props.stream.title}"`
    }

    render() {
        return (
            <Modal
                title={`Delete Stream`}
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    // The Router in React-Router-Dom injects a match object as props that contains the wildcard matches as params.
    const urlId = ownProps.match.params.id;
    return {stream: state.streams[urlId]};
};

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);