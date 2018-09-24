import {
  getTodos,
  createTodo,
  updateTodo,
} from '../lib/todoServices';
import { showMessage } from './messages';

const initState = {
  todos: [],
  currentTodo: '',
};

export const TODO_ADD = 'TODO_ADD';
export const TODOS_LOAD = 'TODOS_LOAD';
export const TODO_REPLACE = 'TODO_REPLACE';
const CURRENT_UPDATE = 'CURRENT_UPDATE';

export const updateCurrent = (val) => ({ type: CURRENT_UPDATE, payload: val });
export const loadTodos = (todos) => ({ type: TODOS_LOAD, payload: todos });
export const addTodo = (todo) => ({ type: TODO_ADD, payload: todo });
export const replaceTodo = (todo) => ({ type: TODO_REPLACE, payload: todo });

export const fetchTodos = () => {
  return (dispatch) => {
    dispatch(showMessage('Loading Todos'));
    getTodos()
      .then(todos => dispatch(loadTodos(todos)));
  }
}

export const saveTodo = (name) => {
  return (dispatch) => {
    dispatch(showMessage('Saving Todo'));
    createTodo(name)
      .then(todo => dispatch(addTodo(todo)));
  }
}

export const toggleTodo = (id) => {
  return (dispatch, getState) => {
    dispatch(showMessage('Saving Todo Update'));
    const { todos } = getState().todo;
    const todo = todos.find(t => t.id === id);
    const toggled = { ...todo, isComplete: !todo.isComplete };
    updateTodo(toggled)
      .then(res => dispatch(replaceTodo(res)));
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case TODO_ADD:
      return {
        ...state,
        currentTodo: '',
        todos: [...state.todos, action.payload]
      };
    case TODOS_LOAD:
      return {
        ...state,
        todos: action.payload,
      }
    case CURRENT_UPDATE:
      return {
        ...state,
        currentTodo: action.payload,
      };
    case TODO_REPLACE:
      return {
        ...state,
        todos: state.todos
          .map(t => t.id === action.payload.id ? action.payload : t),
      }
    default:
      return state;
  }
}