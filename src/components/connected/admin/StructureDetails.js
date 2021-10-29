import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { structureActions, statsActions, conseillerActions, paginationActions, userActions } from '../../../actions';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';
import moment from 'moment';
import 'moment/locale/fr';
import Pagination from '../../common/Pagination';
import Conseiller from './Conseiller';
import FlashMessage from 'react-flash-message';
import SiretForm from './SiretForm';
import EmailForm from './EmailForm';
import InvitationForm from '../../common/InvitationForm';
import Spinner from 'react-loader-spinner';

moment.locale('fr');

function StructureDetails({ location }) {
  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure);
  const { stats } = useSelector(state => state.stats);
  const siretError = useSelector(state => state.structure?.siretError);
  const structureUpdateValid = useSelector(state => state.structure?.structureSiretUpdated);
  const structureUpdateError = useSelector(state => state.structure?.structutreSiretError);
  const structureEmailSuccess = useSelector(state => state?.structure?.messageChangeEmailSuccess);
  const structureEmailError = useSelector(state => state?.structure?.messageChangeEmailError);
  const [messageEmailChange, setMessageEmailChange] = useState(false);
  const [displayFormMultiCompte, setDisplayFormMulticompte] = useState(false);

  let { id } = useParams();
  const conseillers = useSelector(state => state.conseillers);
  let [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [displaySiretForm, setDisplaySiretForm] = useState(false);
  const [displayFormEmail, setDisplayFormEmail] = useState(false);
  const errorMulticompte = useSelector(state => state.user?.error);
  const sucessMulticompte = useSelector(state => state.user?.status);
  const [loadingSnipper, setLoadingSnipper] = useState(false);
  const error = useSelector(state => state.structure?.patchError);
  const users = useSelector(state => state.user?.users);
  const userError = useSelector(state => state.user?.userError);

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
      name: 'candidats déjà recrutés par une autre structure',
      nameSingle: 'candidat déjà recruté par une autre structure',
      key: 'finalisee_non_disponible',
      order: 6
    },
    {
      name: 'candidatures',
      nameSingle: 'candidature',
      key: 'nouvelle',
      order: 5
    },
    {
      name: 'candidatures pré sélectionnées',
      nameSingle: 'candidature pré sélectionnée',
      key: 'interessee',
      order: 3
    },
    {
      name: 'candidatures non retenues',
      nameSingle: 'candidature non retenue',
      key: 'nonInteressee',
      order: 4
    },
    {
      name: 'candidatures validées',
      nameSingle: 'candidature validée',
      key: 'recrutee',
      order: 2
    },
    {
      name: 'candidats recrutés',
      nameSingle: 'candidat recruté',
      key: 'finalisee',
      order: 1
    },
    {
      name: 'ruptures de contrat',
      nameSingle: 'rupture de contrat',
      key: 'finalisee_rupture',
      order: 7
    }
  ];

  if (Array.isArray(stats)) {
    stats.sort((a, b) => {
      let stat1 = statutsLabel.find(stat => stat.key === a.statut);
      let stat2 = statutsLabel.find(stat => stat.key === b.statut);
      return (stat1.order < stat2.order) ? -1 : 1;
    });
  }

  useEffect(() => {
    dispatch(userActions.usersByStructure(id));
    dispatch(structureActions.cancelStructureSiret());
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
    }, {
      key: 'GIP',
      type: 'GIP'
    }
  ];

  const user = useSelector(state => state.authentication.user.user);
  const errorSendMail = useSelector(state => state.structure?.errorResendInscription);

  const resendInscription = () => {
    window.scrollTo(0, 0); //remonte la page pour visualiser le message flash
    dispatch(structureActions.resendInscription(id));
  };

  useEffect(() => {
    if (structureUpdateValid) {
      dispatch(structureActions.get(id));
    }
  }, [structureUpdateValid]);

  useEffect(() => {
    if (structureEmailSuccess === true) {
      setMessageEmailChange(true);
      dispatch(structureActions.get(id));
    }
  }, [structureEmailSuccess]);

  useEffect(() => {
    if (sucessMulticompte !== undefined || errorMulticompte !== undefined) {
      setLoadingSnipper(false);
    }
  }, [sucessMulticompte, errorMulticompte]);

  return (
    <div className="StructureDetails">
      <div style={{ textAlign: 'center' }}>
        <Spinner
          type="Oval"
          color="#00BFFF"
          height={80}
          width={80}
          visible={loadingSnipper}
        />
      </div>
      { (sucessMulticompte !== undefined) &&
            <FlashMessage duration={10000}>
              { ((error === undefined || error === false) && errorMulticompte === undefined && sucessMulticompte !== undefined) &&
                <p className="rf-label flashBag" style={{ fontSize: '16px' }}>
                  {sucessMulticompte ?? 'Invitation à rejoindre la structure envoyée !'}
                  &nbsp;
                  <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
                </p>
              }
            </FlashMessage>
      }
      { (errorMulticompte !== undefined) &&
            <FlashMessage duration={10000}>
              { errorMulticompte !== undefined &&
                <p className="rf-label flashBag labelError" style={{ fontSize: '16px' }}>
                  {errorMulticompte}
                </p>
              }
            </FlashMessage>
      }
      {structureUpdateValid &&
        <FlashMessage duration={10000} >
          <div className=" flashBag">
            <span>
              Le SIRET de la structure a bien été modifié !
            </span>
          </div>
        </FlashMessage>
      }
      {(siretError || structureUpdateError) &&
        <FlashMessage duration={10000} >
          <div className=" flashBag invalid">
            <span>
              {siretError}
              {structureUpdateError}
            </span>
          </div>
        </FlashMessage>
      }

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

      { messageEmailChange &&
            <FlashMessage duration={10000}>
              { structureEmailSuccess === true &&
            <p className="rf-label flashBag">
              L&apos;adresse e-mail a été changée avec succès
              &nbsp;
              <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
            </p>
              }
              { structureEmailError === true &&
            <p className="rf-label flashBag labelError">
             Une erreur est survenue lors de la modification de l&rsquo;e-mail.<br/>
             Veuillez réessayer plus tard.
            </p>
              }
            </FlashMessage>
      }

      <Link
        style={{ boxShadow: 'none' }}
        to={{
          pathname: location.origin,
          currentPage: location.currentPage
        }}
        className="rf-link rf-fi-arrow-left-line rf-link--icon-left">
        Retour à la liste
      </Link>
      <div>
        <h2>
          {structure?.structure?.nom}
        </h2>
        {displaySiretForm === false &&
          <h3>
            SIRET
            { user?.role.includes('admin') &&
              <button onClick={() => setDisplaySiretForm(true)} className="siretBtn">
                {!structure?.structure?.siret && <>Aucun numéro !</>}{structure?.structure?.siret } &nbsp;
                <img src="/logos/icone-crayon.svg" alt="Modifier le SIRET" style={{ height: '0.9em' }}/>
              </button>
            }
            { user?.role.includes('prefet') &&
              <span>
                {!structure?.structure?.siret && <>&nbsp;Aucun numéro !</>}{structure?.structure?.siret }
              </span>
            }
          </h3>
        }

        {displaySiretForm === true &&
          <div style={{ width: '320px' }}>
            <SiretForm setDisplaySiretForm={setDisplaySiretForm} structureId={structure?.structure?._id}/>
          </div>
        }

        <div className="rf-container-fluid">
          <p>Grand réseau : {structure?.structure?.reseau ? `Oui (${structure?.structure?.reseau})` : 'Non'}</p>
          <p>Type : {structure?.structure && typeStructure.find(item => item.key === (structure?.structure?.type))?.type}</p>
          {['prefet', 'admin'].indexOf(user.role) !== -1 &&
            <p>Zone rurale : {structure?.structure?.estZRR ? 'Oui' : 'Non'}</p>
          }
          <p>Code postal : {structure?.structure?.codePostal}</p>
          <p>{structure?.structure?.nombreConseillersSouhaites} conseillers numériques France Services souhaités</p>
          <p>Prêt à accueillir votre conseiller numérique France Services à partir du {moment(structure?.structure?.dateDebutMission).format('D MMMM YYYY')}</p>
          <p>Contact : {structure?.structure?.contact?.prenom} {structure?.structure?.contact?.nom} ({structure?.structure?.contact?.fonction})</p>
          <p>Téléphone : {structure?.structure?.contact?.telephone}</p>
          {displayFormEmail === true ?
            <EmailForm setDisplayFormEmail={setDisplayFormEmail} structureId={structure?.structure?._id} /> :
            <p>
              Email : <a href={`mailto:${structure?.structure?.contact?.email}`}>{structure?.structure?.contact?.email}</a>	&nbsp;
              <button onClick={() => {
                setDisplayFormEmail(true);
                setMessageEmailChange(false);
              }}
              style={{ cursor: 'pointer', border: 'none', borderBottom: '1px solid', paddingBottom: 'inherit' }}>
                <img src="/logos/icone-crayon.svg" alt="Modifier l'email" style={{ height: '1rem' }}/>
              </button>
            </p>
          }
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
          { user?.role === 'admin' && structure?.structure?.statut === 'VALIDATION_COSELEC' &&
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

              {stats.map((stat, idx) =>
                <div key={idx}>
                  {stat.statut === 'finalisee' &&
                   <>
                     <h3 className="capitalizeFirstLetter">
                       {stat.count > 1 && statutsLabel.find(label => label.key === stat.statut)?.name }
                       {stat.count <= 1 && statutsLabel.find(label => label.key === stat.statut)?.nameSingle }
                     </h3>
                     {stat.candidats && stat.candidats.map((candidat, idx) =>
                       <p key={idx}>
                         <Link to={{
                           pathname: `/candidat/${candidat?._id}`,
                           origin: `/structure/${structure?.structure?._id}` }}>
                           {candidat.prenom} {candidat.nom}
                         </Link>
                       </p>
                     )}
                     {!stat.candidats &&
                      <p>Aucun candidat trouvé</p>
                     }
                   </>
                  }
                </div>
              )}

              {stats.map((stat, idx) =>
                <div key={idx}>
                  {stat.statut === 'recrutee' &&
                   <>
                     <h3 className="capitalizeFirstLetter">
                       {stat.count > 1 && statutsLabel.find(label => label.key === stat.statut)?.name }
                       {stat.count <= 1 && statutsLabel.find(label => label.key === stat.statut)?.nameSingle }
                     </h3>
                     {stat.candidats && stat.candidats.map((candidat, idx) =>
                       <p key={idx}>
                         <Link to={{
                           pathname: `/candidat/${candidat?._id}`,
                           origin: `/structure/${structure?.structure?._id}` }}>
                           {candidat.prenom} {candidat.nom}
                         </Link>
                       </p>
                     )}
                     {!stat.candidats &&
                      <p>Aucun candidat trouvé</p>
                     }
                   </>
                  }
                </div>
              )}
              <div className="rf-mt-5w">
                <h3>Compte associés à la structure</h3>
                { !userError && users &&
              <>
                {users.length === 0 && <p>Aucun compte crée.</p>}
                {users && users.map((user, idx) => {
                  return (
                    <p key={idx} className={!user.passwordCreated ? 'inactif' : 'actif'}
                      title={!user.passwordCreated ? 'Compte inactif pour le moment' : 'Compte actif'} >{user.name}</p>
                  );
                })
                }
              </>
                }
                {displayFormMultiCompte === false &&
                    <button className="rf-btn" onClick={() => setDisplayFormMulticompte(true) }>
                      Envoyer une invitation
                      <span className="rf-fi-mail-line rf-ml-4v" aria-hidden="true"></span>
                    </button>
                }
                {displayFormMultiCompte === true &&
                    <div style={{ width: '30%' }}>
                      <InvitationForm
                        setDisplayFormMulticompte={setDisplayFormMulticompte}
                        structureId={structure?.structure?._id}
                        setLoadingSnipper={setLoadingSnipper}
                      />
                    </div>
                }
              </div>
              <h3>Liste des candidats</h3>

              {conseillers && conseillers.loading && <span>Chargement...</span>}

              <div className="rf-table">
                <table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Prénom</th>
                      <th>Nom</th>
                      <th>Date de candidature</th>
                      <th>Code postal</th>
                      <th>Résultat Pix</th>
                      <th>Curriculum&aelig;Vitæ</th>
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
