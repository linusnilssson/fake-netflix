"use client";
import { CheckRounded, PlayArrow } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import movies from "../../data/movies.json";
import { useMovies } from "../context/MovieContext";

export default function MovieBanner() {
  const { bookmarkedMovies, toggleBookmark } = useMovies();
  const [bannerMovie, setBannerMovie] = useState<any>(null);
  const [buttonText, setButtonText] = useState<string>("My List");

  const handleBookmarkClick = () => {
    if (!bannerMovie) return;

    const isBookmarked = bookmarkedMovies.some(
      (movie) => movie.slug === bannerMovie.slug
    );

    if (isBookmarked) {
      toggleBookmark(bannerMovie.slug);
      setButtonText("My List");
    } else {
      toggleBookmark(bannerMovie.slug);
      setButtonText("Added");
    }
  };

  useEffect(() => {
    const trendingMovies = movies.filter((movie) => movie.isTrending);
    const randomIndex = Math.floor(Math.random() * trendingMovies.length);
    const randomMovie = trendingMovies[randomIndex];
    setBannerMovie(randomMovie);
  }, []);

  if (!bannerMovie) {
    return null; // Om ingen film finns, rendera inget
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${bannerMovie.background}), linear-gradient(to bottom, #252525, #555555, #555555, #252525)`,
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
              {bannerMovie?.title}
            </Typography>

            <Typography
              variant="h6"
              sx={{ color: "white", fontStyle: "italic" }}
            >
              {bannerMovie?.genre}
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
              startIcon={<PlayArrow />}
            >
              Play
            </Button>
            <Button
              variant="contained"
              onClick={handleBookmarkClick}
              startIcon={<CheckRounded />}
              sx={{
                backgroundColor: "lightgray",
                color: "black",
                ml: 2,
                "&:hover": {
                  backgroundColor: "lightslategray",
                },
              }}
            >
              {buttonText}
            </Button>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{ color: "white", fontSize: "1rem" }}
            >
              {bannerMovie.synopsis}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
