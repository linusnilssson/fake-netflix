"use client";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { useRef, useState } from "react";
import movies from "../../data/movies.json";

export default function MovieGrid() {
  const [recommendedScrollX, setRecommendedScrollX] = useState(0);
  const [trendingScrollX, setTrendingScrollX] = useState(0);

  const recommendedListRef = useRef<HTMLDivElement | null>(null);
  const trendingListRef = useRef<HTMLDivElement | null>(null);

  const handleRecommendedScroll = (scrollOffset: number) => {
    if (recommendedListRef.current) {
      const newScrollX = recommendedScrollX + scrollOffset;
      recommendedListRef.current.scrollTo({
        left: newScrollX,
        behavior: "smooth",
      });
      setRecommendedScrollX(newScrollX);
    }
  };

  const handleTrendingScroll = (scrollOffset: number) => {
    if (trendingListRef.current) {
      const newScrollX = trendingScrollX + scrollOffset;
      trendingListRef.current.scrollTo({
        left: newScrollX,
        behavior: "smooth",
      });
      setTrendingScrollX(newScrollX);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#000000", p: 2 }}>
      <Typography variant="h3" sx={{ color: "white", mb: 2 }}>
        Trending movies
      </Typography>
      <Box
        ref={trendingListRef}
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
        {movies.map((movie, index) => (
          <Link key={index} href={`/movie/${movie.slug}`} passHref>
             <Card key={index} sx={{ minWidth: 200 }}>
              <CardMedia
                component="img"
                src={movie.thumbnail}
                alt={movie.title}
                loading="lazy"
                sx={{ height: 300, objectFit: "cover" }}
              />
            </Card>
          </Link>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <IconButton
          color="primary"
          disabled={trendingScrollX === 0}
          onClick={() => handleTrendingScroll(-200)}
        >
          <ArrowBack />
        </IconButton>
        <IconButton color="primary" onClick={() => handleTrendingScroll(200)}>
          <ArrowForward />
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
        {movies.map((movie, index) => (
          <Link key={index} href={`/movie/${movie.slug}`} passHref>
          <Card key={index} sx={{ minWidth: 200 }}>
            <CardMedia
              component="img"
              src={movie.thumbnail}
              alt={movie.title}
              loading="lazy"
              sx={{ height: 300, objectFit: "cover" }}
            />
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
          <ArrowBack />
        </IconButton>
        <IconButton
          color="primary"
          onClick={() => handleRecommendedScroll(200)}
        >
          <ArrowForward />
        </IconButton>
      </Box>

      <Typography variant="h3" sx={{ color: "white", mb: 2 }}>
        All movies
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {movies.map((movie, index) => (
          <Link key={index} href={`/movie/${movie.slug}`} passHref>
          <Card key={index} sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              src={movie.thumbnail}
              alt={movie.title}
              loading="lazy"
              sx={{ height: 300, objectFit: "cover" }}
            />
          </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
