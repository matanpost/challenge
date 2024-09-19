'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state before each login attempt

    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password: password,
      });

      // Store the JWT token in localStorage or cookies for future authenticated requests
      localStorage.setItem('token', response.data.jwt);

      // Redirect to the home page on successful login
      router.push('/homepage');
    } catch (err) {
      setError('Invalid login credentials. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography sx={{ mt: 8, }}>WELCOME</Typography>  
      <Box sx={{ mt: 8, bgcolor: "lightgrey" }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{ mt: 4 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
