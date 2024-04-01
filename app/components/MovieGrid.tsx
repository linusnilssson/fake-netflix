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

export default function MovieGrid() {
  const [recommendedScrollX, setRecommendedScrollX] = useState(0);
  const [trendingScrollX, setTrendingScrollX] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const [randomMovies, setRandomMovies] = useState<any>([]);

  const recommendedListRef = useRef<HTMLDivElement | null>(null);
  const trendingListRef = useRef<HTMLDivElement | null>(null);

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

  const handleMouseEnter = (index: number) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
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

  return (
    <Box sx={{ backgroundColor: "#000000", p: 2 }}>
      <Typography variant="h3" sx={{ color: "white", mb: 2 }}>
        Trending movies
      </Typography>
      <Box
        ref={trendingListRef}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
          gap: 2,
          scrollbarWidth: "none",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {/* Trending movies */}
        {trendingMovies.map((movie, index) => (
          <Link key={index} href={`/movie/${movie.slug}`} passHref>
            <Card
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
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
                {hovered === index && (
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
            position: "absolute",
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

      <Typography variant="h3" sx={{ color: "white", mb: 2 }}>
        Recommended movies
      </Typography>
      <Box
        ref={recommendedListRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          scrollbarWidth: "none",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {randomMovies.map((movie: any, index: number) => (
          <Link key={index} href={`/movie/${movie.slug}`} passHref>
            <Card
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              sx={{ height: 182, width: 342, objectFit: "cover" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  src={movie.thumbnail}
                  alt={movie.title}
                  loading="lazy"
                  sx={{ objectFit: "cover" }}
                />
                {hovered === index && (
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
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <IconButton
          color="primary"
          disabled={recommendedScrollX === 0}
          onClick={() => handleRecommendedScroll(-200)}
        >
          <ArrowBackIosRoundedIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton
          color="primary"
          onClick={() => handleRecommendedScroll(200)}
        >
          <ArrowForwardIosRoundedIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <Typography variant="h3" sx={{ color: "white", mb: 2 }}>
        All movies
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fill, minmax(182px, 1fr))",
        }}
      >
        {movies.map((movie, index) => (
          <Link key={index} href={`/movie/${movie.slug}`} passHref>
            <Card
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              sx={{ height: 192, width: 342, position: "relative" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  src={movie.thumbnail}
                  alt={movie.title}
                  loading="lazy"
                  sx={{ height: 192, width: 342, objectFit: "cover" }}
                />
                {hovered === index && (
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
      </Box>
    </Box>
  );
}
