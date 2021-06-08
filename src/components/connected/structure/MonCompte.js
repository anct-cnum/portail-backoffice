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
      {/* VERSION 1 */}
      <div className="rf-grid-row">
        <p>Nom : { structure?.structure?.contact.nom }</p>
        <span style={{ color: 'blue' }} className="rf-fi-edit-line rf-mt-2w rf-ml-3v " aria-hidden="true"></span>
      </div>
      <div className="rf-grid-row">
        <p>Prénom : { structure?.structure?.contact.prenom }</p>
        <span style={{ color: 'blue' }} className="rf-fi-edit-line rf-mt-2w rf-ml-3v " aria-hidden="true"></span>
      </div>
      <div className="rf-grid-row">
        <p>Prénom : { structure?.structure?.contact.fonction }</p>
        <span style={{ color: 'blue' }} className="rf-fi-edit-line rf-mt-2w rf-ml-3v " aria-hidden="true"></span>
      </div>
      <div className="rf-grid-row">
        <p>Téléphone : { structure?.structure?.contact.telephone }</p>
        <span style={{ color: 'blue' }} className="rf-fi-edit-line rf-mt-2w rf-ml-3v " aria-hidden="true"></span>
      </div>
      {/* VERSION 2 */}
      <p>Nom : { structure?.structure?.contact.nom }</p>
      <p>Prénom : { structure?.structure?.contact.prenom }</p>
      <p>Fonction : { structure?.structure?.contact.fonction }</p>
      <p>Téléphone : { structure?.structure?.contact.telephone }</p>
      <button className="rf-btn">
            Modifier mes informations
        <span style={{ color: 'white' }} className="rf-fi-edit-line rf-ml-4v" aria-hidden="true"/>
      </button>
    </div>
  );
}

export default MonCompte;
