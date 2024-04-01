"use client";

import { PlayArrow } from "@mui/icons-material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import movies from "../../data/movies.json";
import BookmarkButton from "./BookmarkButton";
import MovieBanner from "./MovieBanner";

interface HoveredMovie {
  id: number;
  listName: string;
}

export default function MovieGrid() {
  const [recommendedScrollX, setRecommendedScrollX] = useState(0);
  const [trendingScrollX, setTrendingScrollX] = useState(0);
  const [allMoviesScrollX, setAllMoviesScrollX] = useState(0);
  const [genreScrollX, setGenreScrollX] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<HoveredMovie | null>(null);
  const [genreMovies, setGenreMovies] = useState<any[]>([]);
  const [randomMovies, setRandomMovies] = useState<any>([]);

  const recommendedListRef = useRef<HTMLDivElement | null>(null);
  const trendingListRef = useRef<HTMLDivElement | null>(null);
  const allMoviesListRef = useRef<HTMLDivElement | null>(null);
  const genreListRef = useRef<HTMLDivElement | null>(null);

  const handleRecommendedScroll = (scrollOffset: number) => {
    if (recommendedListRef.current) {
      const newScrollX = recommendedScrollX + scrollOffset * 4;
      recommendedListRef.current.scrollTo({
        left: newScrollX,
        behavior: "smooth",
      });
      setRecommendedScrollX(newScrollX);
    }
  };

  const handleTrendingScroll = (scrollOffset: number) => {
    if (trendingListRef.current) {
      const newScrollX = trendingScrollX + scrollOffset * 4;
      trendingListRef.current.scrollTo({
        left: newScrollX,
        behavior: "smooth",
      });
      setTrendingScrollX(newScrollX);
    }
  };

  const handleAllMoviesScroll = (scrollOffset: number) => {
    if (allMoviesListRef.current) {
      const newScrollX = allMoviesScrollX + scrollOffset * 4;
      allMoviesListRef.current.scrollTo({
        left: newScrollX,
        behavior: "smooth",
      });
      setAllMoviesScrollX(newScrollX);
    }
  };

  const handleGenreScroll = (scrollOffset: number) => {
    if (genreListRef.current) {
      const newScrollX = genreScrollX + scrollOffset * 4;
      genreListRef.current.scrollTo({
        left: newScrollX,
        behavior: "smooth",
      });
      setGenreScrollX(newScrollX);
    }
  };

  const handleMouseEnter = (id: number, listName: string) => {
    setHoveredIndex({ id, listName });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const trendingMovies = movies.filter((movie) => movie.isTrending);

  useEffect(() => {
    const getRandomMovies = (count: number) => {
      const randomMovies = [];
      const usedIndexes = new Set<number>();

      while (
        randomMovies.length < count &&
        randomMovies.length < movies.length
      ) {
        const randomIndex = Math.floor(Math.random() * movies.length);
        if (!usedIndexes.has(randomIndex)) {
          randomMovies.push(movies[randomIndex]);
          usedIndexes.add(randomIndex);
        }
      }

      return randomMovies;
    };

    const randomMovies = getRandomMovies(10);
    setRandomMovies(randomMovies);
  }, []);

  useEffect(() => {
    // Filter movies by specific genre, for example "Drama"
    const genre = "Drama";
    const filteredMovies = movies.filter((movie) =>
      movie.genre.toLowerCase().includes("drama")
    );
    setGenreMovies(filteredMovies);
  }, []);

  return (
    <Box sx={{ backgroundColor: "#000000", p: 2 }}>
      <MovieBanner />
      <Typography
        variant="h4"
        sx={{ color: "white", marginBottom: "2rem", marginTop: "2rem" }}
      >
        Trending movies
      </Typography>
      <Box
        ref={trendingListRef}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
          marginBottom: "2rem",
          gap: 2,
          scrollbarWidth: "none",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {/* Trending movies */}
        {trendingMovies.map((movie, index) => (
          <Link key={movie.id} href={`/movie/${movie.slug}`} passHref>
            <Card
              key={movie.id}
              onMouseEnter={() => handleMouseEnter(movie.id, "trending")}
              onMouseLeave={handleMouseLeave}
              sx={{ position: "relative" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  src={movie.thumbnail}
                  alt={movie.title}
                  loading="lazy"
                  sx={{ height: 182, width: 342, objectFit: "cover" }}
                />
                {hoveredIndex &&
                  hoveredIndex.id === movie.id &&
                  hoveredIndex.listName === "trending" && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px",
                        background:
                          "linear-gradient(transparent, rgba(0, 0, 0, 0.7))",
                        transition: "opacity 0.3s",
                      }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => {
                          // Handle play button click
                        }}
                      >
                        <PlayArrow sx={{ color: "white" }} />
                      </IconButton>
                      <BookmarkButton slug={movie.slug} />
                    </Box>
                  )}
              </CardActionArea>
            </Card>
          </Link>
        ))}
        {/* Left arrow for trending movies */}
        <IconButton
          color="primary"
          disabled={trendingScrollX === 0}
          onClick={() => handleTrendingScroll(-200)}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <ArrowBackIosRoundedIcon sx={{ color: "white" }} />
        </IconButton>
        {/* Right arrow for trending movies */}
        <IconButton
          color="primary"
          onClick={() => handleTrendingScroll(200)}
          sx={{
            position: "sticky",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <ArrowForwardIosRoundedIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <Typography variant="h4" sx={{ color: "white", marginBottom: "2rem" }}>
        Recommended movies
      </Typography>
      <Box
        ref={recommendedListRef}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
          marginBottom: "2rem",
          gap: 2,
          scrollbarWidth: "none",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {randomMovies.map((movie: any, index: number) => (
          <Link key={movie.id} href={`/movie/${movie.slug}`} passHref>
            <Card
              key={movie.id}
              onMouseEnter={() => handleMouseEnter(movie.id, "recommended")}
              onMouseLeave={handleMouseLeave}
              sx={{ position: "relative" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  src={movie.thumbnail}
                  alt={movie.title}
                  loading="lazy"
                  sx={{ height: 182, width: 342, objectFit: "cover" }}
                />
                {hoveredIndex &&
                  hoveredIndex.id === movie.id &&
                  hoveredIndex.listName === "recommended" && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px",
                        background:
                          "linear-gradient(transparent, rgba(0, 0, 0, 0.7))",
                        transition: "opacity 0.3s",
                      }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => {
                          // Handle play button click
                        }}
                      >
                        <PlayArrow sx={{ color: "white" }} />
                      </IconButton>
                      <BookmarkButton slug={movie.slug} />
                    </Box>
                  )}
              </CardActionArea>
            </Card>
          </Link>
        ))}
        {/* Left arrow for trending movies */}
        <IconButton
          color="primary"
          disabled={recommendedScrollX === 0}
          onClick={() => handleRecommendedScroll(-200)}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <ArrowBackIosRoundedIcon sx={{ color: "white" }} />
        </IconButton>
        {/* Right arrow for trending movies */}
        <IconButton
          color="primary"
          onClick={() => handleRecommendedScroll(200)}
          sx={{
            position: "sticky",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <ArrowForwardIosRoundedIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <Typography
        variant="h4"
        sx={{ color: "white", marginBottom: "2rem", marginTop: "2rem" }}
      >
        Drama
      </Typography>

      <Box
        ref={genreListRef}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
          marginBottom: "2rem",
          gap: 2,
          scrollbarWidth: "none",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {genreMovies.map((movie, index) => (
          <Link key={movie.id} href={`/movie/${movie.slug}`} passHref>
            <Card
              key={movie.id}
              onMouseEnter={() => handleMouseEnter(movie.id, "genre")}
              onMouseLeave={handleMouseLeave}
              sx={{ position: "relative" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  src={movie.thumbnail}
                  alt={movie.title}
                  loading="lazy"
                  sx={{ height: 182, width: 342, objectFit: "cover" }}
                />
                {hoveredIndex &&
                  hoveredIndex.id === movie.id &&
                  hoveredIndex.listName === "genre" && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px",
                        background:
                          "linear-gradient(transparent, rgba(0, 0, 0, 0.7))",
                        transition: "opacity 0.3s",
                      }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => {
                          // Handle play button click
                        }}
                      >
                        <PlayArrow sx={{ color: "white" }} />
                      </IconButton>
                      <BookmarkButton slug={movie.slug} />
                    </Box>
                  )}
              </CardActionArea>
            </Card>
          </Link>
        ))}
        {/* Left arrow for genre movies */}
        <IconButton
          color="primary"
          disabled={genreScrollX === 0}
          onClick={() => handleGenreScroll(-200)}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <ArrowBackIosRoundedIcon sx={{ color: "white" }} />
        </IconButton>
        {/* Right arrow for genre movies */}
        <IconButton
          color="primary"
          onClick={() => handleGenreScroll(200)}
          sx={{
            position: "sticky",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <ArrowForwardIosRoundedIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <Typography variant="h4" sx={{ color: "white", marginBottom: "2rem" }}>
        All movies
      </Typography>
      <Box
        ref={allMoviesListRef}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
          marginBottom: "2rem",
          gap: 2,
          scrollbarWidth: "none",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {/* All movies */}
        {movies.map((movie, index) => (
          <Link key={movie.id} href={`/movie/${movie.slug}`} passHref>
            <Card
              key={movie.id}
              onMouseEnter={() => handleMouseEnter(movie.id, "allMovies")}
              onMouseLeave={handleMouseLeave}
              sx={{ position: "relative" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  src={movie.thumbnail}
                  alt={movie.title}
                  loading="lazy"
                  sx={{ height: 182, width: 342, objectFit: "cover" }}
                />
                {hoveredIndex &&
                  hoveredIndex.id === movie.id &&
                  hoveredIndex.listName === "allMovies" && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px",
                        background:
                          "linear-gradient(transparent, rgba(0, 0, 0, 0.7))",
                        transition: "opacity 0.3s",
                      }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => {
                          // Handle play button click
                        }}
                      >
                        <PlayArrow sx={{ color: "white" }} />
                      </IconButton>
                      <BookmarkButton slug={movie.slug} />
                    </Box>
                  )}
              </CardActionArea>
            </Card>
          </Link>
        ))}
        {/* Left arrow for trending movies */}
        <IconButton
          color="primary"
          disabled={allMoviesScrollX === 0}
          onClick={() => handleAllMoviesScroll(-200)}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <ArrowBackIosRoundedIcon sx={{ color: "white" }} />
        </IconButton>
        {/* Right arrow for trending movies */}
        <IconButton
          color="primary"
          onClick={() => handleAllMoviesScroll(200)}
          sx={{
            position: "sticky",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <ArrowForwardIosRoundedIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Box>
  );
}
