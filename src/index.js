import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './UserContext';

ReactDOM.render(
	<UserProvider>
		<App />
	</UserProvider>,
	document.getElementById('root')
);

serviceWorker.unregister();
