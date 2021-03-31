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
      <div className="rf-container-fluid">
        <div className="rf-grid-row">
          <h1>
            Tableau de bord
          </h1>
        </div>
        <div className="rf-container">
          <div className="rf-grid-row">
            <div className="rf-col-4">
              <h4>Nombre total de structures inscrites</h4>
            </div>
            <div className="rf-col-4">
              <h4>Nombre total de candidats</h4>
            </div>
            <div className="rf-col-4">
              <h4>Nombre total de candidatures recrutées</h4>
            </div>
          </div>
          { stats &&
          <div className="rf-grid-row">
            <div className="rf-col-4">
              <span>{stats.structuresCount}</span>
            </div>
            <div className="rf-col-4">
              <span>{stats.conseillersCount}</span>
            </div>
            <div className="rf-col-4">
              <span>{stats.conseillersRecrutesCount}</span>
            </div>
          </div> }
        </div>
      </div>
    </div>
  );
}

export default Stats;