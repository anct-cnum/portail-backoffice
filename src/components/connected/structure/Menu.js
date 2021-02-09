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
              <Link className="rf-sidemenu__link" to="/structure/conseillers/nouvelle">Mes conseillers</Link>
            </li>
            <li className={`rf-sidemenu__item ${location.pathname === '/structure/informations' ? 'rf-sidemenu__item--active' : ''}`}>
              <Link className="rf-sidemenu__link" to="/structure/informations">Mes informations</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
