import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { Button, TextField, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function TodoList() {
  const todos = useSelector((state) => state.todos.todos);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const totalCount = todos.length;
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);
      
    const matchesSearch = todo.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
      
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        
        <div className="flex flex-1 max-w-md items-center">
          <TextField
            fullWidth
            size="small"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-slate-500" fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                color: '#f3f4f6',
                backgroundColor: 'rgba(15, 23, 42, 0.4)',
                '& fieldset': { borderColor: 'rgba(51, 65, 85, 0.5)' }
              }
            }}
          />
        </div>

        <div className="flex items-center gap-2 bg-slate-950/60 p-1 rounded-lg border border-slate-800 self-start md:self-auto">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'contained' : 'text'}
            size="small"
            sx={{
              textTransform: 'none',
              fontWeight: '600',
              borderRadius: '6px',
              px: 2,
              color: filter === 'all' ? '#fff' : '#9ca3af',
              backgroundColor: filter === 'all' ? '#3b82f6' : 'transparent',
              '&:hover': { backgroundColor: filter === 'all' ? '#2563eb' : 'rgba(255,255,255,0.05)' }
            }}
          >
            All ({totalCount})
          </Button>
          
          <Button
            onClick={() => setFilter('active')}
            variant={filter === 'active' ? 'contained' : 'text'}
            size="small"
            sx={{
              textTransform: 'none',
              fontWeight: '600',
              borderRadius: '6px',
              px: 2,
              color: filter === 'active' ? '#fff' : '#9ca3af',
              backgroundColor: filter === 'active' ? '#ef4444' : 'transparent',
              '&:hover': { backgroundColor: filter === 'active' ? '#dc2626' : 'rgba(255,255,255,0.05)' }
            }}
          >
            Active ({activeCount})
          </Button>

          <Button
            onClick={() => setFilter('completed')}
            variant={filter === 'completed' ? 'contained' : 'text'}
            size="small"
            sx={{
              textTransform: 'none',
              fontWeight: '600',
              borderRadius: '6px',
              px: 2,
              color: filter === 'completed' ? '#fff' : '#9ca3af',
              backgroundColor: filter === 'completed' ? '#10b981' : 'transparent',
              '&:hover': { backgroundColor: filter === 'completed' ? '#059669' : 'rgba(255,255,255,0.05)' }
            }}
          >
            Completed ({completedCount})
          </Button>
        </div>
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-lg border border-dashed border-slate-800 bg-slate-950/10">
            <div className="p-3 bg-slate-900 rounded-xl text-slate-500 mb-3">
              <FormatListBulletedIcon sx={{ fontSize: 24 }} />
            </div>
            <Typography variant="body2" className="text-slate-400 font-semibold">
              {searchQuery ? 'No tasks found' : 'No tasks in this list'}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
