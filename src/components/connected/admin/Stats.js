import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardStatsActions } from '../../../actions';

function Stats() {

  const dispatch = useDispatch();
  const { stats } = useSelector(state => state.dashboardStats);

  useEffect(() => {
    dispatch(dashboardStatsActions.getDashboardStats());
  }, []);

  return (
    <div className="documents">
      <h1>Tableau de bord</h1>
      {stats &&
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--gutters fr-mb-6w">
            <div className="fr-col-12 fr-col-sm-6 fr-col-md-3">
              <h5 className="titre-stat">Nombre total de structures inscrites</h5>
              <div className="fr-my-3w">{stats.structuresCount}</div>
            </div>
            <div className="fr-col-12 fr-col-sm-6 fr-col-md-3">
              <h5 className="titre-stat">Nombre total de candidats</h5>
              <div className="fr-my-3w">{stats.conseillersCount}</div>
            </div>
            <div className="fr-col-12 fr-col-sm-6 fr-col-md-3">
              <h5 className="titre-stat">Nombre total de mises en relation</h5>
              <div className="fr-my-3w">{stats.matchingsCount}</div>
            </div>
            <div className="fr-col-12 fr-col-sm-6 fr-col-md-3">
              <h5 className="titre-stat">Nombre total de candidatures recrutées</h5>
              <div className="fr-my-3w">{stats.conseillersRecrutesCount}</div>
            </div>


            <div className="fr-col-12 fr-col-sm-6 fr-col-md-3">
              <h5 className="titre-stat">Nombre de structures en attente d&apos;activation</h5>
              <div className="fr-my-3w">{stats.structuresEnAttenteCount}</div>
            </div>
            <div className="fr-col-12 fr-col-sm-6 fr-col-md-3">
              <h5 className="titre-stat">Nombre de structures validées</h5>
              <div className="fr-my-3w">{stats.structuresValideesCount}</div>
            </div>
            <div className="fr-col-12 fr-col-sm-6 fr-col-md-3">
              <h5 className="titre-stat">Nombre de structures activées</h5>
              <div className="fr-my-3w">{stats.structuresActiveesCount}</div>
            </div>
            <div className="fr-col-12 fr-col-sm-6 fr-col-md-3">
              <h5 className="titre-stat">Nombre de structures qui recrutent</h5>
              <div className="fr-my-3w">{stats.structuresQuiRecrutentCount}</div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Stats;
