import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header({ connected }) {
  const user = useSelector(state => state.authentication?.user?.user);
  const location = useLocation();
  const role = new URLSearchParams(location.search).get('role') ? new URLSearchParams(location.search).get('role') : user?.role;

  return (
    <header role="banner" className="fr-header">
      <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-header__body-row">
            <div className="fr-header__brand">
              <div className="fr-header__brand-top">
                <div className="fr-header__logo fr-col-2">
                  <a className="fr-header__operator" href="/" style={{ boxShadow: 'none' }}>
                    <img src="/logos/logo-conseiller-numerique.svg" alt="logo Conseiller Numérique France Services" className="logo-header"/>
                  </a>
                </div>
                <div className="fr-header__navbar">
                  <div className="fr-header__menu-links"></div>
                </div>
              </div>
              <div className="fr-header__service">
                <a href="/" title="Accueil - Conseiller Numérique France Services">
                  <p className="fr-header__service-title">
                    {connected ? `Espace ${role.charAt(0).toUpperCase() + role.slice(1)} - Conseiller Numérique France Services` :
                      'Votre espace Conseiller Numérique France Services' }
                  </p>
                </a>
                { role === 'structure' &&
                  <p className="fr-header__service-tagline">Espace de gestion des candidatures</p>
                }
                { role === 'prefet' &&
                  <p className="fr-header__service-tagline">Espace de visualisation des structures</p>
                }
              </div>
            </div>

            <div className="fr-header__tools">
              { connected &&
                <div className="fr-header__tools-links">
                  <ul className="fr-links-group">
                    <li>
                      <Link to="/mon-compte" title="Mon Compte">
                        <h3 className="fr-tile__title fr-mr-md-2w">
                          <span className="hide-md fr-ml-1v" ><i className="fr-fi-account-fill"></i></span>
                          <span className="show-md">{user?.name}</span>
                        </h3>
                      </Link>
                    </li>
                    <li>
                      <Link className="fr-btn fr-btn--sm fr-mr-md-2w" to={`/login?role=${role}`} title="Se déconnecter">
                        <i className="ri-logout-box-r-line"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </header>

  );
}

Header.propTypes = {
  connected: PropTypes.bool
};

export default Header;


/*
  <div className="fr-header__tools">
    <div className="fr-shortcuts">
      { role !== 'structure' && <div className={role === 'admin' ? 'positionBlocAdmin' : 'positionBloc'} />}
      <ul className="fr-shortcuts__list">
        <li className="fr-shortcuts__item">
          <span>
            <ul className="fr-nav-list">
              <li className="fr-nav__item">
                <button className="fr-sidemenu__btn" onClick={menuClick} aria-expanded={menu} aria-controls="menu-776" aria-current="false">
                  <h3 className="fr-tile__title">
                    <span className="fr-fi-account-fill fr-ml-10v" /> {user?.name}
                  </h3>
                </button>
                <div className={ menu === true ? 'fr-collapse--expanded' : 'fr-collapse fr-nav--expanded'} id="menu-776">
                  <ul className="fr-menu__list" style={{ paddingInlineStart: '3rem', marginTop: '1rem' }}>
                    <li>
                      <Link to={'/mon-compte'}>Mon compte</Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </span>
        </li>
        <li className="fr-shortcuts__item">
          <Link className="fr-btn fr-btn--sm" to={`/login?role=${role}`}>Se déconnecter&nbsp;<i className="ri-logout-box-r-line"></i></Link>
        </li>
      </ul>
    </div>
  </div>*/
