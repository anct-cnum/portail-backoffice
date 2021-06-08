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
      <div>
        <p>Nom : { structure?.structure?.contact.nom }</p>
        <span className="fr-fi-edit-line" aria-hidden="true"></span>
      </div>
      <div>
        <p>Prénom : { structure?.structure?.contact.prenom }</p>
        <span className="fr-fi-edit-line" aria-hidden="true"></span>
      </div>
      <div>
        <p>Prénom : { structure?.structure?.contact.fonction }</p>
        <span className="fr-fi-edit-line" aria-hidden="true"></span>
      </div>
      <div>
        <p>Téléphone : { structure?.structure?.contact.telephone }</p>
        <span className="fr-fi-edit-line" aria-hidden="true"></span>
      </div>
    </div>
  );
}

export default MonCompte;
