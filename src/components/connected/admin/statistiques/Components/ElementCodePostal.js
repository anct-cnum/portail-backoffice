import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statistiquesPrefetActions } from '../../../../../actions';
import PropTypes from 'prop-types';

function ElementCodePostal({ idStructure = '' }) {

  const dispatch = useDispatch();
  const listeCodesPostaux = useSelector(state => state.statistique?.listeCodesPostaux);
  const setCodePostal = e => {
    dispatch(statistiquesPrefetActions.changeCodePostalStats(e.target.value));
  };

  useEffect(() => {
    if (!listeCodesPostaux) {
      if (idStructure) {
        dispatch(statistiquesPrefetActions.getCodesPostauxCrasConseillerStructure(idStructure));
      } else {
        dispatch(statistiquesPrefetActions.getCodesPostauxCrasConseiller());
      }
    }
  });

  return (
    <select className="fr-select code-postal-select fr-my-2w" onChange={setCodePostal}>
      <option value="">Tous codes postaux</option>
      {listeCodesPostaux && listeCodesPostaux?.map((codePostal, idx) => {
        return (<option key={idx} value={codePostal}>{codePostal}</option>);
      })}
    </select>
  );
}

ElementCodePostal.propTypes = {
  idStructure: PropTypes.string,
};
export default ElementCodePostal;
