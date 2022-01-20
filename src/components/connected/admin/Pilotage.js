import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pilotageActions } from '../../../actions';

function Pilotage() {
  const dispatch = useDispatch();
  const territoire = useSelector(state => state.pilotage?.territoire);

  const handleTerritoire = e => {
    dispatch(pilotageActions.changeTerritoire(e.target.id));
  };

  return (
    <div className="pilotage">
      <h3>Suivi et pilotage des Conseillers num&eacute;riques France Services</h3>
      <nav className="fr-sidemenu menu-pilotage" role="navigation" aria-label="Menu territoire">
        <div className="fr-sidemenu__inner">
          <div className="fr-collapse" id="menu-territoire-wrapper">
            <ul className="fr-sidemenu__list">
              <li className="fr-sidemenu__item">
                <button className="fr-sidemenu__btn" aria-expanded="false" aria-controls="menu-territoire">
                  { territoire === 'codeDepartement' ? <>Affichage par d&eacute;partement</> : <>Affichage par r&eacute;gion</>}
                </button>
                <div className="fr-collapse" id="menu-territoire">
                  <ul className="fr-sidemenu__list">
                    <li className="fr-sidemenu__item">
                      <button className="fr-sidemenu__link" onClick={handleTerritoire}
                        id={ territoire === 'codeDepartement' ? 'codeRegion' : 'codeDepartement'}
                      >
                        { territoire === 'codeDepartement' ? <>Affichage par r&eacute;gion</> : <>Affichage par d&eacute;partement</> }
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <table>
        <tr>
          <th>
            D&eacute;partement / R&eacute;gion
          </th>
          <th>
            Cra enregistr&eacute;s
          </th>
          <th>
            Personnes accompag&eacute;es
          </th>
          <th>
            Dotation de conseillers
          </th>
          <th>
            conseillers activ&eacute;s
          </th>
          <th>
            conseillers en attente d&rsquo;activation
          </th>
          <th>
            Taux d&rsquo;activation
          </th>
        </tr>
      </table>
    </div>
  );
}

export default Pilotage;
