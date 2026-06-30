import React, { useState } from 'react';
import TodoHeader from './components/TodoHeader';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { Target } from 'lucide-react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Configure a customized dark theme for Material UI that matches our layout
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // Tailwind blue-500
    },
    secondary: {
      main: '#8b5cf6', // Tailwind violet-500
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
  // Modal open/close state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="dark">
        <div className="min-h-screen py-8 px-4 sm:px-8 lg:px-12 flex flex-col items-stretch justify-start w-full">
          <div className="w-full flex flex-col gap-6">
            
            {/* Brand / Logo Header */}
            <header className="flex items-center justify-between px-2 w-full mb-2">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 animate-pulse">
                  <Target className="h-5 w-5" />
                </div>
                <span className="font-bold text-xl text-slate-100 tracking-tight select-none">
                  TaskFlow
                </span>
              </div>
            </header>

            {/* Dashboard Header Statistics and Completion Progress */}
            <TodoHeader />

            {/* Task List container */}
            <main className="w-full">
              <TodoList onOpenAddModal={() => setIsAddModalOpen(true)} />
            </main>

            {/* Task Input Dialog Modal */}
            <TodoInput open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
