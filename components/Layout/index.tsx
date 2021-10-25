import * as React from 'react';
import Box from '@mui/material/Box';

export default function Layout({ children }) {
  return(
    <Box
        style={{
            margin: '5rem 1rem',
            backgroundColor: '#EBEBEB',
            minHeight: '20rem',
            borderRadius: 10,
            display: "flex"
        }} 
    >
        {children}
    </Box>
  );
}
