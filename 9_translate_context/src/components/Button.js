import React from 'react';
import LanguageContext from "../contexts/LanguageContext";

class Button extends React.Component {
    // Connect the Language Context to the Component
    // contextType is a special property for React.
    static contextType = LanguageContext;

    render() {
        // this.context is used to get the data in the contexts
        const text = this.context === 'english' ? 'Submit' : 'Voorleggen';
        return(
            <button className="ui button primary">{text}</button>
        );
    }
}

export default Button;