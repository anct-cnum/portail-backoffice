import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Conseiller({ conseiller, currentPage }) {

  return (
    <tr className="conseiller">
      <td>{conseiller?.prenom}</td>
      <td>{conseiller?.nom}</td>
      <td>{dayjs(conseiller?.createdAt).format('DD/MM/YYYY')}</td>
      <td>{conseiller?.codePostal}</td>
      <td>
        { conseiller?.pix?.partage &&
          <div className="tooltip">
            <img src="/logos/logo-pix.svg" alt="logo Pix" style={{ height: '36px' }}/>
            <span className="tooltiptext">A partagé ses résultats Pix</span>
          </div>
        }
      </td>
      <td>
        <Link className="rf-btn rf-fi-eye-line rf-btn--icon-left" style={{ boxShadow: 'none' }} to={{
          pathname: `/candidat/${conseiller?._id}`,
          currentPage: currentPage }}>
            Détails
        </Link>
      </td>
    </tr>
  );
}

Conseiller.propTypes = {
  conseiller: PropTypes.object,
  currentPage: PropTypes.number,
};

export default Conseiller;
