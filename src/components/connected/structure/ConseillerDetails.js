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
          <h2><i className="ri-briefcase-fill valignMiddle"></i>&nbsp;Conseiller {conseiller?.conseiller?.Nom}&nbsp;{conseiller?.conseiller?.prenom}</h2>
          <p>Situation professionnelle : {conseiller?.conseiller?.Nom}</p>
          <p>Lieu de résidence : {conseiller?.conseiller?.geo_name}</p>
          <p>Distance de déplacement : {conseiller?.conseiller?.max_distance}&nbsp;Km</p>
          <p>Date de démarrage possible : { dayjs(conseiller?.conseiller?.start_date).format('DD/MM/YYYY') }</p>
          <p>Email : {conseiller?.conseiller?.email}</p>
      </div>
    </div>
  );
}

ConseillerDetails.propTypes = {
    location: PropTypes.object
}

export default ConseillerDetails;
