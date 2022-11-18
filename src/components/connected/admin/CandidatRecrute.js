import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ClickAndSave from '../../common/ClickAndSave';

function CandidatRecrute({ candidat, currentPage }) {

  return (
    <tr className="conseiller">
      <td><ClickAndSave field={candidat?.idPG}/></td>
      <td>{candidat?.nom}</td>
      <td>{candidat?.prenom}</td>
      <td>{candidat?.email}</td>
      <td>{candidat?.datePrisePoste ? dayjs(candidat?.datePrisePoste).format('DD/MM/YYYY') : 'Non renseignée'}</td>
      <td>{candidat?.dateFinFormation ? dayjs(candidat?.dateFinFormation).format('DD/MM/YYYY') : 'Non renseignée'}</td>
      <td>{ <span>{candidat?.mattermost?.id ? 'OUI' : 'NON'}</span> }</td>
      <td>
        <Link className="fr-btn fr-fi-eye-line fr-btn--icon-left" style={{ boxShadow: 'none' }} to={{
          pathname: `/candidat/${candidat?._id}`,
          currentPage: currentPage,
          origin: '/admin/liste-candidats-recrutes' }}>
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
