"use client";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import { useMovies } from "../context/MovieContext";

export default function BookmarkPage() {
  const { bookmarkedMovies } = useMovies();

  console.log("Bookmarked Movies:", bookmarkedMovies);

  return (
    <Box sx={{ backgroundColor: "#000000", p: 2 }}>
      {bookmarkedMovies.length > 0 ? (
        <Typography variant="h4" sx={{ color: "white", paddingY: "2rem" }}>
          My list
        </Typography>
      ) : (
        <Typography variant="h4" sx={{ color: "white" }}>
          You have no movies in your list...
        </Typography>
      )}

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {bookmarkedMovies.map((movie) => (
          <Card key={movie.slug} sx={{ minWidth: 200, position: "relative" }}>
            <CardActionArea>
              <Link href={`/movie/${movie.slug}`}>
                <CardMedia
                  component="img"
                  src={movie.thumbnail}
                  alt={movie.title}
                  loading="lazy"
                  sx={{ height: 300, objectFit: "cover" }}
                />
              </Link>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
