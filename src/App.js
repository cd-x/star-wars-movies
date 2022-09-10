import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [dummyMovies, setDummyMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const btnClickHandler = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);
    const url = `https://swapi.dev/api/films`;
    const response = await fetch(url);
    if (!response.ok) {
      setIsError(true);
    }
    const data = await response.json();
    const transformedMovies = data.results.map((movie) => {
      return {
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date,
      };
    });
    setDummyMovies(transformedMovies);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    btnClickHandler();
  }, [btnClickHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={btnClickHandler}>Fetch Movies</button>
      </section>
      <section>
        {isError && (
          <p>
            Error Occured while fetching data{" "}
            <span role="img" aria-label="Snowman">
              &#9731;
            </span>
          </p>
        )}
        {isLoading && !isError && <p>Loading...</p>}
        {!isLoading && !isError && dummyMovies.length === 0 && (
          <p>No Movies Found !</p>
        )}
        {!isLoading && !isError && <MoviesList movies={dummyMovies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
