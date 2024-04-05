"use client"
import { Box, Card, CardActionArea, CardMedia, IconButton, Typography } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import Link from "next/link";
import { useState, useRef } from "react";
import movies from "../../data/movies.json";

export default function ComingSoonPage() {
  const comingSoonRef = useRef<HTMLDivElement | null>(null);
  const [comingSoonScrollX, setcomingSoonScrollX] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (id: number) => {
    setHoveredIndex(id);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handlecomingSoonScroll = (scrollOffset: number) => {
    if (comingSoonRef.current) {
      const newScrollX = comingSoonScrollX + scrollOffset * 4;
      comingSoonRef.current.scrollTo({
        left: newScrollX,
        behavior: "smooth",
      });
      setcomingSoonScrollX(newScrollX);
    }
  };

  // Filter out only "Coming soon" movies
  const comingSoonMovies = movies.filter((movie) => movie.comingSoon);

  return (
    
    <Box sx={{ 
        p: 2,
        minHeight: "70vh",
        background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(34,34,34,1) 100%)" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", marginBottom: "2rem", marginTop: "2rem" }}
      >
        Coming Soon
      </Typography>
      <Box
  ref={comingSoonRef}
  sx={{
    position: "relative", 
    display: "flex",
    alignItems: "center",
    marginBottom: "2rem",
    overflowX: "auto",
    gap: 2,
    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
  }}
>
        {comingSoonMovies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.slug}`} passHref>
            <Card
              key={movie.id}
              onMouseEnter={() => handleMouseEnter(movie.id)}
              onMouseLeave={handleMouseLeave}
              sx={{ position: "relative" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  src={movie.thumbnail}
                  alt={movie.title}
                  loading="lazy"
                  sx={{ height: 300, width: 240, objectFit: "fill" }}
                />
                {hoveredIndex === movie.id && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px",
                      background: "linear-gradient(transparent, rgba(0, 0, 0, 0.7))",
                      transition: "opacity 0.3s",
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
                      {movie.month} | {movie.year}
                    </Typography>
                  </Box>
                )}
              </CardActionArea>
            </Card>
          </Link>
        ))}
        
      </Box>
      <IconButton
    color="primary"
    disabled={comingSoonScrollX === 0}
    onClick={() => handlecomingSoonScroll(-200)}
    sx={{
      position: "absolute",
      left: "1.5rem",
      top: "50%",
      transform: "translateY(+50%)",
      zIndex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      },
    }}
  >
    <ArrowBackIosRoundedIcon sx={{ color: "white" }} />
  </IconButton>
  <IconButton
    color="primary"
    onClick={() => handlecomingSoonScroll(200)}
    sx={{
      position: "absolute",
      right: "1.5rem",
      top: "50%",
      transform: "translateY(+50%)",
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
  );
}