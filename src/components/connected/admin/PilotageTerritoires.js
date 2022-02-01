import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pilotageActions, statsActions } from '../../../actions';
import DatePicker, { registerLocale } from 'react-datepicker';
import Territoire from './Territoire';
import fr from 'date-fns/locale/fr';

registerLocale('fr', fr);

function PilotageTerritoires() {
  const dispatch = useDispatch();
  const territoire = useSelector(state => state.pilotage?.territoire);
  const dateDebut = useSelector(state => state.pilotage?.dateDebut);
  const dateFin = useSelector(state => state.pilotage?.dateFin);

  const territoires = useSelector(state => state.stats?.statsTerritoires);
  const statsTerritoiresLoading = useSelector(state => state.stats?.statsTerritoiresLoading);
  const statsTerritoiresError = useSelector(state => state.stats?.statsTerritoiresError);

  const handleTerritoire = e => {
    dispatch(pilotageActions.changeTerritoire(e.target.id));
  };

  function handleChangeStart(date) {
    dispatch(pilotageActions.changeDateDebut(date));
  }

  function handleChangeEnd(date) {
    dispatch(pilotageActions.changeDateFin(date));
  }


  useEffect(() => {
    dispatch(statsActions.getStatsTerritoires(territoire, dateDebut, dateFin));

  }, [dateDebut, dateFin, territoire]);


  return (
    <div className="pilotage">
      <h3>Suivi et pilotage des Conseillers num&eacute;riques France Services</h3>
      <div className="fr-container fr-container--fluid">
        <div className="fr-grid-row fr-grid-row--end">
          <div className="fr-col-4">
            <nav className="fr-sidemenu menu-pilotage" role="navigation" aria-label="Menu territoire">
              <div className="fr-sidemenu__inner no-box-shadow">
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
                              id={ territoire === 'codeDepartement' ? 'codeRegion' : 'codeDepartement'} >
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
          </div>
          <div className="fr-col-4" style={{ textAlign: 'right' }}>
            <b>Du &nbsp;</b>
            <span id="span-datePickerDebut" >
              <DatePicker
                placeholderText="Date de début"
                id="datePickerDebut"
                name="datePickerDebut"
                className="fr-input fr-mx-1w"
                dateFormat="dd/MM/yyyy"
                locale="fr"
                selected={dateDebut}
                onChange={handleChangeStart}
              />
            </span>
          </div>
          <div className="fr-col-4" style={{ textAlign: 'right' }}>
            <b>Au &nbsp;</b>
            <span id="span-datePickerFin" >
              <DatePicker
                placeholderText="Date de fin"
                id="datePickerFin"
                name="datePickerFin"
                className="fr-input fr-mx-1w"
                dateFormat="dd/MM/yyyy"
                locale="fr"
                selected={dateFin}
                onChange={handleChangeEnd}
              />
            </span>
          </div>
        </div>
      </div>
      <div className="fr-table">
        <table >
          <thead>
            <tr>
              <th>
                <span id="nom">
                  { territoire === 'codeDepartement' ? <>D&eacute;partement</> : <>R&eacute;gion</>}
                </span>
              </th>
              <th>
                <span id="personnesAccompagnees">CRA enregistr&eacute;s</span>
              </th>
              <th>
                <span id="personnesAccompagnees">Personnes accompagn&eacute;es</span>
              </th>
              <th>
                <span id="nombreConseillersCoselec">Dotation de conseillers</span>
              </th>
              <th>
                <span id="cnfsActives">CnFS activ&eacute;s</span>
              </th>
              <th>
                <span id="cnfsInactives">CnFS en attente d&rsquo;activation</span>
              </th>
              <th>
                <span id="personnesAccompagnees">Taux d&rsquo;activation</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {!statsTerritoiresError && !statsTerritoiresLoading && territoires?.items?.data && territoires?.items.data.map((territoire, idx) => {
              return (<Territoire key={idx} territoire={territoire}/>);
            })
            }
            { (!territoires?.items || territoires?.items?.data.length === 0) &&
              <tr>
                <td colSpan="7" className="not-found pair">
                  {territoire === 'codeDepartement' ? <>Aucun d&eacute;partement trouv&eacute;</> : <>Aucune r&eacute;gion trouv&eacute;e</> }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default PilotageTerritoires;
