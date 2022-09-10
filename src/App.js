import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [dummyMovies, setDummyMovies] = useState([]);

  const btnClickHandler = async () => {
    const url = `https://swapi.dev/api/films`;
    const response = await fetch(url);
    const data = await response.json();
    const transformedMovies = data.results.map((movie) => {
      return {
        id: movie["episode_id"],
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date,
      };
    });
    setDummyMovies(transformedMovies);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={btnClickHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={dummyMovies} />
      </section>
    </React.Fragment>
  );
}

export default App;
