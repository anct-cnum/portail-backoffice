import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../../actions';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import ButtonsAction from './ButtonsAction'

function ConseillerDetails({ location }) {

  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller);

  const updateStatut = statut => {
    dispatch(conseillerActions.updateStatus({ id: location.miseEnRelationId, statut }));
  }

  useEffect(() => {
    dispatch(conseillerActions.get(location.conseillerId));
  }, []);

  return (
    <div className="ConseillerDetails">
      <Link style={{boxShadow:"none"}} to="/structure/conseillers/nouvelle" className="rf-link rf-fi-arrow-left-line rf-link--icon-left">
        Retour à la liste
      </Link>
      <div>
          <h2><i className="ri-briefcase-fill valignMiddle"></i>&nbsp;Conseiller {conseiller?.conseiller?.prenom}&nbsp;{conseiller?.conseiller?.nom}</h2>
          <p>Situation professionnelle : {conseiller?.conseiller?.estEnEmploi ? 'a en emploi' : 'sans emploi'}</p>
          <p>Diplomé : {conseiller?.conseiller?.estDiplomeMedNum ? 'Oui' : 'Non'}</p>
          <p>Nom du diplôme : {conseiller?.conseiller?.nomDiplomeMedNum}</p>
          <p>Expérience professionnelle : {conseiller?.conseiller?.aUneExperienceMedNum}</p>
          <p>Lieu de résidence : {conseiller?.conseiller?.nomCommune}</p>
          <p>Distance de déplacement : {conseiller?.conseiller?.distanceMax}&nbsp;Km</p>
          <p>Date de démarrage possible : { dayjs(conseiller?.conseiller?.dateDisponibilite).format('DD/MM/YYYY') }</p>
          <p>Email : {conseiller?.conseiller?.email}</p>
          <p>Téléphone : {conseiller?.conseiller?.telephone}</p>
      </div>
      <ButtonsAction statut={conseiller?.miseEnRelation?.statut ? conseiller?.miseEnRelation?.statut : location.miseEnRelationStatut} updateStatut={updateStatut} />
      <p></p>
    </div>
  );
}

ConseillerDetails.propTypes = {
    location: PropTypes.object
}

export default ConseillerDetails;
