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
            <li className={`rf-sidemenu__item ${location.pathname.startsWith('/structures') ? 'rf-sidemenu__item--active' : ''}`}>
              <Link className="rf-sidemenu__link" to="/structures" style={{ padding: '0.5rem 0' }}>
                <div className="rf-container" style={{ padding: '0' }}>
                  <div className="rf-grid-row rf-grid-row--end">
                    Liste des structures
                  </div>
                </div>
              </Link>
            </li>
            <li className={`rf-sidemenu__item ${location.pathname === '/admin/documents' ? 'rf-sidemenu__item--active' : ''}`}>
              <Link className="rf-sidemenu__link" to="/admin/documents" style={{ padding: '0.5rem 0' }}>
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
