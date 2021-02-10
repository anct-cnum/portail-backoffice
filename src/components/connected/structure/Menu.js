import React from 'react';

import {
  Link
} from "react-router-dom";

import { useLocation } from 'react-router-dom'

function Menu() {

  const location = useLocation();

  return (
    <nav className="Menu rf-sidemenu" aria-label="Menu latéral">
      <div className="rf-sidemenu__inner">

        <button className="rf-sidemenu__btn--sidemenu-toggle" hidden aria-controls="rf-sidemenu-wrapper" aria-expanded="false">Dans cette rubrique</button>
        <div className="rf-sidemenu__wrapper" id="rf-sidemenu-wrapper">
          <ul className="rf-sidemenu__list">
            <li className={`rf-sidemenu__item ${location.pathname.startsWith('/structure/conseillers') ? 'rf-sidemenu__item--active' : ''}`}>
              <Link className="rf-sidemenu__link" to="/structure/conseillers/nouvelle">
                <div className="rf-container">
                  <div className="rf-grid-row rf-grid-row--middle">
                      <div className="rf-col alignRight">
                        <span className="rf-fi-search-line"></span>
                      </div>
                      <div className="rf-col rf-p-1v">
                        Mes conseillers
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li className={`rf-sidemenu__item ${location.pathname === '/structure/informations' ? 'rf-sidemenu__item--active' : ''}`}>
              <Link className="rf-sidemenu__link" to="/structure/informations">
                <div className="rf-container">
                  <div className="rf-grid-row rf-grid-row--middle rf-grid-row--center">
                      <div className="rf-col alignRight">
                        <span className="rf-fi-eye-line"></span>
                      </div>
                      <div className="rf-col rf-p-1v">
                        Mes informations
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
