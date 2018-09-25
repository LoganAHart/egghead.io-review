import React from 'react';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';
import Footer from './Footer';

export default () => (
  <div className="todo-app">
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);
