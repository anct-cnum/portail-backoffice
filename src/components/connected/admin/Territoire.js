import React from 'react';
import PropTypes from 'prop-types';

function Territoire({ territoire }) {

  return (
    <tr>
      <td>{territoire?.nomDepartement ?? territoire?.nomRegion}</td>
      <td>{territoire?.CRAEnregistres ?? 0}</td>
      <td>{territoire?.personnesAccompagnees ?? 0}</td>
      <td>{territoire?.nombreConseillersCoselec ?? 0}</td>
      <td>{territoire?.cnfsActives ?? 0}</td>
      <td>{territoire?.cnfsInactives ?? 0}</td>
      <td>{territoire?.tauxActivation ?? 0} %</td>
    </tr>
  );
}

Territoire.propTypes = {
  territoire: PropTypes.object
};

export default Territoire;
