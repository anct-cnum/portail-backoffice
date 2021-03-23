import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Conseiller({ conseiller, currentPage }) {

  /*const statutLabel = [{
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
  ];*/

  return (
    <div className="conseiller rf-card rf-card--horizontal">
      <div className="rf-card__body">
        <Link style={{ boxShadow: 'none' }} to={{
          pathname: `/conseiller/${conseiller._id}`,
          currentPage: currentPage
        }}>
          <h4 className="rf-card__title">
            <span className="capitalizeFirstLetter">
              <i className="ri-briefcase-fill valignTextTop"></i>
              &nbsp;{conseiller.prenom}&nbsp;{conseiller.nom}
            </span>
          </h4>
          <div className="rf-card__desc">
            <div className="rf-container-fluid">
              <div className="rf-grid-row">
                <div className="rf-col-4"><span>Candidature du <strong>{dayjs(conseiller.createdAt).format('DD/MM/YYYY')}</strong></span></div>
              </div>
              <div className="rf-grid-row">
                <div className="rf-col-4">Code postal: {conseiller.codePostal}</div>
              </div>
              { conseiller?.pix?.partage &&
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
  conseiller: PropTypes.object,
  currentPage: PropTypes.number,
};

export default Conseiller;
