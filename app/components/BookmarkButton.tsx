"use client";
import { AddRounded, CheckRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useMovies } from "../context/MovieContext";

// interface BookmarkButtonProps {
//   slug: string;
//   isBookmarked: boolean;
//   onClick: (slug: string, e: React.MouseEvent<HTMLButtonElement>) => void;
// }

// const handleIconClick = (
//   index: number,
//   e: React.MouseEvent<HTMLButtonElement>
// ) => {
//   e.preventDefault();
//   const newIconState = [...iconState];
//   newIconState[index] = !newIconState[index];
//   setIconState(newIconState);

//   const movieToAdd = movies[index];
//   if (!bookmarkedMovies.includes(movieToAdd.slug)) {
//     setBookmarkedMovies((prevBookmarks) => [...prevBookmarks, movieToAdd.slug]);
//   } else {
//     setBookmarkedMovies((prevBookmarks) =>
//       prevBookmarks.filter((slug) => slug !== movieToAdd.slug)
//     );
//   }
// };

export default function BookmarkButton({ slug }: { slug: string }) {
  const { bookmarkedMovies, toggleBookmark } = useMovies();
  // // const [iconState, setIconState] = useState<Array<boolean>>(
  // //   Array(movies.length).fill(false)
  // // );
  // const [bookmarkedMovies, setBookmarkedMovies] = useState<string[]>([]);
  const isBookmarked = bookmarkedMovies.some((movie) => movie.slug === slug);

  return (
    <>
      <IconButton onClick={() => toggleBookmark(slug)} color="inherit">
        {isBookmarked ? (
          <CheckRounded sx={{ color: "white" }} />
        ) : (
          <AddRounded sx={{ color: "white" }} />
        )}
      </IconButton>
    </>
  );
}
