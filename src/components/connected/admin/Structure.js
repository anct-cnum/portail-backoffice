import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ClickAndSave from '../../common/ClickAndSave';

function Structure({ structure, currentPage }) {
  const labels = {
    VALIDATION_COSELEC: 'Validée',
    EXAMEN_COMPLEMENTAIRE_COSELEC: 'Examen complémentaire',
    REFUS_COSELEC: 'Refus',
    CREEE: 'Non traitée',
    ABANDON: 'Abandonnée',
    ANNULEE: 'Annulée',
    DOUBLON: 'Doublon'
  };
  return (
    <tr>
      <td><ClickAndSave field={structure?.idPG}/></td>
      <td> {structure.siret !== null ? structure.siret : 'non renseigné' } </td>
      <td>
        {structure.estLabelliseFranceServices === 'OUI' ?
          <img src="/logos/ex-libris-france-services.svg" alt="label france services" className="fr-mt-5v fr-ml-4w" style={{ height: '50px' }}/> :
          ''}
      </td>
      <td className="capitalizeFirstLetter">{structure.nom}</td>
      <td>
        { labels[structure?.statut] }
      </td>
      <td>{dayjs(structure.createdAt).format('DD/MM/YYYY')}</td>
      <td>{structure.codePostal}</td>
      <td> {structure.nbCandidatsRecrutes}</td>
      <td>        <Link className="fr-btn fr-fi-eye-line fr-btn--icon-left" style={{ boxShadow: 'none' }}
        to={{
          pathname: `/structure/${structure._id}`,
          currentPage: currentPage,
          origin: `/structures`
        }}>Détails</Link></td>
    </tr>
  );
}

Structure.propTypes = {
  structure: PropTypes.object,
  currentPage: PropTypes.number,
};

export default Structure;
