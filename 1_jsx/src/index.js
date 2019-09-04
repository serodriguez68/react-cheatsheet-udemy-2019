// Import the React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Create a react functional component
const App = () => {
	const buttonText = 'Click Me!';
	return (
		<div>
			<label htmlFor="name" className="label">Enter name:</label>
			<input type="text" id="name"/>
      {/* Shows interpolation of inline styling and interpolation of JS to output text */}
			<button style={{backgroundColor: 'blue', color: 'white'}}>{buttonText}</button>
		</div>
	);
}

// Take the react component and show it on the screen 
// ReactDOM.render takes to argumets, which component to render and where to render it.
ReactDOM.render(
	<App />,
	document.querySelector('#root')
);