import { React, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Menu from './Menu';
import Conseillers from './Conseillers';
import Informations from './Informations';
import conseillerDetails from './ConseillerDetails';
import Documents from './Documents';
import { structureActions } from '../../../actions';
import Header from '../../common/Header';

function Structure() {
  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure);

  useEffect(() => {
    dispatch(structureActions.get());
  }, []);

  return (
    <div className="structure rf-pb-md-3w">
      <Header connected />
      <div className="rf-ml-1w rf-my-1w rf-py-1w">
        <h2 style={{ textAlign: 'center' }}>
          Espace structure — {structure?.structure?.nom}&nbsp;
          <span className="rf-highlight valignMiddle" style={{ fontWeight: 'normal' }}>
            SIRET: {structure?.structure?.siret}
          </span>
        </h2>
      </div>
      <div className="rf-container-fluid rf-mb-5w">
        <div className="rf-grid-row">
          <div className="rf-col-3">
            <Menu />
          </div>
          <div className="rf-col-9">
            <Route path={`/structure/informations`} component={Informations} />
            <Route path={`/structure/conseillers/:filter`} component={Conseillers} />
            <Route path={`/structure/conseiller/:id`} component={conseillerDetails} />
            <Route path={`/structure/documents`} component={Documents} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Structure;
