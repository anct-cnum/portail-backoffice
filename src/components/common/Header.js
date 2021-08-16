import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { statsActions } from '../../actions';

function Header({ connected }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication?.user?.user);
  const totalConseillers = useSelector(state => state?.stats?.totalConseillers);
  const location = useLocation();
  const role = new URLSearchParams(location.search).get('role') ? new URLSearchParams(location.search).get('role') : user?.role;
  const [menu, setmenu] = useState(false);

  if (connected && (role === 'structure')) {
    useEffect(() => {
      if (totalConseillers === undefined) {
        dispatch(statsActions.getConseillersFinalisee());
      }
    }, [totalConseillers]);
  }

  const menuClick = () => {
    if (menu === false) {
      setmenu(true);
    } else {
      setmenu(false);
    }
  };

  return (
    <header className="rf-header" role="banner">
      <div className="">
        <div className="rf-grid-row rf-grid-row--top">
          <div className="rf-col-xs-1 rf-col-sm-2"/>
          <div className="rf-col-xs-11 rf-col-sm-9">
            <div className="rf-grid-row rf-mb-2w">
              <div className="rf-col-6">
                <div className="rf-header__body">
                  <a className="rf-header__operator" href="/" style={{ boxShadow: 'none' }}>
                    <img src="/logos/logo-conseiller-numerique.svg" alt="logo Conseiller Numérique France Services" style={{ height: '50px' }}/>
                  </a>
                  <div className="rf-header__navbar">
                    <div className="rf-service">
                      <a className="rf-service__title titrage" href="/" title="Portail Conseiller Numérique">
                        {connected ? `Espace ${role.charAt(0).toUpperCase() + role.slice(1)} - Conseiller Numérique France Services` :
                          'Votre espace Conseiller Numérique France Services' }
                      </a>
                      { role === 'structure' &&
                    <p className="rf-service__tagline">Espace de gestion des candidatures</p>
                      }
                      { role === 'prefet' &&
                    <p className="rf-service__tagline">Espace de visualisation des structures</p>
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="rf-col" style={{ textAlign: 'right' }}>
                { connected &&
                  <div className="rf-header__tools headerBottom">
                    <div className="rf-shortcuts">
                      {role === 'structure' &&
                        <div className="rf-header rf-mb-2v nombreTotalConseiller">
                          <img className="rf-col-xl-2 logoConseiller" src="/logos/conseiller-conseillere.svg"
                            alt="logo conseiller / conseillere de Conseiller Numérique France Services logoConseiller"/>
                          <p className="rf-mt-5v">
                      &nbsp;<strong>{totalConseillers}</strong> conseillers déjà recrutés dans le dispositif
                          </p>
                        </div>
                      }
                      { role !== 'structure' && <div className={role === 'admin' ? 'positionBlocAdmin' : 'positionBloc'} />}
                      <ul className="rf-shortcuts__list">
                        <li className="rf-shortcuts__item">
                          <span>
                            <ul className="rf-nav-list">
                              <li className="rf-nav__item">
                                <button className="rf-sidemenu__btn" onClick={menuClick} aria-expanded={menu} aria-controls="menu-776" aria-current="false">
                                  <h3 className="rf-tile__title">
                                    <span className="rf-fi-account-fill rf-ml-10v" /> {user?.name}
                                  </h3>
                                </button>
                                <div className={ menu === true ? 'rf-collapse--expanded' : 'rf-collapse rf-nav--expanded'} id="menu-776">
                                  <ul className="rf-menu__list" style={{ paddingInlineStart: '3rem', marginTop: '1rem' }}>
                                    <li>
                                      <Link to={'/mon-compte'}>Mon compte</Link>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            </ul>
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
