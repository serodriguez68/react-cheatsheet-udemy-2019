import React from 'react';
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";


class StreamCreate extends React.Component {

    // Our custom onSubmit function that will get injected into the StreamForm component
    // as a prop
    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    };

    render() {
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

// To inject custom state or action creators (not related to redux-form), we
// still need to use connect
export default connect(null, {createStream})(StreamCreate);