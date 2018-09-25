import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { getVisibleTodos } from '../reducers/getVisibleTodos';
import { toggleTodo } from '../actions';

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    className={
      completed ?
        "todo-list__item--completed" :
        "todo-list__item--active"
    }
  >
    {text}
  </li>
);

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ReactCSSTransitionGroup
    component="ul"
    className="todo-list"
    transitionName="todo-transition"
    transitionEnterTimeout={70}
    transitionLeaveTimeout={70}
  >
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ReactCSSTransitionGroup>
);

const mapStateToTodoListProps = (
  state
) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};

const mapDispatchToTodoListProps = (
  dispatch
) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
};

export default connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);
