import { DAppProvider } from '@usedapp/core';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<DAppProvider config={{}}>
			<App />
		</DAppProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
