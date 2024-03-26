"use client";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import movies from "../../../data/movies.json";

type PageProps = { params: { slug: string } };

export default function MoviePage({ params }: PageProps) {
  const { slug: urlslug } = params;

  // Decode the slug from the URL
  const slug = decodeURIComponent(urlslug);

  // Use `slug` to get data about the movie
  const movie = movies.find((movie) => movie.slug.toString() === slug);

  // Check if the movie exists
  if (!movie) {
    return <div>Filmen hittades inte</div>;
  }

  return (
    <Box
      sx={{
        backgroundImage:
          "linear-gradient(to right, #777777, #555555, #232323, #000000)",
        p: 6,
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            
          >
            <img
              src={movie.thumbnail}
              alt={movie.title}
              style={{
                width: 520,
                height: 700,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Typography variant="h3" sx={{ color: "white", fontWeight: "600" }}>
              {movie.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "white", fontStyle: "italic" }}
            >
              {movie.genre}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            marginTop={12}
          >
            <Typography
              variant="body2"
              sx={{ color: "white", fontSize: "1rem" }}
            >
              {movie.synopsis}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
