import React from 'react';


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
    return (
        <div>SeasonDisplay: {season}</div>
    );
};

export default SeasonDisplay;