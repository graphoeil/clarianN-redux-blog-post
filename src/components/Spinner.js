// Imports
import React from 'react';

// Component
const Spinner = ({ text = '', size = '5em' }) => {

	// Variables
	const header = text ? <h4>{ text }</h4> : null;

	// Return
	return(
		<div className="spinner">
			{ header }
			<div className="loader" style={ { height:size, width:size } } />
		</div>
	);
}

// Export
export default Spinner;