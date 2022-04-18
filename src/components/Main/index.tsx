import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import {
  Description,
  MainContainer,
  MovieContainer,
  MovieDetails,
  NotFound,
  Poster,
  SearchBtn,
} from "./styles";

interface Movie {
  adult: boolean;
  title: string;
  poster_path: string;
  overview: string;
}

export function Main() {
  const [movie, setMovie] = useState<Movie>();
  const [isTheMovieGenerated, setIsTheMovieGenerated] =
    useState<boolean>(false);
  const [notFoundStatusCode, setNotFoundStatusCode] = useState<boolean>(false);

  const getRandomId = () => {
    return Math.floor(Math.random() * 964423) + 1;
  };

  const generateMovie = async () => {
    try {
      const response: AxiosResponse<Movie> = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/${getRandomId()}?${
          import.meta.env.VITE_API_KEY
        }&${import.meta.env.VITE_LANGUAGE}&include_adult=false`
      );

      if (response.data.adult) {
        generateMovie();
      } else {
        setMovie(response.data);
        setIsTheMovieGenerated(true);
        setNotFoundStatusCode(false);
      }
    } catch (error: any) {
      if (error.response && error.response.status == 404) {
        setNotFoundStatusCode(true);
      }
    }
  };
  return (
    <MainContainer>
      <MovieContainer IsTheMovieGenerated={isTheMovieGenerated}>
        {movie && (
          <Poster notFound={notFoundStatusCode}>
            <img
              src={
                movie.poster_path != null
                  ? import.meta.env.VITE_IMG + "/" + movie.poster_path
                  : "http://www.ronaldoazambuja.com.br/wp-content/themes/trend/assets/img/empty/424x500.png"
              }
              alt={movie.title}
            />
            <MovieDetails>
              <strong>{movie.title}</strong>
              <p>{movie.overview}</p>
            </MovieDetails>
          </Poster>
        )}
        {notFoundStatusCode && (
          <NotFound>
            <img src="/assets/PosterNotFound.png" alt="Not Found" />
            <strong>
              Ops, hoje não é dia de assistir filme. Bora codar! 🚀
            </strong>
          </NotFound>
        )}
      </MovieContainer>
      <SearchBtn
        onClick={() => {
          generateMovie();
        }}
      >
        <img src="/assets/shuffle.svg" alt="RocketFlix" />
        <p>Encontrar filme</p>
      </SearchBtn>

      <Description>
        Clique em "Encontrar filme" que traremos informações de algum filme para
        você assistir hoje.
      </Description>
    </MainContainer>
  );
}
