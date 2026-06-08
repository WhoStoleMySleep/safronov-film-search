// Содержит описание запросов к сервису beatfilm-movies
class MoviesApi {
  constructor({ url }) {
    this._url = url;
  }
  _sendRequest(url, options) {
    return fetch(url, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      //если запрос ушел, но пришел ответ с ошибкой
      return new Error("Что-то пошло не так");
    });
  }

  // возвращает все фильмы
  getAllMovies() {
    return this._sendRequest(`${this._url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

const moviesApi = new MoviesApi({
  url: " https://api.nomoreparties.co/beatfilm-movies",
});

export default moviesApi;
