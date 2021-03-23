import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Menu from './Menu';
import Structures from './Structures';
import StructureDetails from './StructureDetails';
import Conseillers from './Conseillers';
import ConseillerDetails from './ConseillerDetails';
import Documents from './Documents';
import Header from '../../common/Header';

import { useSelector } from 'react-redux';

function Admin() {

  const user = useSelector(state => state.authentication.user.user);

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

  function selectDepartement(event) {
    setDepartement(event.target.value !== '' ? event.target.value : null);
  }

  return (
    <div className="admin">
      <Header connected />
      <div className="rf-m-1w rf-mb-4w rf-ml-4w">
        <h3>Espace {titleLabel.find(title => title.key === role).label} {user.role === 'prefet' ? deptLabel : ''}</h3>
      </div>
      <div className="rf-container-fluid">
        <div className="rf-grid-row">
          <div className="rf-col-3">
            <Menu />
          </div>
          <div className="rf-col-9">
            { user.role === 'admin' &&
            <select className="rf-select rf-mb-2w" onChange={selectDepartement}>
              <option value="">Tout département</option>
              {departementsRegionRaw.map((region, idx) =>
                <option key={idx} value={region.num_dep}>{region.num_dep} - {region.dep_name}</option>
              )}
            </select>}

            <Route path={`/structures`} component={() => <Structures departement={departement} />} />
            <Route path={`/structure/:id`} component={StructureDetails} />
            <Route path={`/conseillers`} component={() => <Conseillers departement={role === 'admin' ? departement : null} />} />
            <Route path={`/conseiller/:id`} component={ConseillerDetails} />
            <Route path={`/admin/documents`} component={Documents} />
            <Route exact path="/" render={() => (<Redirect to="/structures" />)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
