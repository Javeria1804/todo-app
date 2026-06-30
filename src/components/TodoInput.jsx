import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todoActions';
import { 
  TextField, 
  Button, 
  InputAdornment, 
  ToggleButton, 
  ToggleButtonGroup, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Typography,
  IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';

export default function TodoInput({ open, onClose }) {
  const [inputText, setInputText] = useState('');
  const [priority, setPriority] = useState('Medium'); // 'Low' | 'Medium' | 'High'
  const [dueDate, setDueDate] = useState(''); // 'yyyy-mm-dd' or empty
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const handlePriorityChange = (event, newPriority) => {
    if (newPriority !== null) {
      setPriority(newPriority);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedText = inputText.trim();
    if (!trimmedText) {
      setError(true);
      setHelperText('Task description cannot be empty!');
      return;
    }

    dispatch(addTodo(trimmedText, priority, dueDate));
    
    // Reset form states
    setInputText('');
    setPriority('Medium');
    setDueDate('');
    setError(false);
    setHelperText('');
    
    onClose(); // Close the modal
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '20px',
          backgroundImage: 'none',
          backgroundColor: isDark ? '#0f172a' : '#ffffff',
          border: isDark ? '1px solid rgba(51, 65, 85, 0.8)' : '1px solid rgba(226, 232, 240, 0.8)',
          boxShadow: isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 20px 25px -5px rgba(0,0,0,0.1)',
          p: 2,
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: '700', fontFamily: 'Outfit' }}>
          Create New Task
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ borderColor: isDark ? 'rgba(51, 65, 85, 0.4)' : 'rgba(226, 232, 240, 0.8)' }}>
          <div className="flex flex-col gap-6 py-2">
            
            {/* Task input field */}
            <TextField
              fullWidth
              variant="outlined"
              value={inputText}
              error={error}
              helperText={helperText}
              autoFocus
              onChange={(e) => {
                setInputText(e.target.value);
                if (error) {
                  setError(false);
                  setHelperText('');
                }
              }}
              placeholder="e.g. Design application layout, Draft project proposal..."
              label="Task Title / Description"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BorderColorIcon className={isDark ? 'text-slate-500' : 'text-slate-400'} fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(241, 245, 249, 0.6)',
                  color: 'text.primary',
                  '& fieldset': {
                    borderColor: isDark ? 'rgba(51, 65, 85, 0.6)' : 'rgba(203, 213, 225, 0.8)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'text.secondary',
                  '&.Mui-focused': {
                    color: '#3b82f6',
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: '#f87171',
                  fontWeight: '600',
                }
              }}
            />

            {/* Priority Group */}
            <div className="flex flex-col gap-2">
              <Typography variant="body2" sx={{ fontWeight: '700', color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', tracking: '1px' }}>
                Priority Level
              </Typography>
              <ToggleButtonGroup
                value={priority}
                exclusive
                onChange={handlePriorityChange}
                aria-label="task priority"
                size="small"
                fullWidth
                sx={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(241, 245, 249, 0.6)',
                  borderRadius: '10px',
                  p: '3px',
                  border: isDark ? '1px solid rgba(51, 65, 85, 0.5)' : '1px solid rgba(203, 213, 225, 0.8)',
                  '& .MuiToggleButton-root': {
                    color: 'text.secondary',
                    border: 'none',
                    textTransform: 'none',
                    fontWeight: '600',
                    py: 1,
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s',
                    '&.Mui-selected': {
                      color: '#fff',
                      '&.priority-low': {
                        backgroundColor: '#10b981',
                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                      },
                      '&.priority-medium': {
                        backgroundColor: '#f59e0b',
                        boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
                      },
                      '&.priority-high': {
                        backgroundColor: '#ef4444',
                        boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
                      },
                    },
                    '&:hover': {
                      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                    }
                  }
                }}
              >
                <ToggleButton value="Low" className="priority-low">Low</ToggleButton>
                <ToggleButton value="Medium" className="priority-medium">Medium</ToggleButton>
                <ToggleButton value="High" className="priority-high">High</ToggleButton>
              </ToggleButtonGroup>
            </div>

            {/* Due date input */}
            <div className="flex flex-col gap-2">
              <Typography variant="body2" sx={{ fontWeight: '700', color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', tracking: '1px' }}>
                Due Date
              </Typography>
              <TextField
                type="date"
                fullWidth
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon className={isDark ? 'text-slate-500' : 'text-slate-400'} sx={{ fontSize: 16 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(241, 245, 249, 0.6)',
                    color: 'text.primary',
                    '& fieldset': {
                      borderColor: isDark ? 'rgba(51, 65, 85, 0.6)' : 'rgba(203, 213, 225, 0.8)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                  '& .MuiInputBase-input': {
                    py: '11px',
                    color: 'text.primary',
                    '&::-webkit-calendar-picker-indicator': {
                      filter: isDark ? 'invert(1) opacity(0.6)' : 'none',
                      cursor: 'pointer',
                    }
                  }
                }}
              />
            </div>

          </div>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, gap: 1.5 }}>
          <Button 
            onClick={onClose} 
            variant="outlined" 
            color="inherit"
            sx={{ 
              borderRadius: '10px', 
              textTransform: 'none', 
              fontWeight: '600',
              borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
              px: 3 
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            startIcon={<AddCircleOutlinedIcon />}
            sx={{ 
              borderRadius: '10px', 
              textTransform: 'none', 
              fontWeight: '600',
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              boxShadow: '0 4px 12px 0 rgba(59, 130, 246, 0.25)',
              px: 3,
              '&:hover': {
                background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
              }
            }}
          >
            Add Task
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
