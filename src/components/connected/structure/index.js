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
import MonCompte from './MonCompte';

function Structure() {
  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure);
  const user = useSelector(state => state.authentication.user?.user);

  const menu = useSelector(state => state.menu);
  const nombreConseillersCoselec = structure?.structure?.dernierCoselec?.nombreConseillersCoselec;

  useEffect(() => {
    dispatch(structureActions.get());
  }, []);

  function crisp() {
    if (window.$crisp === undefined) {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = process.env.REACT_APP_CANAL_CRISP_ID;

      (function() {
        let d = document;
        let s = d.createElement('script');

        s.src = 'https://client.crisp.chat/l.js';
        s.async = 1;
        d.getElementsByTagName('head')[0].appendChild(s);
      })();

      window.$crisp.push(['set', 'session:segments', [['espace_structure']]]);
      window.$crisp.push(['set', 'user:email', [user.name]]);
    }
  }


  return (
    <div className="structure rf-pb-md-3w">
      { crisp() }
      <Header connected />
      <div className="rf-ml-1w rf-my-1w rf-py-1w" style={{ textAlign: 'center' }}>
        <h2>
          Espace structure — {structure?.structure?.nom}&nbsp;
          <span className="rf-highlight valignMiddle" style={{ fontWeight: 'normal' }}>
            SIRET: {structure?.structure?.siret ? structure?.structure?.siret : 'non renseigné'}
          </span>
        </h2>
        { nombreConseillersCoselec !== undefined && nombreConseillersCoselec !== null &&
          <span style={{ fontWeight: 'normal' }}>
            <Pluralize
              singular={'conseiller validé'}
              plural={'conseillers validés'}
              count={nombreConseillersCoselec} />
            &nbsp;par l&rsquo;Agence nationale de la cohésion des territoires
          </span>
        }
      </div>
      <div className="rf-container-fluid rf-mb-5w">
        <div className="rf-grid-row">
          <div className={`${menu.hiddenMenu ? 'rf-col-xs-1 rf-col-sm-3' : 'rf-col-xs-5 rf-col-sm-3'}`}>
            <Menu />
          </div>
          <div className={`${menu.hiddenMenu ? 'rf-col-xs-11 rf-col-sm-8' : 'rf-col-xs-7 rf-col-sm-9'}`}>
            <Route path={`/structure/candidats/:filter`} component={Conseillers} />
            <Route path={`/structure/candidat/:id`} component={conseillerDetails} />
            <Route path={`/structure/documents`} component={Documents} />
            <Route path={`/structure/demarches`} component={Demarches} />
            <Route path={`/structure/exports`} component={Exports} />
            <Route path={`/structure/mon-compte`} component={MonCompte} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Structure;
