// Imports
import { sub } from "date-fns";
import { nanoid } from "@reduxjs/toolkit";

// State
const initialState = [
	{ id:nanoid(), 
		date:sub(new Date(), { minutes:10 }).toISOString(), 
		title:'I\'ll call you Bitcoin', 
		content:'Bitcoin to the moon', 
		user:'0', 
		reactions:{
			thumbsUp:0,
			raisingHands:1,
			heart:4,
			rocket:0,
			eyes:4
		}
	},
	{ id:nanoid(), 
		date:sub(new Date(), { minutes:16 }).toISOString(), 
		title:'My friend Cahouet', 
		content:'Cahouet is great !', 
		user:'1', 
		reactions:{
			thumbsUp:0,
			raisingHands:1,
			heart:4,
			rocket:0,
			eyes:4
		}
	},
	{ id:nanoid(), 
		date:sub(new Date(), { minutes:23 }).toISOString(), 
		title:'Cahouet is Sticky', 
		content:'Very very sticky !!', 
		user:'2', 
		reactions:{
			thumbsUp:0,
			raisingHands:1,
			heart:4,
			rocket:0,
			eyes:4
		}
	}
];