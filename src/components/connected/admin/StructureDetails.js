import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { structureActions, statsActions } from '../../../actions';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

function StructureDetails({ location }) {

  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure);
  const { stats } = useSelector(state => state.stats);
  let { id } = useParams();

  useEffect(() => {
    dispatch(structureActions.get(id));
    dispatch(statsActions.getMisesEnRelationStats(id));
  }, []);

  const statutsLabel = [
    {
      name: 'nouvelles candidatures',
      key: 'nouvelle'
    },
    {
      name: 'candidatures pré sélectionnées',
      key: 'interessee'
    },
    {
      name: 'candidatures non retenues',
      key: 'nonInteressee'
    },
    {
      name: 'candidatures validées',
      key: 'recrutee'
    }
  ];

  return (
    <div className="StructureDetails">
      <Link
        style={{ boxShadow: 'none' }}
        to={{
          pathname: `/structures`,
          currentPage: location.currentPage
        }}
        className="rf-link rf-fi-arrow-left-line rf-link--icon-left">
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
          <h3>Statistiques</h3>
          { stats && stats.length === 0 &&
            <p>Pas de mise en relation pour le moment.</p>
          }
          { stats && stats.length > 0 && stats.map((stat, idx) =>
            <p key={idx}>
              {stat.count} {statutsLabel.find(label => label.key === stat.statut).name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

StructureDetails.propTypes = {
  location: PropTypes.object
};

export default StructureDetails;
