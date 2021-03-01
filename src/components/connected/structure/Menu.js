import React from 'react';

import {
  Link,
  useLocation
} from 'react-router-dom';

function Menu() {

  const location = useLocation();

  return (
    <nav className="Menu rf-sidemenu" aria-label="Menu latéral">
      <div className="rf-sidemenu__inner">

        <button className="rf-sidemenu__btn--sidemenu-toggle" hidden aria-controls="rf-sidemenu-wrapper" aria-expanded="false">Dans cette rubrique</button>
        <div className="rf-sidemenu__wrapper" id="rf-sidemenu-wrapper">
          <ul className="rf-sidemenu__list">
            <li className={`rf-sidemenu__item ${location.pathname.startsWith('/structure/conseillers') ? 'rf-sidemenu__item--active' : ''}`}>
              <Link className="rf-sidemenu__link" to="/structure/conseillers/nouvelle" style={{ padding: '0.5rem 0' }}>
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
