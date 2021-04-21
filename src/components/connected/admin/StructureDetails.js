import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { structureActions, statsActions, conseillerActions, paginationActions } from '../../../actions';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/fr';
import Pagination from '../../common/Pagination';
import Conseiller from './Conseiller';

moment.locale('fr');

function StructureDetails({ location }) {

  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure);
  const { stats } = useSelector(state => state.stats);
  let { id } = useParams();
  const conseillers = useSelector(state => state.conseillers);
  let [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const navigate = page => {
    setPage(page);
    dispatch(conseillerActions.getAll({
      misesEnRelation: true,
      structureId: id,
      page: conseillers.items ? (page - 1) * conseillers.items.limit : 0,
    }));
  };

  useEffect(() => {
    if (conseillers.items) {
      const count = Math.floor(conseillers.items.total / conseillers.items.limit);
      setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1);
    }
  }, [conseillers]);

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

  useEffect(() => {
    dispatch(paginationActions.resetPage(false));
    dispatch(structureActions.get(id));
    navigate(1);
    dispatch(statsActions.getMisesEnRelationStats(id));
  }, []);

  const typeStructure = [
    {
      key: 'PRIVATE',
      type: 'Privée'
    }, {
      key: 'COMMUNE',
      type: 'Commune'
    }, {
      key: 'EPCI',
      type: 'EPCI'
    }, {
      key: 'DEPARTEMENT',
      type: 'Département'
    }, {
      key: 'COLLECTIVITE',
      type: 'Collectivité'
    }, {
      key: 'REGION',
      type: 'Région'
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
          <p>Type : {structure?.structure && typeStructure.find(item => item.key === (structure?.structure?.type)).type}</p>
          <p>Code postal : {structure?.structure?.codePostal}</p>
          <p>{structure?.structure?.nombreConseillersSouhaites} conseillers numériques France Services souhaités</p>
          <p>Prêt à accueillir votre conseiller numérique France Services à partir du {moment(structure?.structure?.dateDebutMission).format('D MMMM YYYY')}</p>
          <p>Contact : {structure?.structure?.contactPrenom} {structure?.structure?.contactNom} ({structure?.structure?.contactFonction})</p>
          <p>Téléphone : {structure?.structure?.contactTelephone}</p>
          <p>Email : <a href={`mailto:${structure?.structure?.contactEmail}`}>{structure?.structure?.contactEmail}</a></p>
          <p>Avis Coselec: {structure?.structure?.statut === 'VALIDATION_COSELEC' ? structure?.structure?.avisCoselec : 'en attente de passage'}</p>
          { structure?.structure?.statut === 'VALIDATION_COSELEC' &&
            <p>Avis Coselec: {[...structure?.structure?.coselec].pop().nombreConseillersCoselec}</p>
          }
          <h3>Statistiques</h3>
          { stats && stats.length === 0 &&
            <p>Pas de mise en relation pour le moment.</p>
          }
          { stats && stats.length > 0 &&
            <>
              { stats.map((stat, idx) =>
                <p key={idx}>
                  {stat.count} {statutsLabel.find(label => label.key === stat.statut).name}
                </p>
              )}
              <h3>Liste des candidats</h3>

              { conseillers && conseillers.loading && <span>Chargement...</span> }

              { !conseillers.error && !conseillers.loading && conseillers.items && conseillers.items.data.map((miseEnRelation, idx) => {
                return (<Conseiller key={idx} conseiller={miseEnRelation.conseiller} />); //non conservation de la page car retour à la liste des conseillers...
              })
              }

              <Pagination current={page} pageCount={pageCount} navigate={navigate} />
            </>
          }
        </div>
      </div>
    </div>
  );
}

StructureDetails.propTypes = {
  location: PropTypes.object
};

export default StructureDetails;
