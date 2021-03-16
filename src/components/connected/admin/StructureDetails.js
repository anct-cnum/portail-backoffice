import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { structureActions } from '../../../actions';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

function StructureDetails() {

  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure);
  let { id } = useParams();

  useEffect(() => {
    dispatch(structureActions.get(id));
  }, []);

  return (
    <div className="StructureDetails">
      <Link style={{ boxShadow: 'none' }} to="/structures" className="rf-link rf-fi-arrow-left-line rf-link--icon-left">
        Retour à la liste
      </Link>
      <div>
        <h2>
          {structure?.structure?.nom}
        </h2>
        <h3>
          SIRET {structure?.structure?.siret}
        </h3>
        <div className="rf-container-fluid">
          <p>Type : {structure?.structure?.type}</p>
          <p>Code postal : {structure?.structure?.codePostal}</p>
          <p>{structure?.structure?.nombreConseillersSouhaites} conseillers numériques France Services souhaités</p>
          <p>Prêt à accueillir votre conseiller numérique France Services à partir du {moment(structure?.structure?.dateDebutMission).format('D MMMM YYYY')}</p>
          <p>Contact : {structure?.structure?.contactPrenom} {structure?.structure?.contactNom} ({structure?.structure?.contactFonction})</p>
          <p>Téléphone : {structure?.structure?.contactTelephone}</p>
          <p>Email : <a href={`mailto:${structure?.structure?.contactEmail}`}>{structure?.structure?.contactEmail}</a></p>
        </div>
      </div>
    </div>
  );
}

StructureDetails.propTypes = {
  location: PropTypes.object
};

export default StructureDetails;