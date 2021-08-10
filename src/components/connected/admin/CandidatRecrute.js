import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CandidatRecrute({ candidat, currentPage }) {

  return (
    <tr className="conseiller">
      <td>{candidat?.nom}</td>
      <td>{candidat?.prenom}</td>
      <td>{candidat?.email}</td>
      <td>{dayjs(candidat?.datePrisePoste).format('DD/MM/YYYY')}</td>
      <td>{dayjs(candidat?.dateFinFormation).format('DD/MM/YYYY')}</td>
      <td>{ <span>{candidat?.emailCN ? 'OUI' : 'NON'}</span> }</td>
      <td>
        <Link className="rf-btn rf-fi-eye-line rf-btn--icon-left" style={{ boxShadow: 'none' }} to={{
          pathname: `/candidat/${candidat?._id}`,
          currentPage: currentPage,
          origin: '/liste-candidats-recrutes' }}>
            Détails
        </Link>
      </td>
    </tr>
  );
}

CandidatRecrute.propTypes = {
  candidat: PropTypes.object,
  currentPage: PropTypes.number,
};

export default CandidatRecrute;
