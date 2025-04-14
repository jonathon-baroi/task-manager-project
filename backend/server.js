require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/sync-user', async (req, res) => {
  try {
    const { clerk_id } = req.body;
    
    if (!clerk_id) {
      return res.status(400).json({ error: 'clerk_id is required' });
    }
    
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('id, clerk_id')
      .eq('clerk_id', clerk_id)
      .maybeSingle();

    if (selectError) throw selectError;

    if (existingUser) {
      return res.json({ 
        user: existingUser,
        exists: true 
      });
    }
    
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([{ clerk_id }])
      .select('id, clerk_id')
      .single();

    if (insertError) throw insertError;

    res.json({ 
      user: newUser,
      exists: false
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/add-task', async (req, res) => {
  try {
    const { heading, date, time, user_id } = req.body;

    if (!heading || !date || !user_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const { data: newTask, error } = await supabase
      .from('tasks') // or whatever your table name is
      .insert([{ heading, date, time, user_id }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ task: newTask });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: error.message });
  }
});



app.get('/tasks/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    const { data: tasks, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user_id)      

    if (error) throw error;

    res.json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/delete-task/:task_id', async (req, res) => {
  try {
    const { task_id } = req.params;

    if (!task_id) {
      return res.status(400).json({ error: 'task_id is required' });
    }

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', task_id);

    if (error) throw error;

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: error.message });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});

