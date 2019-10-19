import React from 'react';
import UserCreate from "./UserCreate";

class App extends React.Component {
    state = { language: 'english' };

    onLanguageChange = (newLanguage) => {
        this.setState({language: newLanguage});
    };

    render() {
        return (
            <div className="ui container">
                <div>
                    Select a Language:&nbsp;
                    <i className="flag us" onClick={() => this.onLanguageChange('english') }/>
                    <i className="flag nl" onClick={() =>  this.onLanguageChange('dutch') } />
                </div>
                <UserCreate/>
            </div>
        );
    }
}

export default App;
