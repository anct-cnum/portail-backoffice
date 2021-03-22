import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Conseiller({ miseEnRelation, currentPage, currentFilter }) {

  const statutLabel = [{
    key: 'nouvelle',
    label: 'Nouvelle candidature'
  }, {
    key: 'nonInteressee',
    label: 'Candidature non retenue'
  }, {
    key: 'interessee',
    label: 'Candidature pré sélectionnée'
  }, {
    key: 'recrutee',
    label: 'Candidature validée'
  },
  ];

  return (
    <div className="conseiller rf-card rf-card--horizontal">
      <div className="rf-card__body">
        <Link style={{ boxShadow: 'none' }} to={{
          pathname: `/structure/conseiller/${miseEnRelation.conseiller._id}`,
          miseEnRelation: miseEnRelation,
          currentPage: currentPage,
          currentFilter: currentFilter }}>
          <h4 className="rf-card__title">
            <span className="capitalizeFirstLetter">
              <i className="ri-briefcase-fill valignTextTop"></i>
              &nbsp;{miseEnRelation.conseiller.prenom}&nbsp;{miseEnRelation.conseiller.nom}
            </span>
            <div className="rf-highlight valignTextTop" style={{ display: 'inline-block' }}>
              {statutLabel.find(item => item.key === miseEnRelation.statut).label}
            </div>
          </h4>
          <div className="rf-card__desc">
            <div className="rf-container-fluid">
              <div className="rf-grid-row">
                <div className="rf-col-4"><span>Candidature du <strong>{dayjs(miseEnRelation.conseiller.createdAt).format('DD/MM/YYYY')}</strong></span></div>
              </div>
              <div className="rf-grid-row">
                <div className="rf-col-4">Code postal: {miseEnRelation.conseiller.codePostal}</div>
              </div>
              { miseEnRelation.conseiller?.pix?.partage &&
                <div className="tooltip">
                  <img src="/logos/logo-pix.svg" alt="logo Pix" style={{ height: '36px' }}/>
                  <span className="tooltiptext">A partagé ses résultats Pix</span>
                </div>
              }
            </div>
          </div>
          <p className="customTitleLink" style={{ margin: 0 }}><em>Afficher plus de détails</em></p>
        </Link>
      </div>
    </div>
  );
}

Conseiller.propTypes = {
  miseEnRelation: PropTypes.object,
  currentPage: PropTypes.number,
  currentFilter: PropTypes.string
};

export default Conseiller;
