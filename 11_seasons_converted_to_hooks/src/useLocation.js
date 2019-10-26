import {useState, useEffect} from 'react';

// Gets the user's latitude from the browser's geolocation and
// returns the latitude and an errorMessage
const useLocation =  () => {
    // Internally uses 2 independent pieces of state
    const [lat, setLat] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const getUserLocation = () => {
        // Gets 2 function callbacks: On success, On failure
        window.navigator.geolocation.getCurrentPosition(
            (position) => setLat(position.coords.latitude),
            (err) => setErrorMessage(err.message)
        );
    };

    useEffect(() => getUserLocation(), []);
    // It is community convention that hooks return values in array format
    return [lat, errorMessage];
};

export default useLocation;