import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

const AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div className="add-todo">
      <input
        className="add-todo__input"
        placeholder="new todo"
        ref={node => {
          input = node;
        }}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            dispatch(addTodo(input.value));
            input.value = '';
          }
        }}
      />
      <button
        className="add-todo__button"
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = '';
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

export default connect()(AddTodo);
