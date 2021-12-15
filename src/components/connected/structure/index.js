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
import { statsActions, structureActions } from '../../../actions';
import Header from '../../common/Header';
import MesInformations from './MesInformations';
import MonCompte from './MonCompte';
import Recrutements from './Recrutements';
import Aide from './Aide';
import Pilotage from './Pilotage';
import InscriptionFormation from '../../common/InscriptionFormation';

function Structure() {
  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure);
  const totalConseillers = useSelector(state => state?.stats?.totalConseillers);

  const nombreConseillersCoselec = structure?.structure?.dernierCoselec?.nombreConseillersCoselec;

  useEffect(() => {
    dispatch(structureActions.get());
  }, []);

  useEffect(() => {
    if (totalConseillers === undefined) {
      dispatch(statsActions.getConseillersFinalisee());
    }
  }, [totalConseillers]);

  return (
    <div className="structure fr-pb-md-3w">
      <Header connected />
      <div className="fr-container">
        <div className="fr-grid-row">
          <div className="fr-col-offset-lg-2 fr-col-12 fr-col-md-8 fr-col-lg-6">
            <h2 className="fr-mt-5w fr-mt-9v">
              {structure?.structure?.nom}&nbsp;
              {structure?.structure?.estLabelliseFranceServices === 'OUI' &&
                <img src="/logos/ex-libris-france-services.svg" alt="label france services" className="fr-ml-3v fr-mt-4v logo-label-Fs"/>
              }
              <p className="siret-structure">
                  SIRET: {structure?.structure?.siret ? structure?.structure?.siret : 'non renseigné'}
              </p>
            </h2>
          </div>
          <div className="fr-col-12 fr-col-md-4 fr-mt-md-8w">
            {totalConseillers &&
              <div className="nombreTotalConseiller">
                <img className="logoConseiller" src="/logos/conseiller-conseillere.svg"
                  alt="logo conseiller / conseillere de Conseiller Numérique France Services logoConseiller"/>
                <p className="fr-my-5v">
                &nbsp;<strong>{totalConseillers}</strong> conseillers ont été recrutés dans le dispositif
                </p>
              </div>
            }
          </div>
        </div>
      </div>
      <div className="fr-container fr-mb-5w">
        <div className="fr-grid-row">
          <div className="fr-col-12 fr-col-md-3 fr-col-lg-2 fr-mb-3w">
            <Menu />
          </div>
          <div className="fr-col-12 fr-col-md-9 fr-col-lg-10">
            <div className="fr-mb-5v fr-mt-3v">
              { nombreConseillersCoselec !== undefined && nombreConseillersCoselec !== null &&
                <span style={{ fontWeight: 'normal' }} className="fr-mr-15w">
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
            <Route path={`/structure/recrutements`} component={Recrutements} />
            <Route path={`/structure/documents`} component={Documents} />
            <Route path={`/structure/demarches`} component={Demarches} />
            <Route path={`/structure/exports`} component={Exports} />
            <Route path={`/structure/informations`} component={MesInformations} />
            <Route path={`/structure/aide`} component={Aide} />
            <Route path={`/structure/formation`} component={InscriptionFormation} />
            <Route path={`/mon-compte`} component={MonCompte} />
            <Route path={`/structure/suivi-de-pilotage`} component={Pilotage} />


          </div>
        </div>
      </div>
    </div>
  );
}

export default Structure;
