import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, LinearProgress, Paper, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

export default function TodoHeader() {
  const todos = useSelector((state) => state.todos.todos);
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = totalCount - completedCount;
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const completionPercentage = totalCount > 0 
    ? Math.round((completedCount / totalCount) * 100) 
    : 0;

  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <Paper 
      elevation={3}
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-lg dark:shadow-xl p-6 md:p-8 transition-all duration-300"
      sx={{ background: 'none' }}
    >
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl"></div>
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl"></div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
        <div>
          <Typography variant="overline" className="text-blue-500 dark:text-blue-400 font-extrabold tracking-wider text-xs block">
            {formattedDate}
          </Typography>
          <Typography 
            variant="h4" 
            component="h1" 
            className="font-extrabold mt-1 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-100 dark:to-slate-400 bg-clip-text text-transparent"
          >
            Task Workspace
          </Typography>
          <Typography variant="body2" className="text-slate-550 dark:text-slate-400 mt-2">
            Keep track of your productivity, goals, and daily notes.
          </Typography>
        </div>

        <div className="flex flex-col gap-2 min-w-[200px] bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 transition-all duration-300">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span>TASK COMPLETION</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">{completionPercentage}%</span>
          </div>
          <LinearProgress 
            variant="determinate" 
            value={completionPercentage} 
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(226, 232, 240, 0.8)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                backgroundImage: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
              }
            }}
          />
          <span className="text-xs text-slate-500 dark:text-slate-400 text-right">
            {completedCount} of {totalCount} completed
          </span>
        </div>
      </div>

      <Grid container spacing={3} className="mt-6 relative z-10">
        <Grid item xs={4}>
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-3 md:p-4 rounded-xl hover:border-slate-300 dark:hover:border-slate-700/60 transition-colors">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 dark:text-blue-400 hidden sm:block">
              <AssignmentIcon />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white">
                {totalCount}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Total Tasks</div>
            </div>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-3 md:p-4 rounded-xl hover:border-slate-350 dark:hover:border-slate-700/60 transition-colors">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 dark:text-emerald-400 hidden sm:block">
              <TaskAltIcon />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {completedCount}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Completed</div>
            </div>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-3 md:p-4 rounded-xl hover:border-slate-350 dark:hover:border-slate-700/60 transition-colors">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 dark:text-amber-400 hidden sm:block">
              <HourglassEmptyIcon />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                {pendingCount}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Pending</div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
