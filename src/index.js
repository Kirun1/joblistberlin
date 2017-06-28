import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import Root from './Root';

import './styles/reset.css';
import './styles/index.css';
import './styles/layout.css';
import './styles/button.css';
import './styles/form.css';
import './styles/nav.css';
import './styles/contextualToggle.css';
import './styles/notification.css';
import './styles/company.css';


ReactDOM.render(
	<Root />,
  document.getElementById('root')
);
