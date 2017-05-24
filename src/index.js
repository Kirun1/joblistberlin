import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import Root from './Root';

import './styles/reset.css';
import './styles/index.css';
import './styles/layout.css';
import './styles/buttons.css';
import './styles/nav.css';
import './styles/contextualToggle.css';
import './styles/notifications.css';
import './styles/companies.css';

ReactDOM.render(
	<Root />,
  document.getElementById('root')
);
