"use client";
import { Box, Card, CardMedia } from "@mui/material";
import movies from "../../data/movies.json";

export default function MovieGrid() {
  return (
    <Box
      component="ul"
      sx={{
        backgroundColor: "#000000",
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        p: 0,
        m: 0,
      }}
    >
      {movies.map((movie, index) => (
        <Card
          key={index}
          component="li"
          sx={{ minWidth: 300, flexGrow: 1, margin: "1rem" }}
        >
          <CardMedia
            component="img"
            src={movie.thumbnail}
            alt={movie.title}
            loading="lazy"
            style={{ width: "100%", height: 300, objectFit: "cover" }}
          />
        </Card>
      ))}
    </Box>
  );
}
