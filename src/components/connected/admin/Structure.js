import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Structure({ structure, currentPage }) {

  return (
    <div className="structure rf-card rf-card--horizontal">
      <div className="rf-card__body">
        <Link style={{ boxShadow: 'none' }}
          to={{
            pathname: `/structure/${structure._id}`,
            currentPage: currentPage
          }}>
          <p className="rf-card__detail">SIRET {structure.siret !== 'null' ? structure.siret : 'non renseigné' }</p>
          <h4 className="rf-card__title">
            <span className="capitalizeFirstLetter">{structure.nom}</span>
          </h4>
          <div className="rf-card__desc">
            <div className="rf-container-fluid">
              <div className="rf-grid-row">
                <div className="rf-col-4"><span>Candidature du <strong>{dayjs(structure.createdAt).format('DD/MM/YYYY')}</strong></span></div>
              </div>
              <div className="rf-grid-row">
                <div className="rf-col-4">Code postal: {structure.codePostal}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

Structure.propTypes = {
  structure: PropTypes.object,
  currentPage: PropTypes.number,
};

export default Structure;
