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
    <tr className="conseiller">
      <td>{miseEnRelation.conseiller.prenom}</td>
      <td>{miseEnRelation.conseiller.nom}</td>
      <td>{statutLabel.find(item => item.key === miseEnRelation.statut).label}</td>
      <td>{dayjs(miseEnRelation.conseiller.createdAt).format('DD/MM/YYYY')}</td>
      <td>{miseEnRelation.conseiller.codePostal}</td>
      <td>
        { miseEnRelation.conseiller?.pix?.partage &&
          <div className="tooltip">
            <img src="/logos/logo-pix.svg" alt="logo Pix" style={{ height: '36px' }}/>
            <span className="tooltiptext">A partagé ses résultats Pix</span>
          </div>
        }
      </td>
      <td>
        <Link className="rf-btn rf-fi-eye-line rf-btn--icon-left" style={{ boxShadow: 'none' }} to={{
          pathname: `/structure/candidat/${miseEnRelation.conseiller._id}`,
          miseEnRelation: miseEnRelation,
          currentPage: currentPage,
          currentFilter: currentFilter }}>
            Détails
        </Link>
      </td>
    </tr>
  );
}

Conseiller.propTypes = {
  miseEnRelation: PropTypes.object,
  currentPage: PropTypes.number,
  currentFilter: PropTypes.string
};

export default Conseiller;
