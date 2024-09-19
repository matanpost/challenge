import { AppBar, Toolbar, Typography, Container, BottomNavigation } from '@mui/material';
import { indigo } from '@mui/material/colors';
import React, { FC, ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <AppBar position="static" >
      <Toolbar sx={{ bgcolor: 'indigo' }}>
        <Typography variant="h6">Program Management</Typography>
      </Toolbar>
    </AppBar>
    <Container sx={{ height: "100vh" }}>
      {children}
    </Container>
    <BottomNavigation sx={{ bgcolor: 'indigo' }}></BottomNavigation>
  </>
);

export default Layout;
