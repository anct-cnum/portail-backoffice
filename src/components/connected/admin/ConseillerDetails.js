import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions, paginationActions } from '../../../actions';
import Spinner from 'react-loader-spinner';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import FlashMessage from 'react-flash-message';

function ConseillerDetails({ location }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication.user.user);
  const role = user.role;
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const downloading = useSelector(state => state.conseiller?.downloading);
  const nomStructure = useSelector(state => state.conseiller?.nomStructure);
  const successSuppressionCandidat = useSelector(state => state.conseiller?.conseillerSuccessSuppression);
  const erreurSuppressionCandidat = useSelector(state => state.conseiller?.conseillerErreurSuppression);
  const [confirmSuppressionCandidat, setConfirmSuppressionCandidat] = useState(false);
  const [confirmEmailCandidat, setConfirmEmailCandidat] = useState('');
  const [motif, setMotif] = useState('');
  const [autreMotif, setAutreMotif] = useState(false);
  const invitEspaceCandidatConseiller = useSelector(state => state?.conseiller);
  const errorSendMail = useSelector(state => state.conseiller?.errorResendInvitCandidatConseiller);
  const successSendMail = useSelector(state => state.conseiller?.successResendInvitCandidatConseiller);

  let { id } = useParams();

  useEffect(() => {
    dispatch(conseillerActions.get(id));
    dispatch(paginationActions.resetPage(false));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (conseiller?._id && conseiller?.statut === 'RECRUTE') {
      dispatch(conseillerActions.getStructureByIdConseiller(conseiller?._id));
    }
  }, [conseiller]);

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(conseiller?._id, conseiller));
  };
  const suppressionCandidat = () => {
    dispatch(conseillerActions.suppressionCandidat({ id: conseiller?._id, motif, actionUser: 'admin' }));
  };
  useEffect(() => {
    if (successSuppressionCandidat) {
      history.push('/candidats');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [successSuppressionCandidat]);
  const annulerSuppressionCandidat = () => {
    setConfirmSuppressionCandidat(false);
    if (erreurSuppressionCandidat) {
      dispatch(conseillerActions.get(id));
    }
    setMotif('');
    setConfirmEmailCandidat('');
  };

  const renderStars = palier => {
    switch (palier) {
      case 1:
        return <p>Degré de maîtrise :&nbsp;
          <span style={{ verticalAlign: 'sub' }}>
            <i className="ri-star-fill ri-xl" title="Débutant"></i>
            <i className="ri-star-line ri-xl" title="Débutant"></i>
            <i className="ri-star-line ri-xl" title="Débutant"></i>
          </span>
        </p>;
      case 2:
        return <p>Degré de maîtrise :&nbsp;
          <span style={{ verticalAlign: 'sub' }}>
            <i className="ri-star-fill ri-xl" title="Intermédiaire"></i>
            <i className="ri-star-fill ri-xl" title="Intermédiaire"></i>
            <i className="ri-star-line ri-xl" title="Intermédiaire"></i>
          </span>
        </p>;
      case 3:
        return <p>Degré de maîtrise :&nbsp;
          <span style={{ verticalAlign: 'sub' }}>
            <i className="ri-star-fill ri-xl" title="Avancé"></i>
            <i className="ri-star-fill ri-xl" title="Avancé"></i>
            <i className="ri-star-fill ri-xl" title="Avancé"></i>
          </span>
        </p>;
      default:
        return <p>Degré de maîtrise non communiqué</p>;
    }
  };

  const resendInvitCandidatConseiller = () => {
    window.scrollTo(0, 0);
    dispatch(conseillerActions.resendInvitCandidatConseiller(id));
  };

  return (
    <div className="ConseillerDetails">
      <Link
        style={{ boxShadow: 'none' }}
        to={{
          pathname: location.origin,
          currentPage: location.currentPage
        }}
        className="fr-link fr-fi-arrow-left-line fr-link--icon-left">
        Retour à la liste
      </Link>
      <div>
        {invitEspaceCandidatConseiller?.flashMessage === true &&
          <FlashMessage duration={10000}>
            {(errorSendMail === undefined || errorSendMail === false || successSendMail === true) &&
              <p className="fr-label flashBag">
                L&rsquo;email d&rsquo;invitation à l&rsquo;espace {conseiller?.statut === 'RECRUTE' ? 'COOP' : 'candidat'}
                a bien été envoyé à {conseiller?.prenom}&nbsp;{conseiller?.nom}
                &nbsp;
                <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
              </p>
            }
            {(errorSendMail !== undefined && successSendMail === undefined && errorSendMail !== false) &&
              <p className="fr-label flashBag labelError">
                {errorSendMail}
              </p>
            }
          </FlashMessage>
        }
        <div style={{ textAlign: 'center' }}>
          <Spinner
            type="Oval"
            color="#00BFFF"
            height={80}
            width={80}
            visible={invitEspaceCandidatConseiller?.loadingInvitCandidatConseiller === true}
          />
        </div>
        {erreurSuppressionCandidat &&
          <FlashMessage duration={20000}>
            <p className="fr-label flashBag labelError">
              {erreurSuppressionCandidat}
            </p>
          </FlashMessage>
        }
        <h2>
          <span className="capitalizeFirstLetter">
            {conseiller?.prenom}&nbsp;{conseiller?.nom}</span>
        </h2>
        <div className="spinnerCustom">
          <Spinner
            type="Oval"
            color="#00BFFF"
            height={100}
            width={100}
            visible={downloading === true}
          />
        </div>
        <div className="fr-container fr-container--fluid">
          <div className="fr-grid-row">
            { conseiller?.dateRecrutement?.length > 0 &&
              <div className="fr-col-12">
                <p><b>Date de recrutement prévisionnelle:&nbsp;
                  {conseiller?.dateRecrutement.map((date, idx) =>

                    <span key={idx}>
                      {conseiller?.dateRecrutement?.length > 1 &&
                        <><br />-&nbsp;</>
                      }
                      {dayjs(date).format('DD/MM/YY')}
                      {conseiller?.nomStructures.length > 0 &&
                        <>&nbsp;par {conseiller?.nomStructures[idx]}</>
                      }
                    </span>

                  )}
                </b>
                </p>
              </div>
            }
            <div className="fr-col-4">
              {conseiller?.estRecrute &&
                <>
                  <p>Recruté(e) par&nbsp;:&nbsp; {nomStructure}</p>
                  <p>Espace Coop créé&nbsp;:&nbsp;{conseiller?.mattermost?.id ? 'OUI' : 'NON'}</p>
                  <p>
                    Date d&rsquo;entrée en formation&nbsp;:&nbsp;
                    {conseiller?.datePrisePoste ? dayjs(conseiller?.datePrisePoste).format('DD/MM/YYYY') : 'Non renseignée'}
                  </p>
                  <p>
                    Date de sortie de formation&nbsp;:&nbsp;
                    {conseiller?.dateFinFormation ? dayjs(conseiller?.dateFinFormation).format('DD/MM/YYYY') : 'Non renseignée'}
                  </p>
                  {conseiller?.emailCN?.address ?
                    <p>
                      <b>Courriel CnFS :</b><br />
                      <a href={'mailto:' + conseiller?.emailCN?.address}>{conseiller?.emailCN?.address}</a>
                    </p> : ''}
                </>
              }
              <p>Curriculum vit&aelig; :&nbsp;
                {conseiller?.cv?.file &&
                  <button className="downloadCVBtn" onClick={downloadCV}>
                    Télécharger le CV (du {dayjs(conseiller?.cv?.date).format('DD/MM/YYYY') })
                  </button>
                }
                {!conseiller?.cv?.file &&
                  <>Non renseigné</>
                }
              </p>
              <p>Situation professionnelle : {conseiller?.estEnEmploi ? 'en emploi' : 'sans emploi'}</p>
              <p>Diplômé : {conseiller?.estDiplomeMedNum ? 'Oui' : 'Non'}</p>
              {conseiller?.estDiplomeMedNum &&
                <p>Nom du diplôme : {conseiller?.nomDiplomeMedNum}</p>
              }
              <p>A de l&rsquo;expérience dans la médiation numérique : {conseiller?.aUneExperienceMedNum ? 'Oui' : 'Non'}</p>
              <p>Code Postal : {conseiller?.codePostal}</p>
              <p>
                Lieu de résidence :&nbsp;
                {conseiller?.nomCommune === '' || conseiller?.nomCommune === '.' ?
                  'Non renseigné' :
                  conseiller?.nomCommune}
              </p>
              <p>Mobilité géographique : {conseiller?.distanceMax === 2000 ? 'France entière' : `${conseiller?.distanceMax} Km`}</p>
              <p>Date de démarrage possible : {dayjs(conseiller?.dateDisponibilite).format('DD/MM/YYYY')}</p>
              <p><strong>Courriel : <a href={'mailto:' + conseiller?.email}>{conseiller?.email}</a></strong></p>
              <p><strong>Téléphone : {conseiller?.telephone ? conseiller?.telephone : 'pas de numéro de téléphone'}</strong></p>
              {role === 'admin' && <>
                {conseiller?.statut !== 'RECRUTE' &&
                  <p>Poss&egrave;de un compte candidat&nbsp;: {conseiller?.possedeCompteCandidat ? 'Oui' : 'Non'}</p>
                }
                <button
                  className="fr-btn"
                  style={{ 'padding': '1rem 1.5rem' }}
                  onClick={resendInvitCandidatConseiller}>
                  Renvoyer l&rsquo;email d&rsquo;invitation
                </button><br /><br />
                <div>
                  <button
                    className="bouton-delete"
                    onClick={() => {
                      setConfirmSuppressionCandidat(true);
                      setAutreMotif(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>
                    Supprimer la candidature
                  </button>
                </div>
              </>
              }
            </div>
            {confirmSuppressionCandidat &&
               <div className="fr-col-6 fr-mt-1w" style={{ position: 'absolute', marginLeft: '10rem' }}>
                 <div className="fr-grid-row fr-grid-row--center">
                   <div className="fr-col-12 fr-col-md-12 fr-col-lg-12">
                     <div className="fr-modal__body">
                       <div className="fr-modal__header">
                         <button className="fr-link--close fr-link" onClick={annulerSuppressionCandidat}>Fermer</button>
                       </div>
                       <div className="fr-modal__content">
                         <h1 id="fr-modal-2-title" className="fr-modal__title">
                           <span className="fr-fi-arrow-right-line fr-fi--lg"></span>
                                    Supprimer la candidature définitivement
                         </h1>
                         <p>&Ecirc;tes-vous certain(e) de vouloir supprimer ce candidat ?</p>
                         <p><strong>Cette action supprimera définitivement toutes ses données.</strong></p>
                         <div>
                           <label>
                                       Confirmez l&apos;adresse e-mail en le saisissant ici&nbsp;:
                           </label>
                           <input className={confirmEmailCandidat === conseiller?.email ?
                             'fr-input fr-input--valid fr-col-6' : 'fr-input fr-input--error fr-col-6'}
                           aria-describedby={confirmEmailCandidat === conseiller?.email ? 'text-input-valid-desc-valid' : 'text-input-error-desc-error'}
                           type="text"
                           id={confirmEmailCandidat === conseiller?.email ? 'text-input-valid' : 'text-input-error'}
                           name={confirmEmailCandidat === conseiller?.email ? 'text-input-valid' : 'text-input-error'}
                           onChange={e => setConfirmEmailCandidat(e.target.value)}
                           />
                           <p
                             id={confirmEmailCandidat === conseiller?.email ? 'text-input-valid-desc-valid' : 'text-input-error-desc-error'}
                             className={confirmEmailCandidat === conseiller?.email ? 'fr-valid-text' : 'fr-error-text'}>
                             {confirmEmailCandidat === conseiller?.email ? 'Adresse e-mail confirmé' : 'L\'adresse e-mail ne correspond pas'}
                           </p>
                         </div>
                         <div className="fr-form-group">
                           <fieldset className="fr-fieldset">
                             <legend className="fr-fieldset__legend fr-text--regular" id="radio-legend">
                                         Le motif de la suppression&nbsp;:
                             </legend>
                             <div className="fr-fieldset__content">
                               <div className="fr-radio-group">
                                 <input type="radio" name="radio" id="rgpd"onClick={() => {
                                   setMotif('demande RGPD');
                                   setAutreMotif(false);
                                 }}/>
                                 <label className="fr-label" htmlFor="rgpd">Demande RGPD
                                 </label>
                               </div>
                               <div className="fr-radio-group">
                                 <input type="radio" name="radio" id="non_interesse_dispositif" onClick={() => {
                                   setMotif('plus intéressé par le dispositif');
                                   setAutreMotif(false);
                                 }}/>
                                 <label className="fr-label" htmlFor="non_interesse_dispositif">
                                              Plus intéressé par le dispositif
                                 </label>
                               </div>
                               <div className="fr-radio-group">
                                 <input type="radio" name="radio" id="doublon" onClick={() => {
                                   setMotif('doublon');
                                   setAutreMotif(false);
                                 }}/>
                                 <label className="fr-label" htmlFor="doublon">
                                              Doublon
                                 </label>
                               </div>
                               <div className="fr-radio-group">
                                 <input type="radio" name="radio" id="autre" onClick={() => setAutreMotif(true)}/>
                                 <label className="fr-label" htmlFor="autre">
                                              Autre
                                 </label>
                                 {autreMotif &&
                                 <input type="text" className="fr-input fr-col-6" id="text-input-text" onChange={e => setMotif(e.target.value)}/> }
                               </div>
                             </div>
                           </fieldset>
                         </div>
                       </div>
                       <div style={{ paddingBottom: '2rem' }}>
                         <button onClick={annulerSuppressionCandidat} className="fr-btn">Annuler</button>
                         {confirmEmailCandidat === conseiller?.email && motif !== '' ?
                           <button
                             style={{ float: 'right', backgroundColor: '#E10600' }}
                             className="fr-btn" onClick={suppressionCandidat}>
                                  Oui, Supprimer définitivement
                           </button> :
                           <button
                             style={{ float: 'right', backgroundColor: '#E7E7E7', color: '#E10600' }}
                             className="fr-btn" disabled>
                                Oui, Supprimer définitivement
                           </button>
                         }
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
            }
            { conseiller?.pix?.partage &&
              <div className="fr-col-4 fr-ml-6w fr-mt-1w">
                <span className="capitalizeFirstLetter"><strong>Résultats Pix</strong></span>
                {renderStars(conseiller?.pix?.palier)}
                <p>
                  { conseiller?.pix?.competence1 &&
                    <img src="/logos/pix-utilisation.png"
                      alt="Utilisation du numérique"
                      title="Utilisation du numérique dans la vie professionnelle"
                      className="fr-mr-2w"
                    />
                  }
                  { conseiller?.pix?.competence2 &&
                    <img src="/logos/pix-ressources.png"
                      alt="Production de ressources"
                      title="Production de ressources"
                      className="fr-mr-2w"
                    />
                  }
                  { conseiller?.pix?.competence3 &&
                  <img src="/logos/pix-citoyen.png"
                    alt="Compétences numériques en lien avec la e-citoyenneté"
                    title="Compétences numériques en lien avec la e-citoyenneté"
                    className="fr-mr-2w"
                  />
                  }
                </p>
                <p>
                  <a href="https://cdn.conseiller-numerique.gouv.fr/Conseillernum_Lire%20les%20r%C3%A9sultats%20du%20diagnostic%20des%20candidats_V2-2.pdf"
                    className="fr-link"
                    target="blank"
                    title="Télécharger le document d&rsquo;analyse des résultats Pix">
                    Télécharger l&rsquo;analyse des résultats Pix
                  </a>
                  <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
                    Document d&rsquo;aide pour lire les résultats du dianostic des candidats
                  </span>
                </p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>

  );
}

ConseillerDetails.propTypes = {
  location: PropTypes.object
};

export default ConseillerDetails;
