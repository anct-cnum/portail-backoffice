import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../../actions';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import dayjs from 'dayjs';

function ConseillerDetails({ location }) {

  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller);

  useEffect(() => {
    dispatch(conseillerActions.get(location.conseillerId));
  }, []);

  return (
    <div className="ConseillerDetails">
      <Link style={{boxShadow:"none"}} to="/structure/conseillers/nouvelle" className="rf-link rf-fi-arrow-left-line rf-link--icon-left">
        Retour à la liste
      </Link>
      <div>
          <h2><i className="ri-briefcase-fill valignMiddle"></i>&nbsp;Conseiller {conseiller?.conseiller?.nom}&nbsp;{conseiller?.conseiller?.prenom}</h2>
          <p>Situation professionnelle : {conseiller?.conseiller?.estEnEmploi ? 'a en emploi' : 'sans emploi'}</p>
          <p>Lieu de résidence : {conseiller?.conseiller?.nomCommune}</p>
          <p>Distance de déplacement : {conseiller?.conseiller?.distanceMax}&nbsp;Km</p>
          <p>Date de démarrage possible : { dayjs(conseiller?.conseiller?.dateDisponibilite).format('DD/MM/YYYY') }</p>
          <p>Email : {conseiller?.conseiller?.email}</p>
      </div>
    </div>
  );
}

ConseillerDetails.propTypes = {
    location: PropTypes.object
}

export default ConseillerDetails;
