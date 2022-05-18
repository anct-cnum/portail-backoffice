import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statistiquesPrefetActions } from '../../../../../actions';

function ElementCodePostal() {

  const dispatch = useDispatch();
  const listeCodesPostaux = useSelector(state => state.statistiquesPrefet?.listeCodesPostaux);
  const setCodePostal = e => {
    dispatch(statistiquesPrefetActions.changeCodePostalStats(e.target.value));
  };

  return (
    <select className="fr-select code-postal-select" onChange={setCodePostal}>
      <option value="">Tous codes postaux</option>
      {listeCodesPostaux && listeCodesPostaux?.map((codePostal, idx) => {
        return (<option key={idx} value={codePostal}>{codePostal}</option>);
      })}
    </select>
  );
}

export default ElementCodePostal;
