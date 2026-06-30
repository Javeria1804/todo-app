import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todoActions';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

export default function TodoInput() {
  const [inputText, setInputText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = inputText.trim();
    if (!trimmedText) {
      setError(true);
      return;
    }

    dispatch(addTodo(trimmedText, priority, dueDate));
    setInputText('');
    setPriority('Medium');
    setDueDate('');
    setError(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/30 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
      <TextField
        fullWidth
        size="small"
        label="Add a new task..."
        value={inputText}
        error={error}
        onChange={(e) => {
          setInputText(e.target.value);
          if (error) setError(false);
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            color: '#f3f4f6',
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            '& fieldset': { borderColor: 'rgba(51, 65, 85, 0.6)' }
          }
        }}
      />

      <div className="flex gap-3 items-center">
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="priority-label" sx={{ color: '#9ca3af' }}>Priority</InputLabel>
          <Select
            labelId="priority-label"
            value={priority}
            label="Priority"
            onChange={(e) => setPriority(e.target.value)}
            sx={{
              borderRadius: '8px',
              color: '#f3f4f6',
              backgroundColor: 'rgba(15, 23, 42, 0.4)',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(51, 65, 85, 0.6)' }
            }}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="bg-slate-950/40 text-slate-200 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none cursor-pointer h-[40px]"
          style={{ colorScheme: 'dark' }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            height: '40px',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: '600',
            px: 4,
            backgroundColor: '#3b82f6',
            '&:hover': { backgroundColor: '#2563eb' }
          }}
        >
          Add
        </Button>
      </div>
    </form>
  );
}
