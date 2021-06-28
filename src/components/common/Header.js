import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions';

function Header(connected) {
  const dispatch = useDispatch();
  const connect = useSelector(state => state.authentication?.user?.user);
  const user = useSelector(state => state?.user?.userId);
  const location = useLocation();
  const role = new URLSearchParams(location.search).get('role') ? new URLSearchParams(location.search).get('role') : connect?.role;

  useEffect(async () => {
    await dispatch(userActions.getUtilisateur(connect?._id));
  }, []);

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
              <div className="rf-header__navbar" style={{ marginBottom: '18px' }}>
                <div className="rf-service">
                  <a className="rf-service__title titrage" href="/" title="Portail Conseiller Numérique">
                    Votre espace Conseiller Numérique France Services
                  </a>
                  { role === 'structure' &&
                    <p className="rf-service__tagline">Espace de gestion des candidatures</p>
                  }
                  { role === 'prefet' &&
                    <p className="rf-service__tagline">Espace de visualisation des structures</p>
                  }
                </div>
              </div>
              { connected &&
                <div className="rf-header__tools" style={{ marginBottom: '33px', display: 'flex' }}>
                  <div className="rf-shortcuts">
                    <ul className="rf-shortcuts__list">
                      <li className="rf-shortcuts__item">
                        <span>
                          {role === 'admin' || role === 'prefet' ?
                            <ul className="rf-nav-list">
                              <li className="rf-nav__item">
                                <button className="rf-sidemenu__btn" aria-expanded="false" aria-controls="menu-776" aria-current="false">
                                  <h3 className="rf-tile__title">
                                    <span className="rf-fi-account-fill rf-ml-10v" /> {user?.name}
                                  </h3>
                                </button>
                                <div className="rf-collapse rf-nav--expanded" id="menu-776">
                                  <ul className="rf-menu__list" style={{ paddingInlineStart: '3rem', marginTop: '1rem' }}>
                                    <li>
                                      <Link to={'/mon-compte'}>Mon compte</Link>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            </ul> :
                            <h3 className="rf-tile__title">
                              <span className="rf-fi-account-fill" /> {connect?.name}
                            </h3>
                          }
                        </span>
                      </li>
                      <li className="rf-shortcuts__item">
                        <Link className="rf-btn rf-btn--sm" to={`/login?role=${role}`}>Se déconnecter&nbsp;<i className="ri-logout-box-r-line"></i></Link>
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
