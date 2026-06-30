import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { 
  Button,
  Badge, 
  TextField, 
  InputAdornment, 
  Typography 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function TodoList({ onOpenAddModal }) {
  const todos = useSelector((state) => state.todos.todos);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Calculate live counts
  const totalCount = todos.length;
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  // Filter tasks based on search text and active button
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
    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-lg dark:shadow-xl transition-all duration-300">
      {/* Search and Filters Header */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800/80">
        
        {/* Unified Search Field & Add Task button group */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-lg">
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className={isDark ? 'text-slate-500' : 'text-slate-400'} fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                color: 'text.primary',
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(241, 245, 249, 0.6)',
                '& fieldset': {
                  borderColor: isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(203, 213, 225, 0.8)',
                },
                '&:hover fieldset': {
                  borderColor: '#3b82f6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3b82f6',
                },
              },
            }}
          />
          
          <Button
            onClick={onOpenAddModal}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              height: '40px',
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: '600',
              px: 3,
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              boxShadow: '0 4px 10px rgba(59, 130, 246, 0.2)',
              flexShrink: 0,
              '&:hover': {
                background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
              }
            }}
          >
            New Task
          </Button>
        </div>

        {/* MUI Styled Filter Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950/60 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800/80 self-start lg:self-auto transition-all duration-300">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'contained' : 'text'}
            color="primary"
            size="small"
            sx={{
              textTransform: 'none',
              fontWeight: '600',
              borderRadius: '8px',
              px: 2,
              py: 0.75,
              color: filter === 'all' ? '#fff' : (isDark ? '#9ca3af' : '#475569'),
              '&:hover': {
                backgroundColor: filter === 'all' ? '#2563eb' : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
              }
            }}
            startIcon={
              <Badge 
                badgeContent={totalCount} 
                color="primary"
                max={99}
                sx={{
                  marginRight: '2px',
                  '& .MuiBadge-badge': {
                    fontSize: '0.65rem',
                    height: '18px',
                    minWidth: '18px',
                    padding: '0 4px',
                    position: 'relative',
                    transform: 'none',
                    top: 'auto',
                    right: 'auto'
                  }
                }}
              />
            }
          >
            All
          </Button>
          
          <Button
            onClick={() => setFilter('active')}
            variant={filter === 'active' ? 'contained' : 'text'}
            color="error"
            size="small"
            sx={{
              textTransform: 'none',
              fontWeight: '600',
              borderRadius: '8px',
              px: 2,
              py: 0.75,
              color: filter === 'active' ? '#fff' : (isDark ? '#9ca3af' : '#475569'),
              '&:hover': {
                backgroundColor: filter === 'active' ? '#dc2626' : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
              }
            }}
            startIcon={
              <Badge 
                badgeContent={activeCount} 
                color="error"
                max={99}
                sx={{
                  marginRight: '2px',
                  '& .MuiBadge-badge': {
                    fontSize: '0.65rem',
                    height: '18px',
                    minWidth: '18px',
                    padding: '0 4px',
                    position: 'relative',
                    transform: 'none',
                    top: 'auto',
                    right: 'auto',
                    backgroundColor: '#f87171'
                  }
                }}
              />
            }
          >
            Active
          </Button>

          <Button
            onClick={() => setFilter('completed')}
            variant={filter === 'completed' ? 'contained' : 'text'}
            color="success"
            size="small"
            sx={{
              textTransform: 'none',
              fontWeight: '600',
              borderRadius: '8px',
              px: 2,
              py: 0.75,
              color: filter === 'completed' ? '#fff' : (isDark ? '#9ca3af' : '#475569'),
              '&:hover': {
                backgroundColor: filter === 'completed' ? '#16a34a' : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
              }
            }}
            startIcon={
              <Badge 
                badgeContent={completedCount} 
                color="success"
                max={99}
                sx={{
                  marginRight: '2px',
                  '& .MuiBadge-badge': {
                    fontSize: '0.65rem',
                    height: '18px',
                    minWidth: '18px',
                    padding: '0 4px',
                    position: 'relative',
                    transform: 'none',
                    top: 'auto',
                    right: 'auto',
                    backgroundColor: '#34d399'
                  }
                }}
              />
            }
          >
            Completed
          </Button>
        </div>
      </div>

      {/* Todo items container */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        ) : (
          /* Empty States */
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-950/10">
            <div className="p-4 bg-slate-100 dark:bg-slate-900/60 rounded-2xl text-slate-400 dark:text-slate-500 mb-4 border border-slate-200 dark:border-slate-800">
              <FormatListBulletedIcon sx={{ fontSize: 32 }} />
            </div>
            <Typography variant="subtitle1" className="font-bold text-slate-700 dark:text-slate-300">
              {searchQuery 
                ? 'No matching tasks found' 
                : filter === 'completed' 
                  ? 'No completed tasks yet' 
                  : 'Workspace is clean'}
            </Typography>
            <Typography variant="body2" className="text-slate-400 dark:text-slate-500 max-w-xs mt-1">
              {searchQuery 
                ? `We couldn't find any tasks matching "${searchQuery}".` 
                : filter === 'completed' 
                  ? 'Finish some tasks from your active list to see them checked off here.' 
                  : 'Start your day by writing down a new task above.'}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
