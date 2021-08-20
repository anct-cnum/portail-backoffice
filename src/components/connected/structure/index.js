import { React, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Pluralize from 'react-pluralize';
import Menu from './Menu';
import Conseillers from './Conseillers';
import conseillerDetails from './ConseillerDetails';
import Documents from './Documents';
import Demarches from './Demarches';
import Exports from './Exports';
import { structureActions } from '../../../actions';
import Header from '../../common/Header';
import MesInformations from './MesInformations';
import MonCompte from './MonCompte';
import Aide from './Aide';

function Structure() {
  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure);

  const menu = useSelector(state => state.menu);
  const nombreConseillersCoselec = structure?.structure?.dernierCoselec?.nombreConseillersCoselec;

  useEffect(() => {
    dispatch(structureActions.get());
  }, []);

  return (
    <div className="structure rf-pb-md-3w">
      <Header connected />
      <div className="rf-container-fluid">
        <div className="rf-grid-row">
          <div className="rf-col-xs-1 rf-col-sm-2 rf-col-md-3 rf-col-lg-3 rf-col-xl-2"/>
          <div className="rf-col-xs-11 rf-col-sm-9 rf-col-md-8 rf-col-lg-8 rf-col-xl-9">
            <div className="rf-grid-row rf-mt-2w">
              <h2>
                {structure?.structure?.nom}&nbsp;
              </h2>
              <div className="rf-col" style={{ textAlign: 'right' }}>
                {structure?.structure?.estLabelliseFranceServices === 'OUI' ? <>
                  <img src="/logos/ex-libris-france-services.svg" alt="label france services" className="rf-ml-3v rf-mt-4v" style={{ height: '70px' }}/>
                  <p style={{ fontWeight: 'normal', padding: '30px' }}>
                SIRET: {structure?.structure?.siret ? structure?.structure?.siret : 'non renseigné'}
                  </p>
                </> :
                  <p style={{ fontWeight: 'normal', padding: '22px' }}>
                SIRET: {structure?.structure?.siret ? structure?.structure?.siret : 'non renseigné'} </p>}
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="rf-container-fluid rf-mb-5w">
        <div className="rf-grid-row">
          <div className={`${menu.hiddenMenu ?
            'rf-col-xs-1 rf-col-sm-2 rf-col-md-3 rf-col-lg-3 rf-col-xl-2' : 'rf-col-xs-5 rf-col-sm-2 rf-col-md-3 rf-col-lg-2'}`}>
            <Menu />
          </div>
          <div className={`${menu.hiddenMenu ? 'rf-col-xs-11 rf-col-sm-9 rf-col-md-8 rf-col-lg-8 rf-col-xl-9' : 'rf-col-xs-7 rf-col-sm-10'}`}>
            <div className="rf-mb-3w rf-mt-2w">
              { nombreConseillersCoselec !== undefined && nombreConseillersCoselec !== null &&
          <span style={{ fontWeight: 'normal' }} className="rf-mr-15w">
            <Pluralize
              singular={'conseiller validé'}
              plural={'conseillers validés'}
              count={nombreConseillersCoselec} />
            &nbsp;par l&rsquo;Agence nationale de la cohésion des territoires
          </span>
              }
            </div>
            <Route path={`/structure/candidats/:filter`} component={Conseillers} />
            <Route path={`/structure/candidat/:id`} component={conseillerDetails} />
            <Route path={`/structure/documents`} component={Documents} />
            <Route path={`/structure/demarches`} component={Demarches} />
            <Route path={`/structure/exports`} component={Exports} />
            <Route path={`/structure/informations`} component={MesInformations} />
            <Route path={`/structure/aide`} component={Aide} />
            <Route path={`/mon-compte`} component={MonCompte} />

          </div>
        </div>
      </div>
    </div>
  );
}

export default Structure;
