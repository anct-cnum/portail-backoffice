import { React, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Menu from './Menu';
import Conseillers from './Conseillers';
import Informations from './Informations';
import conseillerDetails from './ConseillerDetails';
import Documents from './Documents';
import { structureActions } from '../../../actions';

function Structure() {
  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure);

  useEffect(() => {
    dispatch(structureActions.get());
  }, []);

  return (
    <div className="structure">
      <div className="rf-m-1w rf-mb-4w rf-ml-4w">
        <h2>Espace structure - {structure?.structure?.nom}</h2>
        <div className="rf-highlight">SIRET: {structure?.structure?.siret}</div>
      </div>
      <div className="rf-container-fluid">
        <div className="rf-grid-row">
          <div className="rf-col-3">
            <Menu />
          </div>
          <div className="rf-col-9">
            <Route path={`/structure/informations`} component={Informations} />
            <Redirect from="/structure/conseillers" to={`/structure/conseillers/nouvelle`} />
            <Route path={`/structure/conseillers/:filter`} component={Conseillers} />
            <Route path={`/structure/conseiller/details`} component={conseillerDetails} />
            <Route path={`/structure/documents`} component={Documents} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Structure;
