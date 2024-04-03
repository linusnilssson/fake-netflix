"use client";
import { CheckRounded } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { useMovies } from "../context/MovieContext";

export default function BookmarkPage() {
  const { bookmarkedMovies, toggleBookmark } = useMovies();

  const handleRemoveBookmark = (slug: string) => {
    toggleBookmark(slug);
  };

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
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
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
                  sx={{ height: 182, width: 342, objectFit: "cover" }}
                />
              </Link>
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
                  opacity: 0,
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: 300,
                    padding: "8px",
                  }}
                >
                  {movie.year} | Rating: {movie.rating}
                </Typography>
                <IconButton
                  color="primary"
                  onClick={() => handleRemoveBookmark(movie.slug)}
                >
                  <CheckRounded sx={{ color: "white" }} />
                </IconButton>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
