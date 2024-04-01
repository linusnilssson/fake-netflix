"use client";
import { AddRounded, CheckRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useMovies } from "../context/MovieContext";

export default function BookmarkButton({ slug }: { slug: string }) {
  const { bookmarkedMovies, toggleBookmark } = useMovies();

  const isBookmarked = bookmarkedMovies.some((movie) => movie.slug === slug);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleBookmark(slug);
  };

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        {isBookmarked ? (
          <CheckRounded sx={{ color: "white" }} />
        ) : (
          <AddRounded sx={{ color: "white" }} />
        )}
      </IconButton>
    </>
  );
}
