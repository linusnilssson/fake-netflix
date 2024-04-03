import React from 'react';
import { Typography, Box } from '@mui/material';

const ComingSoon: React.FC = () => {
    return (
        <Box>
          <Typography variant="h1" sx={{ color: 'white', marginBottom: '1rem' }}>
            Coming Soon
          </Typography>
          <Typography variant="body1" sx={{ color: 'white' }}>
            This page is under construction. Stay tuned for updates!
          </Typography>
        </Box>
      );
    }

export default ComingSoon;