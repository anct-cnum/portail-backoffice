import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { structureActions } from '../../../actions';
import { useEffect } from 'react';
import dayjs from 'dayjs';

function Informations() {

  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure);
  const conseillers = useSelector(state => state.conseillers);

  useEffect(() => {
    dispatch(structureActions.get());
  }, []);

  return (
    <div className="informations">
      <div className="rf-container">
        <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--center">
          <div className="rf-col-4">
            <h2><i className="ri-sm ri-government-line valignMiddle"></i>&nbsp;Structure</h2>
            <p>Nom :<strong> { structure?.structure?.nom }</strong></p>
            <p>Siret : { structure?.structure?.siret }</p>
            <p>Date d&apos;inscription : { dayjs(structure?.structure?.dateDebutMission).format('DD/MM/YYYY') }</p>
            <p>Code Postal : { structure?.structure?.codePostal }</p>
            <p>Statut : { structure?.structure?.statut }</p>
            <p>Nombre de conseillers souhaites : { structure?.structure?.nombreConseillersSouhaites }</p>
          </div>
          <div className="rf-col-4">
          <h2><span className="rf-fi--lg rf-fi-user-fill"></span>&nbsp;Contact</h2>
            <p>Nom :<strong> { structure?.structure?.contactNom }</strong></p>
            <p>Prénom : { structure?.structure?.contactPrenom }</p>
            <p>Téléphone : { structure?.structure?.contactTelephone }</p>
            <p>Nombre de mises en relation : { conseillers.items.total }</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Informations;
