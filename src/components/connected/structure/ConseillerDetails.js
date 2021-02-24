import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../../actions';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import ButtonsAction from './ButtonsAction';

function ConseillerDetails({ location }) {

  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller);
  let { id } = useParams();

  const updateStatut = statut => {
    dispatch(conseillerActions.updateStatus({ id: location.miseEnRelation?._id, statut }));
  };

  useEffect(() => {
    dispatch(conseillerActions.get(id));
  }, []);

  return (
    <div className="ConseillerDetails">
      <Link style={{ boxShadow: 'none' }} to="/structure/conseillers/nouvelle" className="rf-link rf-fi-arrow-left-line rf-link--icon-left">
        Retour à la liste
      </Link>
      <div>
        <h2>
          <span className="capitalizeFirstLetter">
            <i className="ri-briefcase-fill valignTextTop"></i>
            &nbsp;{conseiller?.conseiller?.prenom}&nbsp;{conseiller?.conseiller?.nom}</span>
        </h2>
        <p>Situation professionnelle : {conseiller?.conseiller?.estEnEmploi ? 'a en emploi' : 'sans emploi'}</p>
        <p>Diplômé : {conseiller?.conseiller?.estDiplomeMedNum ? 'Oui' : 'Non'}</p>
        {conseiller?.conseiller?.estDiplomeMedNum &&
            <p>Nom du diplôme : {conseiller?.conseiller?.nomDiplomeMedNum}</p>
        }
        <p>A de l&rsquo;expérience dans la médiation numérique : {conseiller?.conseiller?.aUneExperienceMedNum ? 'Oui' : 'Non'}</p>
        <p>Lieu de résidence : {conseiller?.conseiller?.nomCommune}</p>
        <p>Distance de déplacement : { Math.ceil(location.miseEnRelation?.distance / 1000) }&nbsp;Km</p>
        <p>Date de démarrage possible : { dayjs(conseiller?.conseiller?.dateDisponibilite).format('DD/MM/YYYY') }</p>
        <p>Courriel : {conseiller?.conseiller?.email}</p>
        <p>Téléphone : {conseiller?.conseiller?.telephone ? conseiller?.conseiller?.telephone : 'pas de numéro de téléphone' }</p>
      </div>
      <ButtonsAction statut={conseiller?.miseEnRelation?.statut ? conseiller?.miseEnRelation?.statut : location.miseEnRelation?.statut}
        updateStatut={updateStatut} />
      <p></p>
    </div>
  );
}

ConseillerDetails.propTypes = {
  location: PropTypes.object
};

export default ConseillerDetails;
