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

            { role === 'admin' &&
            <li className={`fr-sidemenu__item ${location.pathname.startsWith('/tableau-de-bord') ? 'fr-sidemenu__item--active' : ''}`}>
              <Link className="fr-sidemenu__link" to="/tableau-de-bord">
                Tableau de bord
              </Link>
            </li>
            }
            { role === 'prefet' &&
            <>
              <li className={`fr-sidemenu__item ${location.pathname.startsWith('/admin/suivi-de-pilotage') ? 'fr-sidemenu__item--active' : ''}`}>
                <Link className="fr-sidemenu__link" to="/admin/suivi-de-pilotage">
                  Suivi et pilotage des CnFS
                </Link>
              </li>
              <li className={`fr-sidemenu__item ${location.pathname.startsWith('/etat-des-recrutements') ? 'fr-sidemenu__item--active' : ''}`}>
                <Link className="fr-sidemenu__link" to="/etat-des-recrutements">
                  État des recrutements
                </Link>
              </li>
            </>
            }

            <li className={`fr-sidemenu__item ${location.pathname.startsWith('/structures') ? 'fr-sidemenu__item--active' : ''}`}>
              <Link className="fr-sidemenu__link" to="/structures">
                Liste des structures
              </Link>
            </li>
            { role === 'prefet' &&
              <li className={`fr-sidemenu__item`}>
                <Link className="fr-sidemenu__link" to="/admin/statistiques">
                    Statistiques des structures
                </Link>
              </li>
            }
            {role === 'admin' &&
            <li className={`fr-sidemenu__item ${location.pathname.startsWith('/candidats') ? 'fr-sidemenu__item--active' : ''}`}>
              <Link className="fr-sidemenu__link" to="/candidats">
                Liste des candidats
              </Link>
            </li>
            }

            <li className={`fr-sidemenu__item ${location.pathname.startsWith('/liste-candidats-recrutes') ? 'fr-sidemenu__item--active' : ''}`}>
              <Link className="fr-sidemenu__link" to="/liste-candidats-recrutes">
                Liste des candidats recrutés
              </Link>
            </li>

            {role === 'admin' &&
            <li className={`fr-sidemenu__item ${location.pathname.startsWith('/inscription-prefet') ? 'fr-sidemenu__item--active' : ''}`}>
              <Link className="fr-sidemenu__link" to="/inscription-prefet">
                Invitation Espace Prefecture
              </Link>
            </li>
            }

            { role === 'prefet' &&
            <>
              <li className={`fr-sidemenu__item`}>
                <a className="fr-sidemenu__link" target="_blank" rel="noreferrer"
                  href="https://metabase.conseiller-numerique.gouv.fr/public/dashboard/446208c4-cae2-4c0c-be19-44cb14ce7d06">
                  Données de déploiement des CnFS
                </a>
              </li>
              <li className={`fr-sidemenu__item`}>
                <a className="fr-sidemenu__link" target="_blank" rel="noreferrer"
                  href="https://cartographie.conseiller-numerique.gouv.fr/">
                  Cartographie des CnFS
                </a>
              </li>
              <li className={`fr-sidemenu__item ${location.pathname.startsWith('/admin/documents') ? 'fr-sidemenu__item--active' : ''}`}>
                <Link className="fr-sidemenu__link" to="/admin/documents">
                  Documents
                </Link>
              </li>
            </>
            }

            <li className={`fr-sidemenu__item ${location.pathname.startsWith('/admin/exports') ? 'fr-sidemenu__item--active' : ''}`}>
              <Link className="fr-sidemenu__link" to="/admin/exports">
                Exports
              </Link>
            </li>

            { role === 'prefet' &&
              <li className={`fr-sidemenu__item ${location.pathname.startsWith('/admin/formation') ? 'fr-sidemenu__item--active' : ''}`}>
                <Link className="fr-sidemenu__link" to="/admin/formation">
                  Inscription en formation
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
