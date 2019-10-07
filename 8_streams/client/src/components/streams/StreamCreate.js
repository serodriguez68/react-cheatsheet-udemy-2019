import React from 'react';
// Field is a react component
// reduxForm is a function
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {

    // When given to a Field component, redux form will call this function passing formProps.
    // formProps is an object that contains:
    //   1) Information about the the state of the field (the name, the value). Remember, we want controlled elements.
    //   2) A collection of event handlers that internally contain action creators that we need to wire to update
    //      the redux store.
    //   3) Any other custom props that we pass to the Field component that are NOT part of 1 and 2 (e.g. label in this case)
    renderInput (formProps) {
        // Under the hood we want to do something like this:
        // return <input  onChange={formProps.input.onChange} value={formProps.input.value }/>;
        // However, the following syntax is a shorthand to wire everything inside the formProps.input to the
        // input component using the same keys as the ones in the object.
        // formProps.input has the shape of:
        // {name: "title", onBlur: ƒ, onChange: ƒ, onDragStart: ƒ, onDrop: ƒ, onFocus: ƒ, value: "my title"}
        return (
            <div className="field">
                <label>{formProps.label}</label>
                <input  {...formProps.input} />
            </div>
        );
    }

    // Our custom onSubmit function that will get wrapped by handleSubmit
    // handleSubmit passes the formValues as an argument
    // e.g. formValues:  {title: "my title", description: "my description"}
    onSubmit(formValues) {
        // TODO: use redux-thunk to call an action creator that does an API request to post the data.
    }

    render() {
        return (
            // handleSubmit is injected by redux-form and wraps our custom 'onSubmit' function.
            // - It preventsDefault so that we don't need to do it
            // - It gets all the form values and passes them as an argument to our 'onSubmit' function.
            <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>

                {/* Field is a wrapper for any type of input that wires up all the redux-form infrastructure required. */}
                {/* Field needs some props: */}
                {/* - name: the name of the property this field is going to manage */}
                {/* - component: a component or a function that actually returns the field to be rendered */}
                {/*   - the function will be called with the formProps argument */}
                <Field name='title' component={this.renderInput} label="Enter Title"/>
                <Field name='description' component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}


// reduxForm is a function that replaces connect function from react-redux
//   - It maps the state of the redux store to the props of the component
//   - It injects the necessary action creators
// reduxForm receives a single object to configure it
//   - 'form' can be any string to describe the purpose of the form
export default reduxForm({
    form: 'streamCreate'
})(StreamCreate);