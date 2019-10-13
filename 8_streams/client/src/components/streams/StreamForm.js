import React from 'react';
// Field is a react component
// reduxForm is a function
import { Field, reduxForm } from "redux-form";


class StreamForm extends React.Component {

    // When given to a Field component, redux form will call this function passing formProps.
    // formProps is an object that contains:
    //   1) Information about the the state of the field (the name, the value). Remember, we want controlled elements.
    //   2) A collection of event handlers that internally contain action creators that we need to wire to update
    //      the redux store.
    //   3) Any other custom props that we pass to the Field component that are NOT part of 1 and 2 (e.g. label in this case)
    //   4) A `meta` property that contains a bunch of meta info about the field's state including the `error` we give
    //      on validation
    // formProps.input has the shape of:
    // {name: "title", onBlur: ƒ, onChange: ƒ, onDragStart: ƒ, ..., value: "my title", meta: {error: '', ...}}
    renderInput = (formProps) => {
        // Under the hood we want to do something like this:
        // return <input  onChange={formProps.input.onChange} value={formProps.input.value }/>;
        // However, the {...formProps.input} syntax is a shorthand to wire everything inside the formProps.input to the
        // input component using the same keys as the ones in the object.
        const meta = formProps.meta;
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{formProps.label}</label>
                <input  {...formProps.input} />
                { this.renderError(meta) }
            </div>
        );
    };

    renderError ({error, touched}) {
        if (error && touched) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    };


    // Our custom onSubmit function that will get wrapped by handleSubmit
    // handleSubmit passes the formValues as an argument.
    // e.g. formValues:  {title: "my title", description: "my description"}
    // handleSubmit does NOT call our custom onSubmit function if the form has errors.
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
        // Navigation after submit: this.props.history.push('/streams');
        // This is a problem because the user async request might fail and we will be navigating the user
        // before the async request resolves. The action creator is a better place to do this.
    };

    render() {
        return (
            // handleSubmit is injected by redux-form and wraps our custom 'onSubmit' function.
            // - It preventsDefault so that we don't need to do it
            // - It gets all the form values and passes them as an argument to our 'onSubmit' function.
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>

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

// We define this function OUTSIDE the component and wire it in into the component
// using the `reduxForm` function.
// The function gets called with a `formValues` object that contains the values of each Field using the name as key
// e.g. { title: 'My title', description: 'My description' }
// If the fields are ok, then we must return an empty objects
// Else we must return an object that contains the fields with errors along with a message. The match with the
// Field names is VERY IMPORTANT
const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    return errors;
};


// reduxForm is a function that serves an similar purpose connect function from react-redux
// but limited to redux-form instrumentation.
//   - It maps the state of the redux store to the props of the component
//   - It injects the necessary action creators
// reduxForm receives a single object to configure it
//   - 'form' can be any string to describe the purpose of the form
//   - 'validate' the validate function that will be used
// @return The return of reduxForm(...)(StreamForm) is a component that is our
// component wrapped by reduxForm
export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);

