import React, { useState, useEffect } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { searchActions } from '../../../actions';
import Menu from './Menu';
import Structures from './Structures';
import StructureDetails from './StructureDetails';
import Conseillers from './Conseillers';
import ConseillerDetails from './ConseillerDetails';
import Documents from './Documents';
import Stats from './Stats';
import Header from '../../common/Header';

import { useSelector, useDispatch } from 'react-redux';
import SearchBox from './SearchBox';

function Admin() {

  const user = useSelector(state => state.authentication.user.user);
  const menu = useSelector(state => state.menu);
  const { search } = useSelector(state => state.search);
  const location = useLocation();

  const dispatch = useDispatch();

  const role = user.role;

  let departementsRegionRaw = require('../../../data/departements-region');
  let departementsRegionList = Array.from(departementsRegionRaw);
  let deptLabel = null;

  let regionList = require('../../../data/regions');

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

  function selectDepartement(event) {
    setDepartement(event.target.value !== '' ? event.target.value : null);
  }

  function selectRegion(event) {
    const value = event.target.value;
    setCodeRegion(value !== '' ? value : null);
    setDepartement(null);
  }

  function getDepartements() {
    return departementsRegionRaw.filter(region => codeRegion !== null ? region.region_name === regionList.find(r => r.code === codeRegion).name : true);
  }

  useEffect(() => {
    dispatch(searchActions.updateSearch(''));
  }, [location]);

  return (
    <div className="admin">
      <Header connected />
      <div className="rf-m-1w rf-mb-4w rf-ml-4w">
        <h3>Espace {titleLabel.find(title => title.key === role).label} {user.role === 'prefet' ? deptLabel : ''}</h3>
      </div>
      <div className="rf-container-fluid">
        <div className="rf-grid-row">
          <div className={`${menu.hiddenMenu ? 'rf-col-xs-1 rf-col-sm-3' : 'rf-col-xs-5 rf-col-sm-3'}`}>
            <Menu />
          </div>
          <div className={`${menu.hiddenMenu ? 'rf-col-xs-11 rf-col-sm-9' : 'rf-col-xs-7 rf-col-sm-9'}`}>
            { (location.pathname.startsWith('/structures') || location.pathname.startsWith('/candidats')) &&
              <SearchBox />
            }

            { user.role === 'admin' && (location.pathname.startsWith('/structures') || location.pathname.startsWith('/candidats')) &&
            <>
              <select className="rf-select rf-mb-2w" onChange={selectRegion}>
                <option value="">Toute région</option>
                {regionList.sort((a, b) => a.name.normalize('NFD') > b.name.normalize('NFD')).map((region, idx) =>
                  <option key={idx} value={region.code}>{region.name}</option>
                )}
              </select>

              <select className="rf-select rf-mb-2w" value={departement === null ? '' : departement} onChange={selectDepartement}>
                <option value="">Tout département</option>
                {getDepartements().map((region, idx) =>
                  <option key={idx} value={region.num_dep}>{region.num_dep} - {region.dep_name}</option>
                )}
              </select>
            </>}

            <Route path={`/tableau-de-bord`} component={Stats} />
            <Route path={`/structures`} component={() => <Structures departement={departement} region={codeRegion} search={search} />} />
            <Route path={`/structure/:id`} component={StructureDetails} />
            <Route path={`/candidats`}
              component={
                () => <Conseillers
                  departement={role === 'admin' ? departement : null}
                  region={codeRegion}
                  search={search} />} />
            <Route path={`/candidat/:id`} component={ConseillerDetails} />
            <Route path={`/admin/documents`} component={Documents} />
            { user.role === 'prefet' &&
              <Route exact path="/" render={() => (<Redirect to="/structures" />)} />
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
