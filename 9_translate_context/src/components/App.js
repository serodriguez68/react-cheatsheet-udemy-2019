import React from 'react';
import UserCreate from "./UserCreate";
import LanguageContext from "../contexts/LanguageContext";

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
                {/* - With the LanguageContext.Provider component we create an instance of the LangContext */}
                {/*   - That instance is scoped to the all children nested within */}
                {/* - With the value property, we can modify the value of the context. We can use anything. */}
                <LanguageContext.Provider value={this.state.language} >
                    <UserCreate/>
                </LanguageContext.Provider>
            </div>
        );
    }
}

export default App;
