'use client';
import React from 'react';
import './FolderTabs.css';

export default function FolderTabs({ folders, activeFolderId, onFolderSelect, onCreateFolder, onDeleteFolder, onRenameFolder }) {
  const [isCreating, setIsCreating] = React.useState(false);
  const [newName, setNewName] = React.useState('');
  const [menu, setMenu] = React.useState(null);
  const [renameId, setRenameId] = React.useState(null);
  const [renameValue, setRenameValue] = React.useState('');

  React.useEffect(() => {
    if (!menu) return;
    function handler() { setMenu(null); }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menu]);

  function handleContextMenu(e, folder) {
    e.preventDefault();
    const x = Math.min(e.clientX, window.innerWidth - 172);
    const y = Math.min(e.clientY, window.innerHeight - 90);
    setMenu({ id: folder._id, name: folder.name, x, y });
  }

  function startRename(folder) {
    setMenu(null);
    setRenameId(folder.id);
    setRenameValue(folder.name);
  }

  function submitRename(id) {
    if (renameValue.trim()) onRenameFolder(id, renameValue.trim());
    setRenameId(null);
    setRenameValue('');
  }

  function handleRenameKeyDown(e, id) {
    if (e.key === 'Enter') submitRename(id);
    if (e.key === 'Escape') { setRenameId(null); setRenameValue(''); }
  }

  function handleCreateSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    onCreateFolder(newName.trim());
    setNewName('');
    setIsCreating(false);
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
            {renameId === f._id ? (
              <input
                className="folder-tabs__rename-input"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onBlur={() => submitRename(f._id)}
                onKeyDown={(e) => handleRenameKeyDown(e, f._id)}
                autoFocus
              />
            ) : (
              <button
                className={`folder-tabs__tab${activeFolderId === f._id ? ' folder-tabs__tab_active' : ''}`}
                onClick={() => onFolderSelect(f._id)}
                onContextMenu={(e) => handleContextMenu(e, f)}
              >
                {f.name}
              </button>
            )}
          </div>
        ))}
        <button className="folder-tabs__add" onClick={() => setIsCreating(true)}>+</button>
      </div>

      {isCreating && (
        <form className="folder-tabs__form" onSubmit={handleCreateSubmit}>
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

      {menu && (
        <div
          className="folder-tabs__context-menu"
          style={{ top: menu.y, left: menu.x }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button type="button" className="folder-tabs__context-item" onClick={() => startRename({ id: menu.id, name: menu.name })}>
            Переименовать
          </button>
          <div className="folder-tabs__context-separator" />
          <button
            type="button"
            className="folder-tabs__context-item folder-tabs__context-item_danger"
            onClick={() => { onDeleteFolder(menu.id); setMenu(null); }}
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}
