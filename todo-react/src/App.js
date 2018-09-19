import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  TodoForm,
  TodoList,
} from './components/todo';
import {
  addTodo,
  generateId,
  findById,
  toggleTodo,
  updateTodo,
  removeTodo,
} from './lib/todoHelpers';
import {
  pipe,
  partial,
} from './lib/utils';

class App extends Component {
  state = {
    todos: [
      {id: generateId(), name: 'Learn JSX', isComplete: true},
      {id: generateId(), name: 'Build an Awesome App', isComplete: false},
      {id: generateId(), name: 'Ship It', isComplete: false},
    ],
    currentTodo: '',
  };

  handleRemove = (id, event) => {
    event.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({
      todos: updatedTodos,
    });
  }

  handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo,partial(updateTodo, this.state.todos));
    const updatedTodos = getUpdatedTodos(id, this.state.todos);
    this.setState({
      todos: updatedTodos,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newId = generateId();
    const newTodo = {
      id: newId,
      name: this.state.currentTodo,
      isComplete: false,
    };
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: '',
    });
  };

  handleEmptySubmit = (event) => {
    event.preventDefault();
    this.setState({
      errorMessage: 'Please supply todo name',
    });
  };

  handleInputChange = (event) => {
    this.setState({
      currentTodo: event.target.value,
    });
  };

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Todos</h1>
        </header>
        <div className="Todo-App">
          {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
          <TodoForm
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={submitHandler}
          />
          <TodoList
            handleToggle={this.handleToggle}
            handleRemove={this.handleRemove}
            todos={this.state.todos}
          />
        </div>
      </div>
    );
  }
}

export default App;
