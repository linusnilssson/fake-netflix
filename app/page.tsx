import MovieGridComponent from "./components/MovieGrid";

export default async function Home() {
  const isSearching = false;

  return (
    <>{!isSearching && <MovieGridComponent isSearching={isSearching} />}</>
  );
}
