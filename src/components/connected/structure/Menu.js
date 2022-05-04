import React from 'react';
import { useSelector } from 'react-redux';

import {
  Link,
  useLocation
} from 'react-router-dom';

function Menu() {
  const user = useSelector(state => state.authentication.user.user);

  const role = user.role;
  const location = useLocation();

  return (

    <nav className="fr-sidemenu" role="navigation" aria-label="Menu latéral">

      <div className="fr-sidemenu__inner">

        <button className="fr-sidemenu__btn" aria-controls="fr-sidemenu-wrapper" aria-expanded="false">Dans cette rubrique</button>
        <div className="fr-collapse" id="fr-sidemenu-wrapper">
          <ul className="fr-sidemenu__list">

            <li className={`fr-sidemenu__item ${location.pathname.startsWith('/structure/informations') ? 'fr-sidemenu__item--active' : ''}`}>
              <Link className="fr-sidemenu__link" to="/structure/informations">
                  Informations
              </Link>
            </li>
            { role === 'structure_coop' &&
              <li className={`fr-sidemenu__item ${location.pathname.startsWith('/structure/suivi-de-pilotage') ? 'fr-sidemenu__item--active' : ''}`}>
                <Link className="fr-sidemenu__link" to="/structure/suivi-de-pilotage">
                  Suivi et pilotage des CnFS
                </Link>
              </li>
            }
            <li className="fr-sidemenu__item">
              <button className="fr-sidemenu__btn" aria-expanded="false" aria-controls="fr-sidemenu-recrutement">Recrutement</button>
              <div className="fr-collapse" id="fr-sidemenu-recrutement">
                <ul className="fr-sidemenu__list">
                  <li className={`fr-sidemenu__item ${location.pathname.startsWith('/structure/demarches') ? 'fr-sidemenu__item--active' : ''}`}>
                    <Link className="fr-sidemenu__link" to="/structure/demarches">
                      D&eacute;marches à effectuer
                    </Link>
                  </li>

                  <li className={`fr-sidemenu__item ${location.pathname.startsWith('/structure/candidats') ? 'fr-sidemenu__item--active' : ''}`}>
                    <Link className="fr-sidemenu__link" to="/structure/candidats/nouvelle">
                      Candidatures
                    </Link>
                  </li>

                  <li className={`fr-sidemenu__item ${location.pathname.startsWith('/structure/exports') ? 'fr-sidemenu__item--active' : ''}`}>
                    <Link className="fr-sidemenu__link" to="/structure/exports">
                      Exporter la liste
                    </Link>
                  </li>

                  <li className={`fr-sidemenu__item ${location.pathname.startsWith('/structure/recrutements') ? 'fr-sidemenu__item--active' : ''}`}>
                    <Link className="fr-sidemenu__link" to="/structure/recrutements">
                      Candidats recrut&eacute;s
                    </Link>
                  </li>

                  <li className={`fr-sidemenu__item ${location.pathname.startsWith('/structure/formation') ? 'fr-sidemenu__item--active' : ''}`}>
                    <Link className="fr-sidemenu__link" to="/structure/formation">
                      Inscription en formation
                    </Link>
                  </li>
                  <li className={`fr-sidemenu__item ${location.pathname.startsWith('/structure/certifications') ? 'fr-sidemenu__item--active' : ''}`}>
                    <Link className="fr-sidemenu__link" to="/structure/certifications">
                      Les certifications Pix et CCP1 REMN
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li className={`fr-sidemenu__item ${location.pathname === '/structure/documents' ? 'fr-sidemenu__item--active' : ''}`}>
              <Link className="fr-sidemenu__link" to="/structure/documents">
                    Documents
              </Link>
            </li>

            <li className={`fr-sidemenu__item ${location.pathname.startsWith('/structure/aide') ? 'fr-sidemenu__item--active' : ''}`}>
              <Link className="fr-sidemenu__link" to="/structure/aide">
                    Aide
              </Link>
            </li>

            <li className={`fr-sidemenu__item`}>
              <a className="fr-sidemenu__link menu-contact" href="mailto:conseiller-numerique@anct.gouv.fr">
                Nous contacter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
}

export default Menu;
