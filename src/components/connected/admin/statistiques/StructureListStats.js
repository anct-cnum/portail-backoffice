import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ClickAndSave from '../../../common/ClickAndSave';

function StructureListStats({ structure, currentPage }) {
  return (
    <tr>
      <td><ClickAndSave field={structure?.idPG}/></td>
      <td> {structure.siret !== null ? structure.siret : 'non renseigné' } </td>
      <td className="capitalizeFirstLetter">{structure.nom}</td>
      <td>{structure.codePostal}</td>
      <td>{structure.CRAEnregistres}</td>
      <td>{structure.personnesAccompagnees}</td>
      <td>
        <Link className="fr-btn fr-fi-eye-line fr-btn--icon-left" style={{ boxShadow: 'none' }}
          to={{
            pathname: `/admin/structure/statistiques/${structure?._id}`,
            currentPage: currentPage,
            origin: `/admin/statistiques`,
            idStructure: structure?._id,
          }}>
            Statistiques
        </Link>
      </td>
    </tr>
  );
}

StructureListStats.propTypes = {
  structure: PropTypes.object,
  currentPage: PropTypes.number,
};

export default StructureListStats;
