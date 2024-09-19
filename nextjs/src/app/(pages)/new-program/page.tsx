'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProgram } from '../../services/api';
import { TextField, Button, Typography, Box, Alert, Switch, FormControlLabel } from '@mui/material';
import Layout from '../../components/Layout';

const NewProgramPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [addNewModules, setAddNewModules] = useState(false); // Toggle for adding new modules
  const [newModules, setNewModules] = useState([{ title: '', description: '' }]); // State for new modules
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const newProgram = {
      title,
      content,
      modules: addNewModules ? newModules.filter(module => module.title && module.description) : [], // Only send new modules if they are added
    };

    try {
      // Submit the new program (and possibly new modules) to the API
      await createProgram(newProgram);
      setSuccess(true);
      router.push('/'); // Redirect to the homepage after successful creation
    } catch (err) {
      setError('Failed to create the program.');
    }
  };

  // Handle adding/removing dynamic module fields
  const handleAddModuleField = () => {
    setNewModules([...newModules, { title: '', description: '' }]);
  };

  const handleRemoveModuleField = (index: number) => {
    const updatedModules = newModules.filter((_, i) => i !== index);
    setNewModules(updatedModules);
  };

  // Handle input change for dynamic module fields
  const handleModuleChange = (index: number, field: string, value: string) => {
    const updatedModules = newModules.map((module, i) =>
      i === index ? { ...module, [field]: value } : module
    );
    setNewModules(updatedModules);
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: '600px', margin: '0 auto', mt: 4, bgcolor: 'lightgray' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Program
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Program created successfully!
          </Alert>
        )}
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Title"
            fullWidth
            required
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Content"
            fullWidth
            required
            margin="normal"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Toggle to add new modules */}
          <FormControlLabel
            control={<Switch checked={addNewModules} onChange={() => setAddNewModules(!addNewModules)} />}
            label="Add New Modules"
          />

          {/* If user chooses to add new modules, render input fields for new modules */}
          {addNewModules && (
            <>
              {newModules.map((module, index) => (
                <Box key={index} sx={{ mt: 3, mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                  <Typography variant="h6">New Module {index + 1}</Typography>
                  <TextField
                    label="Module Title"
                    fullWidth
                    required
                    margin="normal"
                    value={module.title}
                    onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                  />
                  <TextField
                    label="Module Description"
                    fullWidth
                    required
                    margin="normal"
                    multiline
                    rows={3}
                    value={module.description}
                    onChange={(e) => handleModuleChange(index, 'description', e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveModuleField(index)}
                    sx={{ mt: 2 }}
                  >
                    Remove Module
                  </Button>
                </Box>
              ))}
              <Button variant="outlined" onClick={handleAddModuleField} sx={{ mt: 2 }}>
                Add Another Module
              </Button>
            </>
          )}

          <Box sx={{ mt: 4 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Program
            </Button>
          </Box>
        </form>
      </Box>
    </Layout>
  );
};

export default NewProgramPage;
