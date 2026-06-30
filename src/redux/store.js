import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoReducer';

const store = configureStore({
  reducer: {
    todos: todoReducer
  }
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem('todos', JSON.stringify(state.todos.todos));
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
});

export default store;
