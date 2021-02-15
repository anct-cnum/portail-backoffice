import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { conseillerActions } from '../../../actions';
import { Link } from "react-router-dom";

import ButtonsAction from './ButtonsAction'

function Conseiller({ conseiller, miseEnRelationId, statut, update }) {
  const dispatch = useDispatch();

  const statutLabel = [{
    key: 'nouvelle',
    label: 'Nouvelle candidature'
  }, {
    key: 'nonInteressee',
    label: 'Candidature non intéressante'
  }, {
    key: 'interessee',
    label: 'Candidature intéressante'
  }, {
    key: 'recrutee',
    label: 'Recruté'
  },

  ]

  const updateStatut = statut => {
    dispatch(conseillerActions.updateStatus({ id: miseEnRelationId, statut }));
    setTimeout(() => {
      update();
    }, 500);
  }

  return (
    <div className="conseiller rf-card rf-card--horizontal">
      <div className="rf-card__body">
      <Link style={{boxShadow:"none"}} to={{
            pathname:'/structure/conseiller/details',
            conseillerId: conseiller._id,
            miseEnRelationId: miseEnRelationId,
            miseEnRelationStatut: statut }}>
          <p className="rf-card__detail">Conseiller - {statutLabel.find(item => item.key === statut).label}</p>
          <h4 className="rf-card__title">
          {conseiller.prenom} {conseiller.nom}
          </h4>
          <div className="rf-card__desc">
            <div className="rf-container-fluid">
              <div className="rf-grid-row">
                <div className="rf-col-4"><span>Candidature du <strong>{dayjs(conseiller.createdAt).format('DD/MM/YYYY')}</strong></span></div>
              </div>
              <div className="rf-grid-row">
                <div className="rf-col-4">Code postal: {conseiller.codePostal}</div>
              </div>
            </div>
          </div>
          <p className="customTitleLink"><em>Cliquez pour afficher plus de détails</em></p>
        </Link>
      </div>
    </div>
  );
}

Conseiller.propTypes = {
  conseiller: PropTypes.object,
  miseEnRelationId: PropTypes.string,
  statut: PropTypes.string,
  update: PropTypes.func
}

export default Conseiller;
