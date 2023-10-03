// Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Redux store
import { Provider } from "react-redux";
import store from "./app/store";

// API
import { worker } from "./api/server";

// RTK Query
import { apiSlice } from "./api/apiSlice";
import { extendedApiSlice } from "./features/users/usersSlice";

// Wrap app rendering so we can wait for the mock API to initialize
async function start(){
	// Start our mock API server
	await worker.start({ onUnhandledRequest: 'bypass' });
	// Fetch posts and users ==================> interesting approach ;-)
	store.dispatch(extendedApiSlice.endpoints.getUsers.initiate());
	store.dispatch(apiSlice.endpoints.getPosts.initiate());
	// ReactDOM
	const root = ReactDOM.createRoot(document.getElementById('root'));
	// ReactDOM render
	root.render(
		<Provider store={ store }>
			<App/>
		</Provider>
	);
};

// Init (like IIFE)
start();