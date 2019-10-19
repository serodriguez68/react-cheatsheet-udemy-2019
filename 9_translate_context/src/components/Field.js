import React from 'react';

class Field extends React.Component {
    render() {
        return(
            <div className="ui field">
                <label htmlFor="">Name</label>
                <input type="text"/>
            </div>
        );
    }
}

export default Field;