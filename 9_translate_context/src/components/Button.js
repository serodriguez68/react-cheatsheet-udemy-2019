import React from 'react';
import LanguageContext from "../contexts/LanguageContext";

class Button extends React.Component {
    render() {
        return(
            <button className="ui button primary">
                <LanguageContext.Consumer>
                    {/* We always need to provide a function as a child to the Consumer */}
                    {/* The function is called with the context value as an argument and we */}
                    {/* can put any logic we want within the function (including returning other components) */}
                    {(value) => value === 'english' ? 'Submit' : 'Voorleggen'}
                </LanguageContext.Consumer>
            </button>
        );
    }
}

export default Button;