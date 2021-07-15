import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Conseiller({ miseEnRelation, dejaRecrutee, currentPage, currentFilter, search }) {

  const verificationIdPG = dejaRecrutee.find(elem => elem === miseEnRelation.conseillerObj.idPG);

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
  }, {
    key: 'finalisee',
    label: 'Candidat déjà recruté'
  },
  ];

  return (
    <tr className="conseiller">
      <td>{miseEnRelation.conseillerObj.prenom}</td>
      <td>{miseEnRelation.conseillerObj.nom}</td>
      { search && <td>{miseEnRelation.conseillerObj.email}</td>}
      <td>{Boolean(verificationIdPG) === true ?
        'Candidat déjà recruté' : statutLabel.find(item => item.key === miseEnRelation.statut).label}</td>
      <td>{dayjs(miseEnRelation.conseillerObj.createdAt).format('DD/MM/YYYY')}</td>
      <td>{miseEnRelation.conseillerObj.codePostal}</td>
      { !search && <td>
        { miseEnRelation.conseillerObj?.pix?.partage &&
          <div className="tooltip">
            <img src="/logos/logo-pix.svg" alt="logo Pix" style={{ height: '36px' }}/>
            <span className="tooltiptext">A partagé ses résultats Pix</span>
          </div>
        }
      </td> }
      <td>
        { Boolean(verificationIdPG) === true ?
          <button className="rf-btn rf-fi-eye-line rf-btn--icon-left" style={{ background: '#383838', opacity: '0.33', color: 'white' }} disabled>
          Détails
          </button> :
          <Link className="rf-btn rf-fi-eye-line rf-btn--icon-left" style={{ boxShadow: 'none' }} to={{
            pathname: `/structure/candidat/${miseEnRelation.conseillerObj._id}`,
            miseEnRelation: miseEnRelation,
            currentPage: currentPage,
            currentFilter: currentFilter }}>
            Détails
          </Link>}
      </td>
    </tr>
  );
}

Conseiller.propTypes = {
  miseEnRelation: PropTypes.object,
  currentPage: PropTypes.number,
  currentFilter: PropTypes.string,
  search: PropTypes.bool,
  dejaRecrutee: PropTypes.array
};

export default Conseiller;
