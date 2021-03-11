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
              <Link className="rf-sidemenu__link" to="/structures">
                <div className="rf-container">
                  <div className="rf-grid-row rf-grid-row--middle">
                    <div className="rf-col alignRight">
                      <span className="rf-fi-search-line"></span>
                    </div>
                    <div className="rf-col rf-p-1v">
                      Liste des structures
                    </div>
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
