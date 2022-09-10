import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [dummyMovies, setDummyMovies] = useState([]);

  const btnClickHandler = (event) => {
    event.preventDefault();
    const url = `https://swapi.dev/api/films`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const transformedMovies = data.results.map((movie) => {
            return {
              id: movie["episode_id"],
              title: movie.title,
              openingText: movie.opening_crawl,
              releaseDate: movie.release_date,
            };
          });
          setDummyMovies(transformedMovies);
        });
    } catch {
      console.log("Error fetching data !");
    }
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
