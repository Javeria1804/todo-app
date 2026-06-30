import { ADD_TODO, DELET_TODO, TOGGLE_TODO, EDIT_TODO } from './actionTypes';

// Action creator to add a new todo with priority and due date
export const addTodo = (text, priority = 'Medium', dueDate = '') => ({
  type: ADD_TODO,
  payload: { text, priority, dueDate }
});

// Action creator to delete a todo
export const deleteTodo = (id) => ({
  type: DELET_TODO,
  payload: id
});

// Action creator to toggle a todo's completion status
export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id
});

// Action creator to edit a todo's text, priority, and due date
export const editTodo = (id, text, priority, dueDate) => ({
  type: EDIT_TODO,
  payload: { id, text, priority, dueDate }
});
