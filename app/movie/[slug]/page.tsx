"use client";

import { useRouter } from 'next/router';
import movies from "../../../data/movies.json";

export default function MoviePage() {
  const router = useRouter();
  const { slug: urlslug } = router.query;

  // Decode the slug from the URL
  const slug = decodeURIComponent(urlslug as string);

  // Use `slug` to get data about the movie
  const movie = movies.find(movie => movie.slug.toString() === slug);

  // Check if the movie exists
  if (!movie) {
    return <div>Filmen hittades inte</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.thumbnail} alt={movie.title} />
      <p>{movie.slug}</p>
      <p>{movie.rating}</p>
    </div>
  );
}