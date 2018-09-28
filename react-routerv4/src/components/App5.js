import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './styles/App5.css';

export const App5 = (props) => (
  <Router>
    <div>
      <Route path="/:page?/:subpage?" render={
        ({ match }) => (
          <h1>
            PAGE: {match.params.page || 'Home'}<br />
            SUBPAGE: {match.params.subpage || 'Null'}
          </h1>
        )} 
      />
    </div>
  </Router>
);
