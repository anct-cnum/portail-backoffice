import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuActions } from '../../../actions';

import {
  Link,
  useLocation
} from 'react-router-dom';

function Menu() {
  const user = useSelector(state => state.authentication.user.user);

  const role = user.role;
  const location = useLocation();
  const dispatch = useDispatch();
  let menu = useSelector(state => state.menu);

  const toggleMenu = e => {
    //Toggle menu only on burger menu (not inside)
    if (e.target.id === 'sideMenu') {
      dispatch(menuActions.toggleMenu());
    }
  };

  const toggleNav = () => {
    dispatch(menuActions.toggleNav());
  };

  return (
    <nav id="sideMenu" className="Menu rf-sidemenu" aria-label="Menu latéral" onClick={toggleMenu}>
      <div className="rf-sidemenu__inner">

        {!menu.hiddenMenu &&
          <button className="rf-sidemenu__btn--sidemenu-toggle" aria-controls="rf-sidemenu-wrapper" aria-expanded={menu.expandNav} onClick={toggleNav}>
            Dans cette rubrique
          </button>
        }
        <div className={`rf-sidemenu__wrapper ${menu.expandNav && !menu.hiddenMenu ? 'rf-sidemenu__wrapper--expanded' : ''}`} id="rf-sidemenu-wrapper">
          <ul className="rf-sidemenu__list">
            { role === 'admin' &&
                <li className={`rf-sidemenu__item ${location.pathname.startsWith('/tableau-de-bord') ? 'rf-sidemenu__item--active' : ''}`}>
                  <Link className="rf-sidemenu__link" to="/tableau-de-bord" style={{ padding: '0.5rem 0' }}>
                    <div className="rf-container" style={{ padding: '0' }}>
                      <div className="rf-grid-row rf-grid-row--end" style={{ textAlign: 'end' }}>
                      Tableau de bord
                      </div>
                    </div>
                  </Link>
                </li>
            }
            { role === 'prefet' &&
              <li className={`rf-sidemenu__item ${location.pathname.startsWith('/etat-des-recrutements') ? 'rf-sidemenu__item--active' : ''}`}>
                <Link className="rf-sidemenu__link" to="/etat-des-recrutements" style={{ padding: '0.5rem 0' }}>
                  <div className="rf-container" style={{ padding: '0' }}>
                    <div className="rf-grid-row rf-grid-row--end liste-recrutes" style={{ textAlign: 'end' }}>
                    État des recrutements
                    </div>
                  </div>
                </Link>
              </li>
            }
            <li className={`rf-sidemenu__item ${location.pathname.startsWith('/structures') ? 'rf-sidemenu__item--active' : ''}`}>
              <Link className="rf-sidemenu__link" to="/structures" style={{ padding: '0.5rem 0' }}>
                <div className="rf-container" style={{ padding: '0' }}>
                  <div className="rf-grid-row rf-grid-row--end" style={{ textAlign: 'end' }}>
                    Liste des structures
                  </div>
                </div>
              </Link>
            </li>
            {role === 'admin' &&
              <li
                className={`rf-sidemenu__item ${location.pathname.startsWith('/candidats') ? 'rf-sidemenu__item--active' : ''}`}>
                <Link className="rf-sidemenu__link" to="/candidats" style={{ padding: '0.5rem 0' }}>
                  <div className="rf-container" style={{ padding: '0' }}>
                    <div className="rf-grid-row rf-grid-row--end" style={{ textAlign: 'end' }}>
                      Liste des candidats
                    </div>
                  </div>
                </Link>
              </li>
            }
            <li className={`rf-sidemenu__item ${location.pathname.startsWith('/liste-candidats-recrutes') ? 'rf-sidemenu__item--active' : ''}`}>
              <Link className="rf-sidemenu__link" to="/liste-candidats-recrutes" style={{ padding: '0.5rem 0' }}>
                <div className="rf-container" style={{ padding: '0' }}>
                  <div className="rf-grid-row rf-grid-row--end liste-recrutes" style={{ textAlign: 'end' }}>
                    Liste des candidats recrutés
                  </div>
                </div>
              </Link>
            </li>
            {role === 'admin' &&
              <li className={`rf-sidemenu__item ${location.pathname.startsWith('/inscription-prefet') ? 'rf-sidemenu__item--active' : ''}`}>
                <Link className="rf-sidemenu__link" to="/inscription-prefet" style={{ padding: '0.5rem 0' }}>
                  <div className="rf-container" style={{ padding: '0' }}>
                    <div className="rf-grid-row rf-grid-row--end liste-recrutes" style={{ textAlign: 'end' }}>
                      Invitation Espace Prefecture
                    </div>
                  </div>
                </Link>
              </li>
            }
            { role === 'prefet' &&
            <li className={`rf-sidemenu__item ${location.pathname === '/admin/documents' ? 'rf-sidemenu__item--active' : ''}`}>
              <Link className="rf-sidemenu__link" to="/admin/documents" style={{ padding: '0.5rem 0' }}>
                <div className="rf-container" style={{ padding: '0' }}>
                  <div className="rf-grid-row rf-grid-row--end" style={{ textAlign: 'end' }}>
                    Mes documents
                  </div>
                </div>
              </Link>
            </li>
            }
            <li className={`rf-sidemenu__item ${location.pathname.startsWith('/admin/exports') ? 'rf-sidemenu__item--active' : ''}`}>
              <Link className="rf-sidemenu__link" to="/admin/exports" style={{ padding: '0.5rem 0' }}>
                <div className="rf-container" style={{ padding: '0' }}>
                  <div className="rf-grid-row rf-grid-row--end" style={{ textAlign: 'end' }}>
                    Exports
                  </div>
                </div>
              </Link>
            </li>
            { role === 'prefet' &&
            <li className={`rf-sidemenu__item ${location.pathname.startsWith('/admin/formation') ? 'rf-sidemenu__item--active' : ''}`}>
              <Link className="rf-sidemenu__link" to="/admin/formation" style={{ padding: '0.5rem 0' }}>
                <div className="rf-container" style={{ padding: '0' }}>
                  <div className="rf-grid-row rf-grid-row--end" style={{ textAlign: 'end' }}>
                    Inscription en formation
                  </div>
                </div>
              </Link>
            </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
