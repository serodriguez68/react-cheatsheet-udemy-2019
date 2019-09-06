import React from 'react';

class SearchBar extends React.Component {
    state = { term: ''};

    render() {
        return (
            <div className="ui segment">
                <form className="ui form">
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