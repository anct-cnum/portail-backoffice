export const filtersAndSortsActions = {
  updateOrder,
  updatePix,
  updateDiplome,
};

function updateOrder(order) {
  return dispatch => {
    dispatch(success(order));
  };

  function success(order) {
    return { type: 'UPDATE_ORDER', order };
  }
}

function updatePix(pix) {
  return dispatch => {
    dispatch(success(pix));
  };

  function success(pix) {
    return { type: 'UPDATE_PIX', pix };
  }
}

function updateDiplome(diplome) {
  return dispatch => {
    dispatch(success(diplome));
  };

  function success(diplome) {
    return { type: 'UPDATE_DIPLOME', diplome };
  }
}
