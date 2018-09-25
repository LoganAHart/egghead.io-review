import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import TodoApp from './components/TodoApp';
import todoApp from './reducers';
import {
  addTodo,
  toggleTodo,
} from './actions';

const todoAppStore = createStore(todoApp);
todoAppStore.dispatch(addTodo('First Todo'));
todoAppStore.dispatch(addTodo('Second Todo'));
todoAppStore.dispatch(addTodo('Third Todo'));
todoAppStore.dispatch(toggleTodo(0));

ReactDOM.render(
  <Provider store={todoAppStore}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
