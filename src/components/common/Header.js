import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header({ connected }) {

  const user = useSelector(state => state.authentication.user?.user);

  return (
    <header className="rf-header" role="banner">
      <div className="rf-container">
        <div className="rf-grid-row rf-grid-row--top">
          <div className="rf-col-1"></div>
          <div className="rf-col-10">
            <div className="rf-header__body">
              <a className="rf-header__operator" href="/" style={{ boxShadow: 'none' }}>
                <img src="/logos/logo-conseiller-numerique.svg" alt="logo Conseiller Numérique France Services" style={{ height: '50px' }}/>
              </a>
              <div className="rf-header__navbar" style={{ marginBottom: '34px' }}>
                <div className="rf-service">
                  <a className="rf-service__title titrage" href="/" title="Portail Conseiller Numérique">
                    Votre espace Conseiller Numérique France Services
                  </a>
                </div>
              </div>
              { connected &&
                <div className="rf-header__tools" style={{ marginBottom: '33px', display: 'flex' }}>
                  <div className="rf-shortcuts">
                    <ul className="rf-shortcuts__list">
                      <li className="rf-shortcuts__item">
                        <span>
                          <h3 className="rf-tile__title">
                            <span className="rf-fi-account-fill" /> {user?.name}
                          </h3>
                        </span>
                      </li>
                      <li className="rf-shortcuts__item">
                        <Link className="rf-btn rf-btn--sm" to="/login">Se déconnecter&nbsp;<i className="ri-logout-box-r-line"></i></Link>
                      </li>
                    </ul>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className="rf-col-1"></div>
        </div>
      </div>
    </header>
  );

}

Header.propTypes = {
  connected: PropTypes.bool
};

export default Header;
