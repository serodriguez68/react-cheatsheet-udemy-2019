import React from 'react';

class SearchBar extends React.Component {
    state = { term: ''};

    onFormSubmit = (event) => {
        event.preventDefault();
        // Here `this` would cause a problem because the function is called outside the scope of the
        // SearchBar instance `this = undefined`.  However, arrow functions automatically bind this to the instance.
        this.props.onSearchSubmit(this.state.term);
    };

    render() {
        return (
            <div className="ui segment">
                <form className="ui form" onSubmit={ this.onFormSubmit }>
                    <div className="field">
                        <label>Image Search</label>
                        {/* onChange is a special property name that gets triggered when the input changes. */}
                        {/* We provide the callback function to handle the change */}
                        {/* We fix (control) the value of the input through the state to make sure that */}
                        {/* react DRIVES the HTML and not the other way around */}
                        <input
                            type="text"
                            value={this.state.term}
                            onChange={ (e) => this.setState({term: e.target.value}) } />
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;