import { userService } from '../services/user.service.js';
import { history } from '../helpers';

export const userActions = {
  login,
  logout,
  verifyToken,
  verifyPrefetToken,
  choosePassword,
  inviteAccountsPrefet,
  forgottenPassword
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password)
    .then(
      data => {
        data.user.role = data.user.roles[0];
        delete data.user.roles;
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(data));
        dispatch(success(data));
        if (data.user.role === 'structure') {
          history.push('/structure/candidats/nouvelle');
        } else if (data.user.role === 'prefet') {
          history.push('/structures');
        } else if (data.user.role === 'admin') {
          history.push('/tableau-de-bord');
        }
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(user) {
    return { type: 'LOGIN_REQUEST', user };
  }
  function success(user) {
    return { type: 'LOGIN_SUCCESS', user };
  }
  function failure(error) {
    return { type: 'LOGIN_FAILURE', error };
  }
}

function logout() {
  userService.logout();
  return { type: 'LOGOUT' };
}

function verifyToken(token) {
  return dispatch => {
    dispatch(request(token));

    userService.verifyToken(token)
    .then(
      user => {
        user.role = user.roles[0];
        delete user.roles;
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(token) {
    return { type: 'VERIFY_TOKEN_REQUEST', token };
  }
  function success(user) {
    return { type: 'VERIFY_TOKEN_SUCCESS', user };
  }
  function failure(error) {
    return { type: 'VERIFY_TOKEN_FAILURE', error };
  }
}

function verifyPrefetToken(token) {
  return dispatch => {
    dispatch(request(token));

    userService.verifyPrefetToken(token)
    .then(
      result => {
        dispatch(success(result.isValid));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(token) {
    return { type: 'VERIFY_PREFET_TOKEN_REQUEST', token };
  }
  function success(isValid) {
    return { type: 'VERIFY_PREFET_TOKEN_SUCCESS', isValid };
  }
  function failure(error) {
    return { type: 'VERIFY_PREFET_TOKEN_FAILURE', error };
  }
}

function inviteAccountsPrefet(token, emails, departement) {
  return dispatch => {
    dispatch(request());

    userService.inviteAccountsPrefet(token, emails, departement)
    .then(
      () => {
        dispatch(success());
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'INVITING_PREFET_REQUEST' };
  }
  function success() {
    return { type: 'INVITING_PREFET_SUCCESS' };
  }
  function failure(error) {
    return { type: 'INVITING_PREFET_FAILURE', error };
  }
}

function choosePassword(token, password, typeEmail) {
  return dispatch => {
    dispatch(request(token));

    userService.choosePassword(token, password, typeEmail)
    .then(
      user => {
        user.role = user.roles[0];
        delete user.roles;
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(token) {
    return { type: 'CHOOSE_PASSWORD_REQUEST', token };
  }
  function success(user) {
    return { type: 'CHOOSE_PASSWORD_SUCCESS', user };
  }
  function failure(error) {
    return { type: 'CHOOSE_PASSWORD_FAILURE', error };
  }
}

function forgottenPassword(username) {
  return dispatch => {
    dispatch(request({ username }));
    userService.sendForgottenPasswordEmail(username)
    .then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(user) {
    return { type: 'SEND_EMAIL_REQUEST', user };
  }
  function success(user) {
    return { type: 'SEND_EMAIL_SUCCESS', user };
  }
  function failure(error) {
    return { type: 'SEND_EMAIL_FAILURE', error };
  }
}
