import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';

import './styles/App12.css';

const loggedin = false;

const Links = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/old/123">Old</Link>
    <Link to="/new/456">New</Link>
    <Link to="/protected">Protected</Link>
  </nav>
);

export const App12 = () => (
  <Router>
    <div>
      <Links />
        <Route
          exact path="/"
          render={() => (<h1>Home</h1>)}
        />
        <Route
          path="/new/:str"
          render={({ match }) => (<h1>New: {match.params.str}</h1>)}
        />
        <Route
          path="/old/:str"
          render={({ match }) => (
            <Redirect to={`/new/${match.params.str}`} />
          )}
        />
        <Route
          path="/protected"
          render={() => (
            loggedin
            ? <h1>Welcome to the protected page</h1>
            : <Redirect to="/new/Login" />
          )}
        />
    </div>
  </Router>
);

// Another approach to redirects...
// export const App12 = () => (
//   <Router>
//     <div>
//       <Links />
//       <Switch>
//         <Route
//           exact path="/"
//           render={() => (<h1>Home</h1>)}
//         />
//         <Route
//           path="/new"
//           render={() => (<h1>New</h1>)}
//         />
//         <Redirect from="/old" to="/new" />
//       </Switch>
//     </div>
//   </Router>
// );
