import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { structureActions, statsActions, conseillerActions, paginationActions } from '../../../actions';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';
import moment from 'moment';
import 'moment/locale/fr';
import Pagination from '../../common/Pagination';
import Conseiller from './Conseiller';
import FlashMessage from 'react-flash-message';

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
      name: 'candidatures',
      nameSingle: 'candidature',
      key: 'nouvelle'
    },
    {
      name: 'candidatures pré sélectionnées',
      nameSingle: 'candidature pré sélectionnée',
      key: 'interessee'
    },
    {
      name: 'candidatures non retenues',
      nameSingle: 'candidature non retenue',
      key: 'nonInteressee'
    },
    {
      name: 'candidatures validées',
      nameSingle: 'candidature validée',
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

  const user = useSelector(state => state.authentication.user.user);
  const errorSendMail = useSelector(state => state.structure?.errorResendInscription);

  const resendInscription = () => {
    window.scrollTo(0, 0); //remonte la page pour visualiser le message flash
    dispatch(structureActions.resendInscription(id));
  };

  return (
    <div className="StructureDetails">
      { structure?.flashMessage === true &&
      <FlashMessage duration={10000}>
        { (errorSendMail === undefined || errorSendMail === false) &&
        <p className="rf-label flashBag">
          Le mail de relance d&rsquo;inscription a bien été envoyé pour cette structure
          &nbsp;
          <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
        </p>
        }
        { (errorSendMail !== undefined && errorSendMail !== false) &&
        <p className="rf-label flashBag labelError">
          L&rsquo;envoi du mail de relance d&rsquo;inscription a échoué, veuillez réessayer plus tard
        </p>
        }
      </FlashMessage>
      }
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
          <p>Type : {structure?.structure && typeStructure.find(item => item.key === (structure?.structure?.type))?.type}</p>
          {user.role === 'prefet' &&
            <p>Zone rurale : {structure?.structure?.estZRR ? 'Oui' : 'Non'}</p>
          }
          <p>Code postal : {structure?.structure?.codePostal}</p>
          <p>{structure?.structure?.nombreConseillersSouhaites} conseillers numériques France Services souhaités</p>
          <p>Prêt à accueillir votre conseiller numérique France Services à partir du {moment(structure?.structure?.dateDebutMission).format('D MMMM YYYY')}</p>
          <p>Contact : {structure?.structure?.contact?.prenom} {structure?.structure?.contact?.nom} ({structure?.structure?.contact?.fonction})</p>
          <p>Téléphone : {structure?.structure?.contact?.telephone}</p>
          <p>Email : <a href={`mailto:${structure?.structure?.contact?.email}`}>{structure?.structure?.contact?.email}</a></p>
          {/* eslint-disable-next-line max-len */}
          <p>Avis Coselec : {structure?.structure?.statut === 'VALIDATION_COSELEC' && structure?.structure?.dernierCoselec !== null ? structure?.structure?.dernierCoselec?.avisCoselec : 'en attente de passage'}
          </p>
          {structure?.structure?.statut === 'VALIDATION_COSELEC' && structure?.structure?.dernierCoselec !== null &&
            <p>
              <Pluralize
                singular={'Nombre de poste validé : '}
                plural={'Nombre de postes validés : '}
                count={structure?.structure?.dernierCoselec?.nombreConseillersCoselec}
                showCount={false}
              />
              {structure?.structure?.dernierCoselec?.nombreConseillersCoselec}
            </p>
          }
          { user?.role === 'admin' &&
            <button className="rf-btn" onClick={resendInscription}>Renvoyer l&rsquo;email d&rsquo;inscription</button>
          }
          <h3>Statistiques</h3>
          {stats && stats.length === 0 &&
            <p>Pas de mise en relation pour le moment.</p>
          }
          {stats && stats.length > 0 &&
            <>
              {stats.map((stat, idx) =>
                <p key={idx}>
                  {stat.count}
                  &nbsp;{stat.count > 1 && statutsLabel.find(label => label.key === stat.statut).name}
                  &nbsp;{stat.count <= 1 && statutsLabel.find(label => label.key === stat.statut).nameSingle}
                </p>
              )}
              <h3>Liste des candidats</h3>

              {conseillers && conseillers.loading && <span>Chargement...</span>}

              <div className="rf-table">
                <table>
                  <thead>
                    <tr>
                      <th>Prénom</th>
                      <th>Nom</th>
                      <th>Date de candidature</th>
                      <th>Code postal</th>
                      <th>Résultat Pix</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {!conseillers.error && !conseillers.loading && conseillers.items && conseillers.items.data.map((miseEnRelation, idx) => {
                      // TODO: non conservation de la page car retour à la liste des conseillers
                      return (<Conseiller key={idx} conseiller={miseEnRelation.conseillerObj} />);
                    })
                    }
                  </tbody>
                </table>
              </div>

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
