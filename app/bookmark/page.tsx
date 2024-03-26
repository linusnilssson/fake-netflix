import { Box, Card, CardMedia, Typography } from "@mui/material";
import movies from "../../data/movies.json";

export default function BookmarkPage() {
  return (
    <Box sx={{ backgroundColor: "#000000", p: 2 }}>
      <Typography variant="h4" sx={{ color: "white" }}>
        Bookmark Page
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        }}
      >
        {movies.map((movie, index) => (
          <Card key={index} sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              src={movie.thumbnail}
              alt={movie.title}
              loading="lazy"
              sx={{ height: 200, objectFit: "cover" }}
            />
          </Card>
        ))}
      </Box>
    </Box>
  );
}
