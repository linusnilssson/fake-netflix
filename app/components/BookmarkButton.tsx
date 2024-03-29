"use client";
import { AddRounded, CheckRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useMovies } from "../context/MovieContext";

interface BookmarkButtonProps {
  slug: string;
  isBookmarked: boolean;
  onClick: (slug: string, e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function BookmarkButton({
  slug,
  isBookmarked,
  onClick,
}: BookmarkButtonProps) {
  const { toggleBookmark } = useMovies();

  return (
    <>
      <IconButton onClick={(e) => onClick(slug, e)}>
        {isBookmarked ? (
          <CheckRounded sx={{ color: "white" }} />
        ) : (
          <AddRounded sx={{ color: "white" }} />
        )}
      </IconButton>
    </>
  );
}
