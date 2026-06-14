'use client';
import React from 'react';
import './FolderTabs.css';

export default function FolderTabs({ folders, activeFolderId, onFolderSelect, onCreateFolder, onDeleteFolder }) {
  const [isCreating, setIsCreating] = React.useState(false);
  const [newName, setNewName] = React.useState('');
  const [confirmId, setConfirmId] = React.useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    onCreateFolder(newName.trim());
    setNewName('');
    setIsCreating(false);
  }

  function handleConfirmDelete(id) {
    onDeleteFolder(id);
    setConfirmId(null);
  }

  return (
    <div className="folder-tabs">
      <div className="folder-tabs__list">
        <button
          className={`folder-tabs__tab${!activeFolderId ? ' folder-tabs__tab_active' : ''}`}
          onClick={() => onFolderSelect(null)}
        >
          Все
        </button>
        {folders.map((f) => (
          <div key={f._id} className="folder-tabs__item">
            <button
              className={`folder-tabs__tab${activeFolderId === f._id ? ' folder-tabs__tab_active' : ''}`}
              onClick={() => onFolderSelect(f._id)}
            >
              {f.name}
            </button>
            {confirmId === f._id ? (
              <div className="folder-tabs__confirm-wrap">
                <span className="folder-tabs__confirm-text">Удалить?</span>
                <button type="button" className="folder-tabs__confirm-yes" onClick={() => handleConfirmDelete(f._id)}>Да</button>
                <button type="button" className="folder-tabs__confirm-no" onClick={() => setConfirmId(null)}>Нет</button>
              </div>
            ) : (
              <button
                className="folder-tabs__delete"
                aria-label="Удалить папку"
                onClick={() => setConfirmId(f._id)}
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button className="folder-tabs__add" onClick={() => setIsCreating(true)}>+</button>
      </div>
      {isCreating && (
        <form className="folder-tabs__form" onSubmit={handleSubmit}>
          <input
            className="folder-tabs__input"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Название папки"
            autoFocus
          />
          <button type="submit" className="folder-tabs__confirm">Создать</button>
          <button type="button" className="folder-tabs__cancel" onClick={() => { setIsCreating(false); setNewName(''); }}>
            Отмена
          </button>
        </form>
      )}
    </div>
  );
}
