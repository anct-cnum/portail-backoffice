import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Structure({ structure, currentPage }) {

  return (
    <tr>
      <td>{structure.idPG}</td>
      <td>{structure.siret !== null ? structure.siret : 'non renseigné' }</td>
      <td className="capitalizeFirstLetter">{structure.nom}</td>
      {/* eslint-disable-next-line max-len */}
      <td>{structure.statut === 'VALIDATION_COSELEC' && structure.dernierCoselec !== null ? structure.dernierCoselec?.avisCoselec : 'en attente de passage'}</td>
      <td>{dayjs(structure.createdAt).format('DD/MM/YYYY')}</td>
      <td>{structure.codePostal}</td>
      <td>        <Link className="rf-btn rf-fi-eye-line rf-btn--icon-left" style={{ boxShadow: 'none' }}
        to={{
          pathname: `/structure/${structure._id}`,
          currentPage: currentPage
        }}>Détails</Link></td>
    </tr>
  );
}

Structure.propTypes = {
  structure: PropTypes.object,
  currentPage: PropTypes.number,
};

export default Structure;
