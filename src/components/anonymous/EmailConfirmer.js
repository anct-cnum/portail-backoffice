import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions';
import PropTypes from 'prop-types';
import Header from '../common/Header';

function EmailConfirmer({ match }) {

  const token = match.params.token;
  const dispatch = useDispatch();
  const tokenVerified = useSelector(state => state.createAccount.tokenVerified);
  useEffect(() => {
    dispatch(userActions.verifyToken(token));

  }, []);
  setTimeout(() => {
    if (tokenVerified === true) {
      dispatch(userActions.confirmeUserEmail(token));
    }
  }, 1000);
  return (
    <div>
      <Header/>
      <div className="rf-container rf-mt-3w">
        <div className="rf-grid-row rf-grid-row--center">

          <div style={{ width: '50%', textAlign: 'center' }}>
            {tokenVerified === true &&
                  <p className="rf-label flashBag" style={{ fontSize: '16px' }}>
                  La confirmation de votre e-mail a été effectuée avec succès
                  &nbsp;
                    <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
                  </p>
            }
            {tokenVerified === false &&
                  <p className="rf-label flashBag labelError" style={{ fontSize: '16px' }}>
                  La confirmation de votre e-mail a échouer, <br/>
                  veuillez réessayer plus tard
                  </p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
EmailConfirmer.propTypes = {
  match: PropTypes.object
};

export default EmailConfirmer;
