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
        { stats &&
        <div className="rf-container">
          <div className="rf-grid-row rf-mb-3w">
            <div className="rf-col-xs-12 rf-col-md-3">
              <h4 style={{ height: '48px' }}>Nombre total de structures inscrites</h4>
            </div>
            <div className="rf-col-xs-12 rf-col-md-3">
              <h4 style={{ height: '48px' }}>Nombre total de candidats</h4>
            </div>
            <div className="rf-col-xs-12 rf-col-md-3">
              <h4 style={{ height: '48px' }}>Nombre total de mises en relation</h4>
            </div>
            <div className="rf-col-xs-12 rf-col-md-3">
              <h4 style={{ height: '48px' }}>Nombre total de candidatures recrutées</h4>
            </div>
          </div>
          <div className="rf-grid-row">
            <div className="rf-col-xs-12 rf-col-md-3">
              <span>{stats.structuresCount}</span>
            </div>
            <div className="rf-col-xs-12 rf-col-md-3">
              <span>{stats.conseillersCount}</span>
            </div>
            <div className="rf-col-xs-12 rf-col-md-3">
              <span>{stats.matchingsCount}</span>
            </div>
            <div className="rf-col-xs-12 rf-col-md-3">
              <span>{stats.conseillersRecrutesCount}</span>
            </div>
          </div>
          <div className="rf-grid-row rf-mb-3w">
            <div className="rf-col-xs-12 rf-col-md-3">
              <h4 style={{ height: '48px' }}>Nombre de structures en attente d&apos;activation</h4>
            </div>
            <div className="rf-col-xs-12 rf-col-md-3">
              <h4 style={{ height: '48px' }}>Nombre de structures validées</h4>
            </div>
            <div className="rf-col-xs-12 rf-col-md-3">
              <h4 style={{ height: '48px' }}>Nombre de structures activées</h4>
            </div>
            <div className="rf-col-xs-12 rf-col-md-3">
              <h4 style={{ height: '48px' }}>Nombre de structures qui recrutent</h4>
            </div>
          </div>
          <div className="rf-grid-row">
            <div className="rf-col-xs-12 rf-col-md-3">
              <span>{stats.structuresEnAttenteCount}</span>
            </div>
            <div className="rf-col-xs-12 rf-col-md-3">
              <span>{stats.structuresValideesCount}</span>
            </div>
            <div className="rf-col-xs-12 rf-col-md-3">
              <span>{stats.structuresActiveesCount}</span>
            </div>
            <div className="rf-col-xs-12 rf-col-md-3">
              <span>{stats.structuresQuiRecrutentCount}</span>
            </div>
          </div>
        </div> }
      </div>
    </div>
  );
}

export default Stats;
