"use client"
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import movies from "../../data/movies.json";

export default function BookmarkPage() {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<string[]>([]);
  return (
    <Box sx={{ backgroundColor: "#000000", p: 2 }}>
      <Typography variant="h4" sx={{ color: "white" }}>
        Bookmark Page
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {movies
          .filter((movie) => bookmarkedMovies.includes(movie.slug))
          .map((movie, index) => (
            <Card key={index} sx={{ minWidth: 200, position: "relative" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  src={movie.thumbnail}
                  alt={movie.title}
                  loading="lazy"
                  sx={{ height: 300, objectFit: "cover" }}
                />
                {/* Du kan lägga till annan information här som titel, beskrivning etc. */}
              </CardActionArea>
            </Card>
          ))}
      </Box>
    </Box>
  );
}
