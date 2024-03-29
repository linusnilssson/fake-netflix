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

              {/* Du kan lägga till annan information här som titel, beskrivning etc. */}
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
