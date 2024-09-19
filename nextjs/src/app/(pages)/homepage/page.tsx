'use client';

import { useEffect, useState } from 'react';
import { fetchPrograms } from '../../services/api';
import { Grid, Typography, Card, CardContent, Button } from '@mui/material';
import Layout from '../../components/Layout';

export default async function HomePage() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetchPrograms().then(setPrograms);
  }, []);

  return (
    <Layout>
      <Typography variant="h4">Programs</Typography>
      <Grid container spacing={2}>
        {programs.map((program: any) => (
          <Grid item key={program.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">{program.attributes.title}</Typography>
                <Typography>{program.attributes.discription}...</Typography>
                <Typography>Modules: {program.attributes.modules.length}</Typography>
                <Button href={`/program/${program.id}`} variant="contained" size="small">View Program</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};


