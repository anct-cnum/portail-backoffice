import { userService } from '../services/user.service.js';
import { history } from '../helpers';

export const userActions = {
  login,
  logout,
  verifyToken,
  inviteStructure,
  usersByStructure,
  choosePassword,
  inviteAccountsPrefet,
  forgottenPassword,
  updateUserEmail,
  confirmeUserEmail
};

function login(username, password) {

  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password)
    .then(
      data => {
        data.user.role = data.user.roles[0];
        if (data.user.roles.includes('structure_coop')) {
          data.user.role = 'structure_coop';
        }
        delete data.user.roles;
        if (data.user.role === 'structure_coop' || data.user.role === 'structure') {
          dispatch(failure('Vous n\'avez pas accès à cette application'));
        }
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(data));
        dispatch(success(data));
        if (data.user.role === 'prefet') {
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
      resultVerifyToken => {
        resultVerifyToken.role = resultVerifyToken.roles[0];
        delete resultVerifyToken.roles;
        dispatch(success(resultVerifyToken));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(token) {
    return { type: 'VERIFY_TOKEN_REQUEST', token };
  }
  function success(resultVerifyToken) {
    return { type: 'VERIFY_TOKEN_SUCCESS', resultVerifyToken };
  }
  function failure(error) {
    return { type: 'VERIFY_TOKEN_FAILURE', error };
  }
}

function inviteAccountsPrefet(emails, niveau) {
  return dispatch => {
    dispatch(request());

    userService.inviteAccountsPrefet(emails, niveau)
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

function inviteStructure(email, structureId) {
  return dispatch => {
    dispatch(request());

    userService.inviteStructure(email, structureId)
    .then(
      result => {
        dispatch(success(result.status));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'INVITING_STRUCTURE_REQUEST' };
  }
  function success(status) {
    return { type: 'INVITING_STRUCTURE_SUCCESS', status };
  }
  function failure(error) {
    return { type: 'INVITING_STRUCTURE_FAILURE', error };
  }
}

function usersByStructure(structureId) {
  return dispatch => {
    dispatch(request(structureId));

    userService.usersByStructure(structureId)
    .then(
      users => {
        users.forEach(user => {
          user.role = user.roles[0];
          delete user.roles;
        });
        dispatch(success(users));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(structureId) {
    return { type: 'GET_USERS_REQUEST', structureId };
  }
  function success(users) {
    return { type: 'GET_USERS_SUCCESS', users };
  }
  function failure(error) {
    return { type: 'GET_USERS_FAILURE', error };
  }
}

function choosePassword(token, password, typeEmail) {
  return dispatch => {
    dispatch(request(token));

    userService.choosePassword(token, password, typeEmail)
    .then(
      user => {
        if (user.roles.length > 1) {
          let result = user.roles.find(adminCoop => adminCoop !== 'admin_coop');
          user.role = result;
        } else {
          user.role = user.roles[0];
        }
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
  function success(resultChoosePassword) {
    return { type: 'CHOOSE_PASSWORD_SUCCESS', resultChoosePassword };
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
      response => {
        dispatch(success(response));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(user) {
    return { type: 'SEND_EMAIL_REQUEST', user };
  }
  function success(response) {
    return { type: 'SEND_EMAIL_SUCCESS', response };
  }
  function failure(error) {
    return { type: 'SEND_EMAIL_FAILURE', error };
  }
}

function updateUserEmail({ id, newEmail }) {
  return dispatch => {
    dispatch(request());
    userService.updateUserEmail(id, newEmail)
    .then(
      user => dispatch(success(user)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_USER_EMAIL_REQUEST' };
  }
  function success(user) {
    return { type: 'UPDATE_USER_EMAIL_SUCCESS', user };
  }
  function failure(error) {
    return { type: 'UPDATE_USER_EMAIL_FAILURE', error };
  }
}
function confirmeUserEmail(token) {
  return dispatch => {
    dispatch(request());
    userService.confirmeUserEmail(token)
    .then(
      user => dispatch(success(user)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'CONFIRMATION_UPDATE_USER_EMAIL_REQUEST' };
  }
  function success(user) {
    return { type: 'CONFIRMATION_UPDATE_USER_EMAIL_SUCCESS', user };
  }
  function failure(error) {
    return { type: 'CONFIRMATION_UPDATE_USER_EMAIL_FAILURE', error };
  }
}
