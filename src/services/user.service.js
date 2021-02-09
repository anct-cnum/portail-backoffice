export const userService = {
  login,
  logout,
  verifyToken,
  choosePassword
}

function login(username, password) {

  const strategy = process.env.REACT_APP_STRATEGYAUTH;
  const apiUrlAuth = `${process.env.REACT_APP_API}/authentication`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "strategy": strategy,
      "name": username,
      "password": password
    })
  };

  return fetch(apiUrlAuth, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function verifyToken(token) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET'
  }

  let uri = `${apiUrlRoot}/users/verifyToken/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
};

function choosePassword(token, password) {
  const apiUrlRoot = process.env.REACT_APP_API;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "password": password
    })
  };

  let uri = `${apiUrlRoot}/users/choosePassword/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function logout() {
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        return Promise.reject({ error: 'Indentifiants incorrects' });
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
