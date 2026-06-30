import { ADD_TODO, DELET_TODO, TOGGLE_TODO, EDIT_TODO } from './actionTypes';

// Helper function to format future dates relative to today
const getFutureDateString = (daysAhead) => {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().split('T')[0]; // yyyy-mm-dd
};

// Helper function to load state from localStorage safely
const loadTodosFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('todos');
    if (serializedState === null) {
      // Preload new default tasks requested by the user
      return [
        {
          id: '1',
          text: 'Data Structures assignment',
          completed: false,
          priority: 'High',
          dueDate: getFutureDateString(2), // Due in 2 days
          createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
        },
        {
          id: '2',
          text: 'Walk',
          completed: false,
          priority: 'Medium',
          dueDate: getFutureDateString(0), // Due today
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
        },
        {
          id: '3',
          text: 'Drink Water',
          completed: false,
          priority: 'Low',
          dueDate: getFutureDateString(0), // Due today
          createdAt: new Date(Date.now() - 3600000 * 1).toISOString()
        }
      ];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load todos from localStorage", err);
    return [];
  }
};

const initialState = {
  todos: loadTodosFromLocalStorage()
};

// Reducer to manage state transitions based on dispatched actions
export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          {
            id: Date.now().toString(),
            text: action.payload.text,
            priority: action.payload.priority,
            dueDate: action.payload.dueDate,
            completed: false,
            createdAt: new Date().toISOString()
          },
          ...state.todos
        ]
      };

    case DELET_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { 
                ...todo, 
                text: action.payload.text, 
                priority: action.payload.priority,
                dueDate: action.payload.dueDate
              }
            : todo
        )
      };

    default:
      return state;
  }
}
