'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import imageSavedMovies from '@/images/movies-card__image-saved-movies.svg';
import './MoviesCard.css';

export default function MoviesCard({ onDelete, thumbnail, name, time, videoUrl, onSave, movie, savedMovieList, folders = [], onMoveToFolder }) {
  const hours = Math.floor(time / 60);
  const minutes = Math.floor(time - hours * 60);
  const pathname = usePathname();
  const isSavedPage = pathname === '/saved-movies';
  const isMoviesPage = pathname === '/movies';
  const onSaved = savedMovieList.some((s) => s.videoId === movie.id);

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showFolderPick, setShowFolderPick] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    if (!menuOpen) return;
    function handler(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        setShowFolderPick(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  function toggleMenu() {
    setMenuOpen((v) => !v);
    setShowFolderPick(false);
  }

  function handleDeleteClick() {
    setMenuOpen(false);
    setShowFolderPick(false);
    setShowConfirm(true);
  }

  function handleMoveFolder(folderId) {
    onMoveToFolder(movie._id, folderId);
    setMenuOpen(false);
    setShowFolderPick(false);
  }

  return (
    <li className="movies-card">
      <button type="button" className="movies-card__trailer-link" onClick={() => window.open(videoUrl, '_blank')}>
        <img className="movies-card__image" src={thumbnail} alt={name} />
      </button>

      {isSavedPage && (
        <div className="movies-card__menu-wrap" ref={menuRef}>
          <button type="button" className="movies-card__menu-btn" onClick={toggleMenu} aria-label="Меню">
            ···
          </button>
          {menuOpen && (
            <div className="movies-card__dropdown">
              {showFolderPick ? (
                <div className="movies-card__folder-list">
                  <button
                    type="button"
                    className={`movies-card__folder-opt${!movie.folderId ? ' movies-card__folder-opt_active' : ''}`}
                    onClick={() => handleMoveFolder(null)}
                  >
                    Без папки
                  </button>
                  {folders.map((f) => (
                    <button
                      key={f._id}
                      type="button"
                      className={`movies-card__folder-opt${String(movie.folderId) === String(f._id) ? ' movies-card__folder-opt_active' : ''}`}
                      onClick={() => handleMoveFolder(f._id)}
                    >
                      {f.name}
                    </button>
                  ))}
                  <button type="button" className="movies-card__dropdown-back" onClick={() => setShowFolderPick(false)}>
                    ← Назад
                  </button>
                </div>
              ) : (
                <>
                  <button type="button" className="movies-card__dropdown-item" onClick={() => setShowFolderPick(true)}>
                    Изменить папку
                  </button>
                  <button type="button" className="movies-card__dropdown-item movies-card__dropdown-item_danger" onClick={handleDeleteClick}>
                    Удалить
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {isMoviesPage && (
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

      {showConfirm && (
        <div className="movies-card__confirm">
          <span className="movies-card__confirm-text">Удалить фильм?</span>
          <div className="movies-card__confirm-actions">
            <button type="button" className="movies-card__confirm-yes" onClick={() => { onDelete(movie); setShowConfirm(false); }}>Да</button>
            <button type="button" className="movies-card__confirm-no" onClick={() => setShowConfirm(false)}>Нет</button>
          </div>
        </div>
      )}
    </li>
  );
}
