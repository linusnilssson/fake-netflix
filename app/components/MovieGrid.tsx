"use client";
import { Box, Card, CardMedia } from "@mui/material";
import movies from "../../data/movies.json";

export default function MovieGrid() {
  return (
    <Box
      sx={{
        backgroundColor: "#000000",
        display: "grid",
        gap: 2,
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        p: 2,
      }}
    >
      {movies.map((movie, index) => (
        <Card key={index} sx={{ display: "flex", flexDirection: "column" }}>
          <CardMedia
            component="img"
            src={movie.thumbnail}
            alt={movie.title}
            loading="lazy"
            sx={{ height: 300, objectFit: "cover" }}
          />
        </Card>
      ))}
    </Box>
  );
}
