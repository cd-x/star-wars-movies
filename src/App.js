import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [dummyMovies, setDummyMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const btnClickHandler = useCallback(async () => {
    setIsError(null);
    setIsLoading(true);
    let tempMovies = [];
    try {
      const url = `https://react-http-efd10-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error Occured while fetching Data !");
      }
      const data = await response.json();
      const transformedMovies = Object.keys(data).map((id) => {
        const movie = data[id];
        return {
          id: id,
          ...movie,
        };
      });
      tempMovies = transformedMovies;
    } catch (error) {
      setIsError(error.message);
    } finally {
      setDummyMovies(tempMovies);
      setIsLoading(false);
    }
  }, []);

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://react-http-efd10-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    btnClickHandler();
  }, [btnClickHandler]);

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={btnClickHandler}>Fetch Movies</button>
      </section>
      <section>
        {isError && (
          <p>
            {isError}
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
