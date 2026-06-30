import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, editTodo } from '../redux/todoActions';
import { 
  Checkbox, 
  IconButton, 
  Tooltip, 
  TextField, 
  Typography 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority || 'Medium');
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');
  const [error, setError] = useState(false);
  const editInputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (!trimmedText) {
      setError(true);
      return;
    }
    dispatch(editTodo(todo.id, trimmedText, editPriority, editDueDate));
    setIsEditing(false);
    setError(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditPriority(todo.priority || 'Medium');
    setEditDueDate(todo.dueDate || '');
    setIsEditing(false);
    setError(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const formatTime = (isoString) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/10 text-red-400 border border-red-500/25';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/25';
      case 'Low':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25';
      default:
        return 'bg-slate-500/10 text-slate-400 border border-slate-500/25';
    }
  };

  const getDueDateDisplay = (dueDateStr, completed) => {
    if (!dueDateStr) return null;
    
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dueDate = new Date(dueDateStr);
      dueDate.setHours(0, 0, 0, 0);
      
      const timeDiff = dueDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      if (completed) {
        return {
          text: `Due: ${dueDateStr}`,
          className: 'text-slate-500 bg-slate-900/20 border-slate-800/30'
        };
      }
      
      if (daysDiff < 0) {
        return {
          text: `Overdue (${Math.abs(daysDiff)}d ago)`,
          className: 'text-red-400 bg-red-950/20 border border-red-500/30 animate-pulse font-semibold'
        };
      } else if (daysDiff === 0) {
        return {
          text: 'Due Today',
          className: 'text-amber-400 bg-amber-950/20 border border-amber-500/30 font-semibold'
        };
      } else if (daysDiff === 1) {
        return {
          text: 'Due Tomorrow',
          className: 'text-blue-400 bg-blue-950/20 border border-blue-500/30'
        };
      } else {
        return {
          text: `Due: ${dueDateStr}`,
          className: 'text-slate-400 bg-slate-900/20 border border-slate-800/40'
        };
      }
    } catch (e) {
      return {
        text: `Due: ${dueDateStr}`,
        className: 'text-slate-400 bg-slate-900/20 border border-slate-800/40'
      };
    }
  };

  const dueDateBadge = getDueDateDisplay(todo.dueDate, todo.completed);

  return (
    <div
      className={`group relative flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
        todo.completed
          ? 'bg-slate-900/30 border-slate-800/80'
          : 'bg-slate-900/30 border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/40 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Checkbox
          checked={todo.completed}
          onChange={handleToggle}
          color="primary"
          sx={{
            color: 'rgba(71, 85, 105, 0.8)',
            '&.Mui-checked': {
              color: '#3b82f6',
            },
            padding: '4px',
          }}
        />

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex flex-col gap-2 w-full">
              <TextField
                inputRef={editInputRef}
                fullWidth
                size="small"
                value={editText}
                error={error}
                onChange={(e) => {
                  setEditText(e.target.value);
                  if (error) setError(false);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Task name"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#f3f4f6',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    '& fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase select-none">Priority:</span>
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="bg-slate-950 text-slate-200 border border-slate-800 rounded px-2 py-0.5 text-xs focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase select-none">Due:</span>
                  <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="bg-slate-950 text-slate-200 border border-slate-800 rounded px-2 py-0.5 text-xs focus:border-blue-500 focus:outline-none cursor-pointer"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <Typography
                  variant="body1"
                  onClick={handleToggle}
                  className={`break-words cursor-pointer select-none transition-all duration-300 font-semibold ${
                    todo.completed
                      ? 'line-through text-slate-500 decoration-blue-500/60 decoration-2'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {todo.text}
                </Typography>
                
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full select-none shrink-0 border ${getPriorityStyle(todo.priority)}`}>
                  {todo.priority || 'Medium'}
                </span>

                {dueDateBadge && (
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full select-none shrink-0 border flex items-center gap-1 ${dueDateBadge.className}`}>
                    <CalendarMonthIcon sx={{ fontSize: 10 }} />
                    {dueDateBadge.text}
                  </span>
                )}
              </div>
              
              {todo.createdAt && (
                <span className="flex items-center gap-1 text-[10px] text-slate-500 mt-1 font-medium select-none">
                  <AccessTimeIcon sx={{ fontSize: 12 }} />
                  Added at {formatTime(todo.createdAt)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 ml-4 shrink-0">
        {isEditing ? (
          <>
            <Tooltip title="Save Changes">
              <IconButton 
                size="small" 
                onClick={handleSave} 
                className="text-emerald-400 hover:bg-emerald-950/30"
                sx={{ color: '#34d399' }}
              >
                <SaveIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancel Edit">
              <IconButton 
                size="small" 
                onClick={handleCancel} 
                className="text-slate-400 hover:bg-slate-800"
                sx={{ color: '#9ca3af' }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="Edit Task">
              <IconButton
                size="small"
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
                sx={{ color: '#9ca3af' }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Task">
              <IconButton
                size="small"
                onClick={handleDelete}
                className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-slate-400 hover:text-red-400 hover:bg-red-950/20 transition-all duration-200"
                sx={{ color: '#9ca3af', '&:hover': { color: '#f87171' } }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
}
