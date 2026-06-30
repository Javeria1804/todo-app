import React from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { Target } from 'lucide-react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
    },
    background: {
      default: '#0b0f19',
      paper: '#0f172a',
    },
    text: {
      primary: '#f3f4f6',
      secondary: '#9ca3af',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Outfit", "Roboto", "Helvetica", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="dark min-h-screen py-6 px-4 md:px-8 w-full flex flex-col items-center">
        <div className="w-full max-w-4xl flex flex-col gap-5">
          
          <header className="flex items-center justify-between py-2 border-b border-slate-900">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              <span className="font-extrabold text-lg text-slate-100 tracking-tight select-none">
                TaskFlow
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Task Manager
            </span>
          </header>

          <main className="flex flex-col gap-4">
            <TodoInput />
            <TodoList />
          </main>

        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
