// Imports
import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

// We can do this with https://momentjs.com/ ;-)

// Component
const TimeAgo = ({ timestamp }) => {

	// Time ago
	let timeAgo = '';
	if (timestamp){
		const date = parseISO(timestamp);
		const timePeriod = formatDistanceToNow(date);
		timeAgo = `${ timePeriod } ago`;
	}

	// Return
	return(
		<span title={ timestamp }>
			&nbsp;<i>{ timeAgo }</i>
		</span>
	);

};

// Export
export default TimeAgo;