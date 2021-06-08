import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { structureActions } from '../../../actions';
import InfoAModifier from './InfoAModifier';

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
      <div className="rf-grid-row container">
        <div className="rf-col-6">
          <p>Nom : { structure?.structure?.contact.nom }</p>
          <p>Prénom : { structure?.structure?.contact.prenom }</p>
          <p>Fonction : { structure?.structure?.contact.fonction }</p>
          <p>Téléphone : { structure?.structure?.contact.telephone }</p>
          <button className="rf-btn">
            Modifier mes informations
            <span style={{ color: 'white' }} className="rf-fi-edit-line rf-ml-4v" aria-hidden="true"/>
          </button>
        </div>
        <div className="rf-col-4">
          <InfoAModifier structure={structure?.structure?.contact}/>
        </div>
      </div>
    </div>
  );
}

export default MonCompte;
