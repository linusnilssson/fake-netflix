import movies from '../../data/movies.json'; 
import React, { useState } from 'react';
import CustomSearch from './CustomSearch';

// Funktionen för att söka filmer
const searchMovies = async (query: string) => {
  // Filtrera filmer baserat på söktermen
  const filteredMovies = movies.filter((movie: { title: string; synopsis: string; slug: string; }) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  //  fördröjning 
  await new Promise(resolve => setTimeout(resolve, 1000));

  return filteredMovies;
};

// Söksidan komponenten
const SearchContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{ title: string; synopsis: string; slug: string; }[]>([]);

  const handleSearch = async (query: string) => {
    const results = await searchMovies(query);

    setSearchResults(results);
  };

  return (
    <div>
      <CustomSearch handleSearch={handleSearch} />
      
      {/* Rendera sökresultaten i en lista */}
      <ul>
        {searchResults.map((movie: any) => (
          <li key={movie.title}>
            {/* Här för  fler saker */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchContainer;
