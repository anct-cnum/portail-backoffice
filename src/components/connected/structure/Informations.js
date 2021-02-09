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
      <div>
        <h2>Structure</h2>
        <strong>{ structure?.details?.nom }</strong>
        <p>Siret : { structure?.details?.siret }</p>
        <p>Date d&apos;inscription : { dayjs(structure?.details?.dateDebutMission).format('DD/MM/YYYY') }</p>
        <p>Code Postal : { structure?.details?.codePostal }</p>
        <p>Statut : { structure?.details?.statut }</p>
        <p>Nombre de conseillers souhaites : { structure?.details?.nombreConseillersSouhaites }</p>
      </div>
      <div>
      <h2>Contact</h2>
        <strong>Nom : { structure?.details?.contactNom }</strong>
        <p>Prénom : { structure?.details?.contactPrenom }</p>
        <p>Téléphone : { structure?.details?.contactTelephone }</p>
        <p>Nombre de mises en relation : { conseillers.items.total }</p>
      </div>
    </div>
  );
}

export default Informations;
