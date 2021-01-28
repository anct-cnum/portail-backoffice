export const userService = {
  login,
  logout,
}

function login(username, password) {

  const strategy = process.env.REACT_APP_STRATEGYAUTH;
  const apiUrlAuth = process.env.REACT_APP_APIAUTH;

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
