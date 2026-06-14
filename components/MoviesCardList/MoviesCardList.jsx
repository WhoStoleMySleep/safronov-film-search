'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import MoviesCard from '@/components/MoviesCard/MoviesCard';
import './MoviesCardList.css';

function proxyImg(url) {
  if (!url) return '';
  return url.includes('kinopoiskapiunofficial.tech')
    ? `/api/poster?url=${encodeURIComponent(url)}`
    : url;
}

export default function MoviesCardList({ onDelete, movieList, savedMovieList, savedMoviesFilter, buttonAddMovies, setButtonAddMovies, onSave, arrMovies, arrSavedMovies, errorTextMovies, errorTextSavedMovies, folders = [], onMoveToFolder }) {
  const [sumMovies, setSumMovies] = React.useState(0);
  const [addedMovies, setAddedMovies] = React.useState(3);
  const pathname = usePathname();

  React.useEffect(() => {
    const updateLayout = () => {
      const w = window.innerWidth;
      if (w > 768) { setSumMovies(12); setAddedMovies(3); }
      else if (w > 480) { setSumMovies(8); setAddedMovies(2); }
      else { setSumMovies(5); setAddedMovies(2); }
    };
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [pathname]);

  React.useEffect(() => {
    setButtonAddMovies(sumMovies < movieList.length);
  }, [sumMovies, movieList.length]);

  return (
    <section className="movies-card-list">
      {pathname === '/movies' && (
        !arrMovies ? (
          errorTextMovies
            ? <p className="movies-card-list__title">Во время запроса произошла ошибка. Попробуйте ещё раз</p>
            : <h2 className="movies-card-list__title">Ничего не найдено</h2>
        ) : (
          <ul className="movies-card-list__items">
            {movieList.slice(0, sumMovies).map((movie) => (
              <MoviesCard movie={movie} onDelete={onDelete} key={movie.id} name={movie.title}
                thumbnail={proxyImg(movie.thumbnail)} time={movie.duration} videoUrl={movie.url}
                onSave={onSave} savedMovieList={savedMovieList} />
            ))}
          </ul>
        )
      )}
      {pathname === '/saved-movies' && (
        !arrSavedMovies ? (
          errorTextSavedMovies
            ? <p className="movies-card-list__title">Во время запроса произошла ошибка. Попробуйте ещё раз</p>
            : <h2 className="movies-card-list__title">Ничего не найдено</h2>
        ) : (
          <ul className="movies-card-list__items">
            {savedMoviesFilter.slice(0, sumMovies).map((movie) => (
              <MoviesCard movie={movie} onDelete={onDelete} key={movie._id} name={movie.title}
                thumbnail={proxyImg(movie.thumbnail)} time={movie.duration}
                videoUrl={`https://www.kinopoisk.ru/film/${movie.videoId}/`}
                onSave={onSave} savedMovieList={savedMovieList}
                folders={folders} onMoveToFolder={onMoveToFolder} />
            ))}
          </ul>
        )
      )}
      {buttonAddMovies && pathname === '/movies' && (
        <button className="movies-card-list__button" onClick={() => setSumMovies(sumMovies + addedMovies)}>Ещё</button>
      )}
    </section>
  );
}
