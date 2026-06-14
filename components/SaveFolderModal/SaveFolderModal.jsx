'use client';
import React from 'react';
import './SaveFolderModal.css';

export default function SaveFolderModal({ movie, folders, onConfirm, onClose, onCreateFolder }) {
  const [selectedId, setSelectedId] = React.useState('');
  const [isCreating, setIsCreating] = React.useState(false);
  const [newName, setNewName] = React.useState('');

  async function handleCreateAndSave(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    const folder = await onCreateFolder(newName.trim());
    onConfirm(folder?._id ?? null);
  }

  return (
    <div className="sfm">
      <div className="sfm__overlay" onClick={onClose} />
      <div className="sfm__box">
        <h3 className="sfm__title">Сохранить фильм</h3>
        <p className="sfm__movie-name">{movie.title}</p>
        <p className="sfm__label">Выберите папку</p>
        <div className="sfm__options">
          <button
            className={`sfm__option${selectedId === '' ? ' sfm__option_active' : ''}`}
            onClick={() => setSelectedId('')}
          >
            Без папки
          </button>
          {folders.map((f) => (
            <button
              key={f._id}
              className={`sfm__option${selectedId === f._id ? ' sfm__option_active' : ''}`}
              onClick={() => setSelectedId(f._id)}
            >
              {f.name}
            </button>
          ))}
        </div>
        {isCreating ? (
          <form className="sfm__new-form" onSubmit={handleCreateAndSave}>
            <input
              className="sfm__input"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Название новой папки"
              autoFocus
            />
            <button type="submit" className="sfm__create-confirm">Создать и сохранить</button>
            <button type="button" className="sfm__create-cancel" onClick={() => { setIsCreating(false); setNewName(''); }}>
              Отмена
            </button>
          </form>
        ) : (
          <button className="sfm__new-btn" onClick={() => setIsCreating(true)}>
            + Создать папку
          </button>
        )}
        <div className="sfm__actions">
          <button className="sfm__cancel" onClick={onClose}>Отмена</button>
          <button className="sfm__save" onClick={() => onConfirm(selectedId || null)}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
