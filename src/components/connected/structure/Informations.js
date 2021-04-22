import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { structureActions, conseillerActions } from '../../../actions';
import dayjs from 'dayjs';

function Informations() {

  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure);

  useEffect(() => {
    dispatch(structureActions.get());
    dispatch(conseillerActions.getAll({ misesEnRelation: true }));
  }, []);

  return (
    <div className="informations">
      <div className="rf-container-fluid">
        <div className="rf-grid-row rf-grid-row--top">
          <div className="rf-col-4">
            <h2 style={{ marginTop: '0' }}>Structure</h2>
            <p>Nom :<strong> { structure?.structure?.nom }</strong></p>
            <p>Siret : { structure?.structure?.siret }</p>
            <p>Date d&apos;inscription : { dayjs(structure?.structure?.dateDebutMission).format('DD/MM/YYYY') }</p>
            <p>Code Postal : { structure?.structure?.codePostal }</p>
          </div>
          <div className="rf-col-4">
            <h2 style={{ marginTop: '0' }}>Contact</h2>
            <p>Nom :<strong> { structure?.structure?.contact?.nom }</strong></p>
            <p>Prénom : { structure?.structure?.contact?.prenom }</p>
            <p>Téléphone : { structure?.structure?.contact?.telephone }</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Informations;
