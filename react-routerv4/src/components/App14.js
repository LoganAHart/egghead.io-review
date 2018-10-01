import React from 'react';
import {
  BrowserRouter,
  HashRouter,
  MemoryRouter,
  StaticRouter,
  NativeRouter,
  Link,
  Route,
} from 'react-router-dom';

import './styles/App14.css';

const LinksRoutes = () => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Route 
      exact path="/"
      render={() => (<h1>Home</h1>)}
    />
    <Route 
      path="/about"
      render={() => (<h1>About</h1>)}
    />
  </div>
);

/* BrowserRouter
used in environments where we can support the HTML5 history API
*/
const forceRefresh = () => {
  console.log(new Date());
  return true;
}
const BrowserRouterApp = () => (
  <BrowserRouter forceRefresh={forceRefresh()}>
    <LinksRoutes />
  </BrowserRouter>
);

/* HashRouter 
used if not in a position to support HTML5 history API
hashTypes:
  slash - http://localhost:3000/#/
  noslash - http://localhost:3000/#
  hashbang - http://localhost:3000/#!/
*/
const HashRouterApp = () => (
  <HashRouter hashType="slash">
    <LinksRoutes />
  </HashRouter>
);

/* MemoryRouter 
entirely in-memory router, mostly useful for testing, url does not change
initialEntries:
  can pass in array that represents current history stack in the virtual browser
initialIndex:
  sets the position / path in our initialEntries array
*/
const MemoryRouterApp = () => (
  <MemoryRouter 
    initialEntries={['/', '/about']}
    initialIndex={1}
  >
    <LinksRoutes />
  </MemoryRouter>
);

/* StaticRouter
Used with server side rendering
context:
  represents the url that the HTTP server receives
*/
const StaticRouterApp = () => (
  <StaticRouter
    location="/about"
    context={{}}
  >
    <LinksRoutes />
  </StaticRouter>
);

/* NativeRouter - Android iOS environment
*/

export const App14 = () => (
  <BrowserRouterApp />
);
