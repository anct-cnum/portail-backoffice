import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Conseiller({ miseEnRelation }) {

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
  ];

  return (
    <div className="conseiller rf-card rf-card--horizontal">
      <div className="rf-card__body">
        <Link style={{ boxShadow: 'none' }} to={{
          pathname: `/structure/conseiller/${miseEnRelation.conseiller._id}`,
          miseEnRelation: miseEnRelation }}>
          <p className="rf-card__detail">Conseiller - {statutLabel.find(item => item.key === miseEnRelation.statut).label}</p>
          <h4 className="rf-card__title">
            {miseEnRelation.conseiller.prenom} {miseEnRelation.conseiller.nom}
          </h4>
          <div className="rf-card__desc">
            <div className="rf-container-fluid">
              <div className="rf-grid-row">
                <div className="rf-col-4"><span>Candidature du <strong>{dayjs(miseEnRelation.conseiller.createdAt).format('DD/MM/YYYY')}</strong></span></div>
              </div>
              <div className="rf-grid-row">
                <div className="rf-col-4">Code postal: {miseEnRelation.conseiller.codePostal}</div>
              </div>
            </div>
          </div>
          <p className="customTitleLink"><em>Afficher plus de détails</em></p>
        </Link>
      </div>
    </div>
  );
}

Conseiller.propTypes = {
  miseEnRelation: PropTypes.object
};

export default Conseiller;
