import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";


class StreamEdit extends React.Component {
    componentDidMount() {
        // IMPORTANT: components that rely on wildcard navigation must be self-sufficient and
        // fetch the data that they need.  We cannot rely on the data being present on the redux store.
        const urlId = this.props.match.params.id;
        this.props.fetchStream(urlId);
    }

    // Our custom onSubmit function that will get injected into the StreamForm component
    // as a prop
    onSubmit  = (formValues) => {
      this.props.editStream(this.props.stream.id, formValues);
    };

    render(){
        if (!this.props.stream) {
            return <div>Loading...</div>;
        }
        const {title, description} = this.props.stream;
        return (
            <div>
                <h3>Edit Stream</h3>
                {/* InitialValues is a special redux-form prop to indicate the form values of the StreamForm */}
                {/* Make sure you only pass initial values that have a corresponding Field in the form */}
                <StreamForm initialValues={{title, description}}
                            onSubmit={this.onSubmit}/>
            </div>
        );
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

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);