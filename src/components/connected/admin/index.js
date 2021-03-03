import React from 'react';
import { Route } from 'react-router-dom';

import Menu from './Menu';
import Structures from './Structures';
import Header from '../../common/Header';

import { useSelector } from 'react-redux';

function Admin() {

  const user = useSelector(state => state.authentication.user.user);

  const role = user.role;
  const departement = user.departement;

  let departementsRegionRaw = require('../../../data/departements-region');
  let departementsRegionList = Array.from(departementsRegionRaw);
  let deptLabel = null;

  departementsRegionList.forEach(d => {
    if (`${d.num_dep}` === `${departement}`) {
      deptLabel = d.dep_name;
    }
  });

  const titleLabel = [{
    key: 'admin',
    label: 'administrateur'
  }, {
    key: 'prefet',
    label: 'préfecture'
  }];

  return (
    <div className="admin">
      <Header connected />
      <div className="rf-m-1w rf-mb-4w rf-ml-4w">
        <h3>Espace {titleLabel.find(title => title.key === role).label} {deptLabel}</h3>
      </div>
      <div className="rf-container-fluid">
        <div className="rf-grid-row">
          <div className="rf-col-3">
            <Menu />
          </div>
          <div className="rf-col-9">
            <Route path={`/structures`} component={Structures} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
