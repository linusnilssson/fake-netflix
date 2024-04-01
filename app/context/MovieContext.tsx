"use client";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import moviesData from "../../data/movies.json";

export interface Movie {
  title: string;
  year: number;
  rating: string;
  actors: string[];
  genre: string;
  synopsis: string;
  thumbnail: string;
  isTrending?: boolean;
  slug: string;
  background: string;
}

interface MovieContextValue {
  movies: Movie[];
  bookmarkedMovies: Movie[];
  toggleBookmark: (slug: string) => void;
}

const MovieContext = createContext<MovieContextValue>({
  movies: [],
  bookmarkedMovies: [],
  toggleBookmark: () => {},
});

export default function MovieProvider(props: PropsWithChildren<{}>) {
  const [movies, setMovies] = useState<Movie[]>(moviesData);
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>(() => {
    const savedBookmarked = localStorage.getItem("bookmarkedMovies");
    return savedBookmarked ? JSON.parse(savedBookmarked) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookmarkedMovies", JSON.stringify(bookmarkedMovies));
  }, [bookmarkedMovies]);

  const toggleBookmark = (slug: string) => {
    setBookmarkedMovies((prevBookmarked) => {
      const isBookmarked = prevBookmarked.some((movie) => movie.slug === slug);
      if (isBookmarked) {
        return prevBookmarked.filter((movie) => movie.slug !== slug);
      } else {
        const movieToAdd = movies.find((movie) => movie.slug === slug);
        if (movieToAdd) {
          return [...prevBookmarked, movieToAdd];
        }
      }
      return prevBookmarked;
    });
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        bookmarkedMovies,
        toggleBookmark,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
}

export const useMovies = () => useContext(MovieContext);
