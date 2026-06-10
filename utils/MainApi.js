class MainApi {
  _sendRequest(url, options) {
    return fetch(url, options).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res);
    });
  }

  getUserInfo() {
    return this._sendRequest('/api/users/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    });
  }

  updateUserInfo({ name, email }) {
    return this._sendRequest('/api/users/me', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });
  }

  getSavedMovies() {
    return this._sendRequest('/api/movies', {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    });
  }

  addMovie(movie) {
    return this._sendRequest('/api/movies', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id.toString(),
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    });
  }

  deleteMovie(movieId) {
    return this._sendRequest(`/api/movies/${movieId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    });
  }

  getRutubeSaved() {
    return this._sendRequest('/api/rutube-saved', {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    });
  }

  saveRutubeVideo(video) {
    return this._sendRequest('/api/rutube-saved', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(video),
    });
  }

  deleteRutubeVideo(id) {
    return this._sendRequest(`/api/rutube-saved/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    });
  }
}

const mainApi = new MainApi();
export default mainApi;
