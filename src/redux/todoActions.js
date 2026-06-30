import { ADD_TODO, DELET_TODO, TOGGLE_TODO, EDIT_TODO } from './actionTypes';

export const addTodo = (text, priority = 'Medium', dueDate = '') => ({
  type: ADD_TODO,
  payload: { text, priority, dueDate }
});

export const deleteTodo = (id) => ({
  type: DELET_TODO,
  payload: id
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id
});

export const editTodo = (id, text, priority, dueDate) => ({
  type: EDIT_TODO,
  payload: { id, text, priority, dueDate }
});
