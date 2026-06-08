'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import imageSavedMovies from '@/images/movies-card__image-saved-movies.svg';
import imageDeleteMovies from '@/images/movies-card__button-delete.svg';
import './MoviesCard.css';

export default function MoviesCard({ onDelete, thumbnail, name, time, trailerLink, onSave, movie, savedMovieList }) {
  const hours = Math.floor(time / 60);
  const minutes = Math.floor(time - hours * 60);
  const pathname = usePathname();
  const onSaved = savedMovieList.some((savedMovie) => savedMovie.movieId === movie.id);

  return (
    <li className="movies-card">
      <Link href={trailerLink} className="movies-card__trailer-link" target="_blank" rel="noopener noreferrer">
        <img className="movies-card__image" src={thumbnail} alt={name} />
      </Link>
      {pathname === '/saved-movies' && (
        <button type="button" className="movies-card__button-delete" onClick={() => onDelete(movie)}>
          <img className="movies-card__image-delete" src={imageDeleteMovies.src} alt="Удалить" />
        </button>
      )}
      {pathname === '/movies' && (
        onSaved ? (
          <button type="button" className="movies-card__button-delete-movies" onClick={() => onDelete(movie)}>
            <img className="movies-card__image-saved-movies" src={imageSavedMovies.src} alt="Убрать из сохранённых" />
          </button>
        ) : (
          <button aria-label="Сохранить" className="movies-card__button-unsave" type="button" onClick={() => onSave(movie)}>
            Сохранить
          </button>
        )
      )}
      <div className="movies-card__box">
        <h2 className="movies-card__name">{name}</h2>
        <p className="movies-card__time">{hours}ч {minutes}м</p>
      </div>
    </li>
  );
}
