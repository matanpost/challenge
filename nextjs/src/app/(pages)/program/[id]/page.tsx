'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchProgramById } from '../../../services/api';
import { Typography, Paper, Button } from '@mui/material';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/navigation';

const ProgramDetailsPage = () => {
  const params = useParams();
  const id = params.id;
  const [program, setProgram] = useState<any>(null);
  console.log(id);
  
  useEffect(() => {
    
    if (id) {
      fetchProgramById(id as string).then(setProgram);
    }
  }, [id]);
  
  if (!program) return <p>Loading...</p>;
  const router = useRouter();

  return (
    <Layout>
      <Paper sx={{ pxy: 2 }}>
        <Typography variant="h4">{program.attributes.title}</Typography>
        <Typography>{program.attributes.discription}</Typography>
        <Button variant="contained" size="small" onClick={() => router.push('/homepage')}>Back to Home</Button>
      </Paper>
    </Layout>
  );
};

export default ProgramDetailsPage;