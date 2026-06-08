'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import imageSavedMovies from '@/images/movies-card__image-saved-movies.svg';
import imageDeleteMovies from '@/images/movies-card__button-delete.svg';
import './MoviesCard.css';

async function openRutube(name) {
  const res = await fetch(`/api/rutube?q=${encodeURIComponent(name + ' трейлер')}`);
  const data = await res.json();
  window.open(data.url ?? `https://rutube.ru/search/?query=${encodeURIComponent(name)}`, '_blank');
}

export default function MoviesCard({ onDelete, thumbnail, name, time, trailerLink, onSave, movie, savedMovieList }) {
  const hours = Math.floor(time / 60);
  const minutes = Math.floor(time - hours * 60);
  const pathname = usePathname();
  const onSaved = savedMovieList.some((savedMovie) => savedMovie.movieId === movie.id);

  return (
    <li className="movies-card">
      <button type="button" className="movies-card__trailer-link" onClick={() => openRutube(name)}>
        <img className="movies-card__image" src={thumbnail} alt={name} />
      </button>
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
