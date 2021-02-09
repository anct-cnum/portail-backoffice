import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Menu from './Menu';
import Conseillers from './Conseillers';
import Informations from './Informations';
import conseillerDetails from './ConseillerDetails';

function Structure() {
  const structure = useSelector(state => state.structure);

  return (
    <div className="structure">
      <div className="rf-m-1w rf-mb-4w">
        <h3>Espace structure - {structure?.nom}</h3>
        <div className="rf-highlight">SIRET: {structure?.siret}</div>
      </div>
      <div className="rf-container-fluid">
        <div className="rf-grid-row">
          <div className="rf-col-2">
            <Menu />
          </div>
          <div className="rf-col-xs-12 rf-col-lg-10">
            <Route path={`/structure/informations`} component={Informations} />
            <Redirect from="/structure/conseillers" to={`/structure/conseillers/nouvelle`} />
            <Route path={`/structure/conseillers/:filter`} component={Conseillers} />
            <Route path={`/structure/conseiller/details`} component={conseillerDetails} />
          </div>
        </div>
      </div>



    </div>
  );
}

export default Structure;
