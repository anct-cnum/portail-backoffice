import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pilotageActions, statsActions } from '../../../actions';
import DatePicker, { registerLocale } from 'react-datepicker';
import Territoire from './Territoire';
import Pagination from '../../common/Pagination';
import fr from 'date-fns/locale/fr';

registerLocale('fr', fr);

function PilotageTerritoires() {
  const dispatch = useDispatch();
  const territoire = useSelector(state => state.pilotage?.territoire);
  const pagination = useSelector(state => state.pilotage?.pagination);

  const territoires = useSelector(state => state.stats.statsTerritoires);
  const statsTerritoiresLoading = useSelector(state => state.stats.statsTerritoiresLoading);
  const statsTerritoiresError = useSelector(state => state.stats.statsTerritoiresError);

  let dateDebut = useSelector(state => state.pilotage?.dateDebut);
  let ordreNom = useSelector(state => state.pilotage?.ordreNom);
  let dateFin = useSelector(state => state.pilotage?.dateFin);
  let ordre = useSelector(state => state.pilotage?.ordre);

  let [page, setPage] = (pagination?.resetPage === false && location.currentPage !== undefined) ? useState(location.currentPage) : useState(1);
  const [pageCount, setPageCount] = useState(0);

  const navigate = page => {
    setPage(page);
    dispatch(statsActions.getStatsTerritoires(territoire, dateDebut, dateFin, page, ordreNom, ordre ? 1 : -1));
  };

  const handleTerritoire = e => {
    dispatch(pilotageActions.changeTerritoire(e.target.id));
  };

  const ordreColonne = e => {
    dispatch(pilotageActions.changeOrdre(e.target.id));
  };

  function handleChangeStart(e) {
    dispatch(pilotageActions.changeDateDebut(e));
  }

  function handleChangeEnd(e) {
    dispatch(pilotageActions.changeDateFin(e));
  }

  useEffect(() => {
    if (territoires?.items) {
      const count = territoires.items.limit ? Math.floor(territoires.items.total / territoires.items.limit) : 0;
      setPageCount(territoires.items.total % territoires.items.limit === 0 ? count : count + 1);
    }
  }, [territoires]);

  useEffect(() => {
    const page = (pagination?.resetPage === false && location.currentPage !== undefined) ? location.currentPage : 1;
    dispatch(statsActions.getStatsTerritoires(territoire, dateDebut, dateFin, page, ordreNom, ordre ? 1 : -1));

  }, [ordre, ordreNom, dateDebut, dateFin, territoire]);


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
                <button className="filtre-btn" onClick={ordreColonne}>
                  <span id="nom">
                    { territoire === 'codeDepartement' ? <>D&eacute;partement</> : <>R&eacute;gion</>}
                    { (ordreNom !== 'nom' || ordreNom === 'nom' && ordre) &&
                      <i className="ri-arrow-down-s-line chevron icone"></i>
                    }
                    { (ordreNom === 'nom' && !ordre) &&
                      <i className="ri-arrow-up-s-line chevron icone"></i>
                    }
                  </span>
                </button>
              </th>
              <th>
                <span id="personnesAccompagnees">CRA enregistr&eacute;s</span>
              </th>
              <th>
                <span id="personnesAccompagnees">Personnes accompagn&eacute;es</span>
              </th>
              <th>
                <button className="filtre-btn" onClick={ordreColonne}>
                  <span id="nombreConseillersCoselec">Dotation de conseillers
                    { (ordreNom !== 'nombreConseillersCoselec' || ordreNom === 'nombreConseillersCoselec' && ordre) &&
                      <i className="ri-arrow-down-s-line chevron icone-2"></i>
                    }
                    { (ordreNom === 'nombreConseillersCoselec' && !ordre) &&
                      <i className="ri-arrow-up-s-line chevron icone-2"></i>
                    }
                  </span>
                </button>
              </th>
              <th>
                <button className="filtre-btn" onClick={ordreColonne}>
                  <span id="cnfsActives">CnFS activ&eacute;s
                    { (ordreNom !== 'cnfsActives' || ordreNom === 'cnfsActives' && ordre) &&
                      <i className="ri-arrow-down-s-line chevron icone-2"></i>
                    }
                    { (ordreNom === 'cnfsActives' && !ordre) &&
                      <i className="ri-arrow-up-s-line chevron icone-2"></i>
                    }
                  </span>
                </button>
              </th>
              <th>
                <button className="filtre-btn" onClick={ordreColonne}>
                  <span id="cnfsInactives">CnFS en attente d&rsquo;activation
                    { (ordreNom !== 'cnfsInactives' || ordreNom === 'cnfsInactives' && ordre) &&
                      <i className="ri-arrow-down-s-line chevron icone-3"></i>
                    }
                    { (ordreNom === 'cnfsInactives' && !ordre) &&
                      <i className="ri-arrow-up-s-line chevron icone-3"></i>
                    }
                  </span>
                </button>
              </th>
              <th>
                { territoire === 'codeRegion' &&
                  <button className="filtre-btn">
                    <span id="personnesAccompagnees">Taux d&rsquo;activation</span>
                  </button>
                }
                { territoire === 'codeDepartement' &&
                  <button className="filtre-btn" onClick={ordreColonne}>
                    <span id="tauxActivation">Taux d&rsquo;activation
                      { (ordreNom !== 'tauxActivation' || ordreNom === 'tauxActivation' && ordre) &&
                        <i className="ri-arrow-down-s-line chevron icone-2"></i>
                      }
                      { (ordreNom === 'tauxActivation' && !ordre) &&
                        <i className="ri-arrow-up-s-line chevron icone-2"></i>
                      }
                    </span>
                  </button>
                }
              </th>
            </tr>
          </thead>
          <tbody>
            {!statsTerritoiresError && !statsTerritoiresLoading && territoires?.items?.data && territoires?.items.data.map((territoire, idx) => {
              return (<Territoire key={idx} territoire={territoire} filtreTerritoire={territoire}
                currentPage={page} trClass ={idx % 2 === 0 ? 'pair' : 'impair'}/>);
            })
            }
            { (!territoires?.items || !territoires?.items?.data) &&
              <tr>
                <td colSpan="7" className="not-found pair">
                  {territoire === 'codeDepartement' ? <>Aucun d&eacute;partement trouv&eacute;</> : <>Aucune r&eacute;gion trouv&eacute;e</> }
                </td>
              </tr>
            }
          </tbody>
        </table>
        <Pagination current={page} pageCount={pageCount} navigate={navigate}/>
      </div>

    </div>
  );
}

export default PilotageTerritoires;
