import React from 'react';

class SearchBar extends React.Component {
    // Used as a callback function to handle the change
    // Event is passed by default to all event handlers
    onInputChange(event) {
        console.log(event.target.value);
    }

    render() {
        return (
            <div className="ui segment">
                <form className="ui form">
                    <div className="field">
                        <label>Image Search</label>
                        {/* onChange is a special property name that gets triggered when the input changes. */}
                        {/* We provide the callback function to handle the change */}
                        <input type="text" onChange={this.onInputChange}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;