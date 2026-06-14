class MainApi {
  _sendRequest(url, options) {
    return fetch(url, options).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res);
    });
  }

  _authHeaders() {
    return { Authorization: `Bearer ${localStorage.getItem('jwt')}` };
  }

  _jsonHeaders() {
    return { ...this._authHeaders(), 'Content-Type': 'application/json' };
  }

  getUserInfo() {
    return this._sendRequest('/api/users/me', { headers: this._authHeaders() });
  }

  updateUserInfo({ name, email }) {
    return this._sendRequest('/api/users/me', {
      method: 'PATCH',
      headers: this._jsonHeaders(),
      body: JSON.stringify({ name, email }),
    });
  }

  getRutubeSaved() {
    return this._sendRequest('/api/rutube-saved', { headers: this._authHeaders() });
  }

  saveRutubeVideo(video) {
    return this._sendRequest('/api/rutube-saved', {
      method: 'POST',
      headers: this._jsonHeaders(),
      body: JSON.stringify(video),
    });
  }

  deleteRutubeVideo(id) {
    return this._sendRequest(`/api/rutube-saved/${id}`, {
      method: 'DELETE',
      headers: this._authHeaders(),
    });
  }

  moveVideoToFolder(videoId, folderId) {
    return this._sendRequest(`/api/rutube-saved/${videoId}`, {
      method: 'PATCH',
      headers: this._jsonHeaders(),
      body: JSON.stringify({ folderId }),
    });
  }

  getFolders() {
    return this._sendRequest('/api/folders', { headers: this._authHeaders() });
  }

  createFolder(name) {
    return this._sendRequest('/api/folders', {
      method: 'POST',
      headers: this._jsonHeaders(),
      body: JSON.stringify({ name }),
    });
  }

  renameFolder(id, name) {
    return this._sendRequest(`/api/folders/${id}`, {
      method: 'PATCH',
      headers: this._jsonHeaders(),
      body: JSON.stringify({ name }),
    });
  }

  deleteFolder(id) {
    return this._sendRequest(`/api/folders/${id}`, {
      method: 'DELETE',
      headers: this._authHeaders(),
    });
  }
}

const mainApi = new MainApi();
export default mainApi;
