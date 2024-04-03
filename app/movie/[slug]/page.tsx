"use client";
import { Grid, Typography, Button, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import movies from "../../../data/movies.json";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

type PageProps = { params: { slug: string } };

export default function MoviePage({ params }: PageProps) {
  const { slug: urlslug } = params;

  const slug = decodeURIComponent(urlslug);

  const movie = movies.find((movie) => movie.slug.toString() === slug);

  if (!movie) {
    return <div>Filmen hittades inte</div>;
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${movie.background}), linear-gradient(to bottom, #252525, #555555, #555555, #252525)`,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        paddingTop="12rem"
      >
        <Grid item xs={10} sm={10} md={7}>
          <Box>
            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: "600",
                fontSize: {
                  xs: "2.5rem",
                  sm: "2.5rem",
                  md: "3rem",
                },
              }}
            >
              {movie.title}
            </Typography>

            <Typography
              variant="h6"
              sx={{ color: "white", fontStyle: "italic" }}
            >
              {movie.genre}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "white",
                fontSize: "1.1rem",
                fontWeight: 400,
              }}
            >
              {movie.year} | Rating: {movie.rating}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            alignItems="center"
            height="100%"
            sx={{ color: "white" }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "lightgray",
                color: "black",
                "&:hover": {
                  backgroundColor: "lightslategray",
                },
              }}
              startIcon={<PlayArrowIcon />}
            >
              Play
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "lightgray",
                color: "black",
                ml: 2,
                "&:hover": {
                  backgroundColor: "lightslategray",
                },
              }}
            >
              My List
            </Button>
          </Box>
          <Box>
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
