import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { structureActions } from '../../../actions';


function MonCompte() {
  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure);

  useEffect(() => {
    dispatch(structureActions.get());
  }, []);

  return (
    <div className="monCompte">
      <h2>
        Mon compte
      </h2>
      <p>Nom : { structure?.structure?.contact.nom }</p>
      <p>Prénom : { structure?.structure?.contact.prenom }</p>
      <p>Fonction : { structure?.structure?.contact.fonction }</p>
      <p>Téléphone : { structure?.structure?.contact.telephone }</p>
    </div>
  );
}

export default MonCompte;
