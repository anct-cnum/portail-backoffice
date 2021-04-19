import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuActions } from '../../../actions';

import {
  Link,
  useLocation
} from 'react-router-dom';

function Menu() {

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
            <li className={`rf-sidemenu__item ${location.pathname.startsWith('/structure/candidats') ? 'rf-sidemenu__item--active' : ''}`}>
              <Link className="rf-sidemenu__link" to="/structure/candidats/nouvelle" style={{ padding: '0.5rem 0' }}>
                <div className="rf-container" style={{ padding: '0' }}>
                  <div className="rf-grid-row rf-grid-row--end">
                    Mes candidatures
                  </div>
                </div>
              </Link>
            </li>
            <li className={`rf-sidemenu__item ${location.pathname === '/structure/informations' ? 'rf-sidemenu__item--active' : ''}`}>
              <Link className="rf-sidemenu__link" to="/structure/informations" style={{ padding: '0.5rem 0' }}>
                <div className="rf-container" style={{ padding: '0' }}>
                  <div className="rf-grid-row rf-grid-row--end">
                    Mes informations
                  </div>
                </div>
              </Link>
            </li>
            <li className={`rf-sidemenu__item ${location.pathname === '/structure/documents' ? 'rf-sidemenu__item--active' : ''}`}>
              <Link className="rf-sidemenu__link" to="/structure/documents" style={{ padding: '0.5rem 0' }}>
                <div className="rf-container" style={{ padding: '0' }}>
                  <div className="rf-grid-row rf-grid-row--end">
                    Mes documents
                  </div>
                </div>
              </Link>
            </li>
            <li className={`rf-sidemenu__item ${location.pathname === '/structure/demarches' ? 'rf-sidemenu__item--active' : ''}`}>
              <Link className="rf-sidemenu__link" to="/structure/demarches" style={{ padding: '0.5rem 0' }}>
                <div className="rf-container" style={{ padding: '0' }}>
                  <div className="rf-grid-row rf-grid-row--end">
                    Mes démarches
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
