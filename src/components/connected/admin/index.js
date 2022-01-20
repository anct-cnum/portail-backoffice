import React, { useState, useEffect } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { searchActions, paginationActions } from '../../../actions';
import Menu from './Menu';
import Structures from './Structures';
import StructureDetails from './StructureDetails';
import Conseillers from './Conseillers';
import ConseillerDetails from './ConseillerDetails';
import CandidatsRecrutes from './CandidatsRecrutes';
import Documents from './Documents';
import Pilotage from './Pilotage';
import ExportsCoselec from './ExportsCoselec';
import Stats from './Stats';
import Header from '../../common/Header';

import { useSelector, useDispatch } from 'react-redux';
import SearchBox from '../../common/SearchBox';
import FilterDateBox from '../../common/FilterDateBox';
import MonCompte from './MonCompte';
import EtatRecrutements from './EtatRecrutements';
import FlashMessage from 'react-flash-message';
import InvitationPrefet from './InvitationPrefet';
import InscriptionFormation from '../../common/InscriptionFormation';

function Admin() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication.user.user);
  const { search } = useSelector(state => state.search);
  const dates = useSelector(state => state.filterDate);
  const successSuppressionCandidat = useSelector(state => state.conseiller?.conseillerSuccessSuppression);

  const location = useLocation();

  const role = user.role;

  let departementsRegionRaw = require('../../../data/departements-region');
  let departementsRegionList = Array.from(departementsRegionRaw);
  let deptLabel = null;

  let regionList = require('../../../data/regions');
  let comList = require('../../../data/coms');

  if (user.departement) {
    departementsRegionList.forEach(d => {
      if (`${d.num_dep}` === `${user.departement}`) {
        deptLabel = `département ${d.dep_name}`;
      }
    });
  } else if (user.region) {
    regionList.forEach(d => {
      if (`${d.code}` === `${user.region}`) {
        deptLabel = `région ${d.name}`;
      }
    });
  }

  const titleLabel = [{
    key: 'admin',
    label: 'administrateur'
  }, {
    key: 'prefet',
    label: 'préfecture'
  }];

  const [departement, setDepartement] = useState(null);
  const [codeRegion, setCodeRegion] = useState(null);
  const [codeCom, setCodeCom] = useState(null);

  function selectDepartement(event) {
    dispatch(paginationActions.resetPage(true));
    setDepartement(event.target.value !== '' ? event.target.value : null);
  }

  function selectRegion(event) {
    dispatch(paginationActions.resetPage(true));
    const value = event.target.value;
    setCodeRegion(value !== '' ? value : null);
    setDepartement(null);
  }

  function selectCom(event) {
    dispatch(paginationActions.resetPage(true));
    setCodeCom(event.target.value !== '' ? event.target.value : null);
  }

  function getDepartements() {
    return departementsRegionRaw.filter(region => codeRegion !== null ? region.region_name === regionList.find(r => r.code === codeRegion).name : true);
  }

  function getComs() {
    return comList;
  }

  useEffect(() => {
    dispatch(searchActions.updateSearch(''));
  }, [location]);

  return (
    <div className="admin fr-pb-md-3w">
      <Header connected email={user?.name} />
      <div className="fr-container">
        <div className="fr-grid-row">
          <div className="fr-col-offset-lg-2 fr-col-12 fr-col-lg-8">
            <h3 className="fr-mt-5w fr-mt-9v">Espace {titleLabel.find(title => title.key === role).label} {user.role === 'prefet' ? deptLabel : ''}</h3>
          </div>
        </div>
      </div>
      <div className="fr-container fr-mb-5w">
        <div className="fr-grid-row">
          <div className="fr-col-12 fr-col-md-2 fr-mb-3w">
            <Menu />
          </div>
          <div className="fr-col-12 fr-col-md-10">

            { successSuppressionCandidat &&
            <FlashMessage duration={20000}>
              <p className="flashBag">
                Suppression réussie&nbsp;!
              </p>
            </FlashMessage>
            }

            { (location.pathname.startsWith('/structures') || location.pathname.startsWith('/candidats') ||
               location.pathname.startsWith('/liste-candidats') || location.pathname.startsWith('/admin/liste-candidats')) &&
              <SearchBox />
            }

            { user.role === 'admin' && (location.pathname.startsWith('/structures') || location.pathname.startsWith('/candidats') ||
               location.pathname.startsWith('/liste-candidats') || location.pathname.startsWith('/admin/liste-candidats')) &&
            <>
              <select className="fr-select fr-mb-2w" onChange={selectRegion} value={codeRegion === null ? '' : codeRegion}>
                <option value="">Toute région</option>
                {regionList.sort((a, b) => a.name.normalize('NFD') > b.name.normalize('NFD')).map((region, idx) =>
                  <option key={idx} value={region.code}>{region.name}</option>
                )}
              </select>

              <select className="fr-select fr-mb-2w" value={departement === null ? '' : departement} onChange={selectDepartement}>
                <option value="">Tout département</option>
                {getDepartements().map((region, idx) =>
                  <option key={idx} value={region.num_dep}>{region.num_dep} - {region.dep_name}</option>
                )}
              </select>

              <select className="fr-select fr-mb-2w" value={codeCom === null ? '' : codeCom} onChange={selectCom}>
                <option value="">Toute collectivité d&apos;outre-mer</option>
                {getComs().map((com, idx) =>
                  <option key={idx} value={com.num_com}>{com.num_com} - {com.com_name}</option>
                )}
              </select>
            </>}

            { (location.pathname.startsWith('/structures')) &&
              <FilterDateBox />
            }

            <Route path={`/tableau-de-bord`} component={Stats} />
            <Route path="/inscription-prefet" component={InvitationPrefet} />
            <Route path={`/structures`} component={() => <Structures departement={departement} region={codeRegion} com={codeCom}
              search={search}
              start={dates.filterDateStart !== null ? String(dates.filterDateStart) : ''}
              end={dates.filterDateEnd !== null ? String(dates.filterDateEnd) : ''} />}
            />
            <Route path={`/structure/:id`} component={StructureDetails} />
            <Route path={`/candidats`}
              component={
                () => <Conseillers
                  departement={role === 'admin' ? departement : null}
                  region={codeRegion}
                  com={codeCom}
                  search={search} />} />
            <Route path={`/candidat/:id`} component={ConseillerDetails} />
            <Route path={`/liste-candidats-recrutes`}
              component={
                () => <CandidatsRecrutes
                  departement={departement}
                  region={codeRegion}
                  com={codeCom}
                  search={search} />
              } />

            <Route path={`/etat-des-recrutements`} component={EtatRecrutements} />
            <Route path={`/admin/documents`} component={Documents} />
            <Route path={`/admin/exports`} component={ExportsCoselec} />
            <Route path={`/mon-compte`} component={MonCompte} />

            { user.role === 'prefet' &&
            <>

              <Route path={`/admin/suivi-de-pilotage`} component={Pilotage} />
              <Route path={`/admin/formation`} component={InscriptionFormation} />
              <Route exact path="/" render={() => (<Redirect to="/structures" />)} />
            </>
            }
            { user.role === 'admin' &&
              <Route exact path="/" render={() => (<Redirect to="/tableau-de-bord" />)} />
            }

          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
