class MainApi {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getError(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
  }

  _getJSON(res) {
    if (res.ok) {
      return res.json();
    }

    return this._getError(res);
  }

  register({ email, name, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => {
        return this._getJSON(res);
      })
  }

  login({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        return this._getJSON(res)
      })
  }

  exitAccount() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
    })
      .then((res) => {
        return this._getJSON(res)
      })
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    })
      .then((res) => {
        return this._getJSON(res);
      });
  }

  editProfile(userParams) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({ ...userParams }),
    })
      .then((res) => {
        return this._getJSON(res);
      })
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    })
      .then((res) => {
        return this._getJSON(res);
      })
  }

  saveMovie(movieData) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(movieData),
      credentials: "include",
    })
      .then((res) => {
        return this._getJSON(res);
      })
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    })
      .then((res) => {
        this._getJSON(res)
      })
  }
}

const mainApi = new MainApi("https://api.ghostmodd.nomoreparties.co", {
  "Content-Type": "application/json",
  "Access-Control-Expose-Headers": "Set-Cookie",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Origin": "https://api.ghostmodd.nomoreparties.co"
});

export default mainApi;
