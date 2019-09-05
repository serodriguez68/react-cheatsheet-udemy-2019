import React from 'react';

// Pattern: Use configuration objects for conditional rendering
const seasonConfig = {
    summer: {
        text: 'Let\'s hit the Beach',
        iconName: 'sun'
    },
    winter: {
        text: 'Burr, it is chilly',
        iconName: 'snowflake'
    }
};


// Helper functions in the main body of the file are ok for functional components
const getSeason = (lat, month) => {
    if (month>2 && month < 9) {
        return lat > 0 ? 'summer' : 'winter';
    } else {
        return lat > 0 ? 'winter' : 'summer';
    }
};


const SeasonDisplay = (props) => {
    const season = getSeason(props.lat, new Date().getMonth());
    // Destructurizing a JS object
    const {text, iconName} = seasonConfig[season];
    return (
        <div>
            <i className={`icon ${iconName}`} />
            <h1>{text}</h1>
            <i className={`icon ${iconName}`} />
        </div>
    );
};

export default SeasonDisplay;