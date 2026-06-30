import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoReducer';

// Configure the Redux store with the todo reducer
const store = configureStore({
  reducer: {
    todos: todoReducer
  }
});

// Subscribe to store updates to persist the todos state to localStorage
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem('todos', JSON.stringify(state.todos.todos));
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
});

export default store;
