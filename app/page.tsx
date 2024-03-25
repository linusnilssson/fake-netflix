import movies from '../data/movies.json';
import React from 'react';
import Grid from '@mui/material/Grid';


export default function Home() {
  return (
    <Grid container spacing={2}>
      {movies.map((movie, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <div>
            <img src={movie.thumbnail} alt={movie.title} style={{ width: '100%', height: 'auto' }} />
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
            <p>{movie.rating}</p>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}