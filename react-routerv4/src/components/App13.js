import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Prompt,
} from 'react-router-dom';
import './styles/App13.css';

const Home = () => (<h1>Home</h1>);
class Form extends React.Component {
  state = {
    activity: false,
  }
  setActivity = () => {
    this.setState({ activity: true })
  }

  render() {
    return (
      <div>
        <h1>Form</h1>
        <input 
          type="text"
          onInput={this.setActivity}
        />
        <Prompt
          when={this.state.activity}
          message="Data will be lost!"
        />
      </div>
    )
  }
}

export const App13 = () => (
  <Router>
    <div>
      <Link to="/">Home</Link>
      <Link to="/form">Form</Link>
      <Route exact path="/" component={Home} />
      <Route path="/form" component={Form} />
    </div>
  </Router>
);
