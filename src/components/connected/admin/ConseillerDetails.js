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
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const downloading = useSelector(state => state.conseiller?.downloading);
  const nomStructure = useSelector(state => state.conseiller?.nomStructure);
  const successDeleteCandidat = useSelector(state => state.conseiller?.conseillerSuccessDelete);
  const errorDeleteCandidat = useSelector(state => state.conseiller?.conseillerErrorDelete);
  const [confirmDeleteCandidat, setConfirmDeleteCandidat] = useState(false);

  let { id } = useParams();

  if (confirmDeleteCandidat === true) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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
  const deleteCandidat = () => {
    dispatch(conseillerActions.deleteCandidat(conseiller?._id));
  };
  useEffect(() => {
    if (successDeleteCandidat) {
      history.push('/candidats');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [successDeleteCandidat]);
  const annulerDeleteCandidat = () => {
    setConfirmDeleteCandidat(false);
    if (errorDeleteCandidat) {
      dispatch(conseillerActions.get(id));
    }
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

  return (
    <div className="ConseillerDetails">
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
        { errorDeleteCandidat &&
            <FlashMessage duration={10000}>
              <p className="rf-label flashBag labelError">
                {errorDeleteCandidat}
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
        <div className="rf-container-fluid">
          <div className="rf-grid-row">
            { conseiller?.dateRecrutement?.length > 0 &&
              <div className="rf-col-12">
                <p><b>Date de recrutement prévisionnelle:&nbsp;
                  {conseiller?.dateRecrutement.map((date, idx) =>

                    <span key={idx}>
                      {conseiller?.dateRecrutement?.length > 1 &&
                        <><br/>-&nbsp;</>
                      }
                      {dayjs(date).format('DD/MM/YY')}
                      { conseiller?.nomStructures.length > 0 &&
                        <>&nbsp;par {conseiller?.nomStructures[idx]}</>
                      }
                    </span>

                  )}
                </b>
                </p>
              </div>
            }
            <div className="rf-col-4">
              {conseiller?.estRecrute &&
                <>
                  <p>Recruté(e) par&nbsp;:&nbsp; {nomStructure}</p>
                  <p>Espace Coop créé&nbsp;:&nbsp;{conseiller?.emailCN ? 'OUI' : 'NON'}</p>
                  <p>Date d’entrée en formation&nbsp;:&nbsp;{dayjs(conseiller?.datePrisePoste).format('DD/MM/YYYY')}</p>
                  <p>Date de sortie de formation&nbsp;:&nbsp;{dayjs(conseiller?.dateFinFormation).format('DD/MM/YYYY')}</p>
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
                { conseiller?.nomCommune === '' || conseiller?.nomCommune === '.' ?
                  'Non renseigné' :
                  conseiller?.nomCommune }
              </p>
              <p>Mobilité géographique : { conseiller?.distanceMax === 2000 ? 'France entière' : `${conseiller?.distanceMax} Km` }</p>
              <p>Date de démarrage possible : { dayjs(conseiller?.dateDisponibilite).format('DD/MM/YYYY') }</p>
              <p><strong>Courriel : <a href={'mailto:' + conseiller?.email}>{conseiller?.email}</a></strong></p>
              <p><strong>Téléphone : {conseiller?.telephone ? conseiller?.telephone : 'pas de numéro de téléphone' }</strong></p>
              <br/>
              <br/>
              <div>
                <button
                  style={{ backgroundColor: '#E7E7E7', padding: '1rem 1.5rem', fontSize: '1rem', cursor: 'pointer', border: '#E7E7E7' }}
                  onClick={() => setConfirmDeleteCandidat(true)}>
                Supprimer le profil et ses données
                </button>
              </div>
            </div>
            { conseiller?.pix?.partage &&
              <div className="rf-col-4 rf-ml-6w rf-mt-1w">
                <span className="capitalizeFirstLetter"><strong>Résultats Pix</strong></span>
                {renderStars(conseiller?.pix?.palier)}
                <p>
                  { conseiller?.pix?.competence1 &&
                    <img src="/logos/pix-utilisation.png"
                      alt="Utilisation du numérique"
                      title="Utilisation du numérique dans la vie professionnelle"
                      className="rf-mr-2w"
                    />
                  }
                  { conseiller?.pix?.competence2 &&
                    <img src="/logos/pix-ressources.png"
                      alt="Production de ressources"
                      title="Production de ressources"
                      className="rf-mr-2w"
                    />
                  }
                  { conseiller?.pix?.competence3 &&
                  <img src="/logos/pix-citoyen.png"
                    alt="Compétences numériques en lien avec la e-citoyenneté"
                    title="Compétences numériques en lien avec la e-citoyenneté"
                    className="rf-mr-2w"
                  />
                  }
                </p>
                <p>
                  <a href="https://cdn.conseiller-numerique.gouv.fr/Conseillernum_Lire%20les%20r%C3%A9sultats%20du%20diagnostic%20des%20candidats_V2-2.pdf"
                    className="rf-link"
                    target="blank"
                    title="Télécharger le document d&rsquo;analyse des résultats Pix">
                    Télécharger l&rsquo;analyse des résultats Pix
                  </a>
                  <span className="rf-footer__bottom-link" style={{ display: 'block' }}>
                    Document d&rsquo;aide pour lire les résultats du dianostic des candidats
                  </span>
                </p>
              </div>
            }
            {confirmDeleteCandidat &&
               <div className="rf-col-6 rf-mt-1w" style={{ position: 'absolute', marginLeft: '10rem' }}>
                 <div className="rf-grid-row rf-grid-row--center">
                   <div className="rf-col-12 rf-col-md-12 rf-col-lg-12">
                     <div className="rf-modal__body">
                       <div className="rf-modal__header">
                         <button className="rf-link--close rf-link" onClick={() => setConfirmDeleteCandidat(false)}>Fermer</button>
                       </div>
                       <div className="rf-modal__content">
                         <h1 id="rf-modal-2-title" className="rf-modal__title">
                           <span className="rf-fi-arrow-right-line rf-fi--lg"></span>
                         Supprimer totalement {conseiller?.prenom}&nbsp;{conseiller?.nom}
                         </h1>
                         <p>Êtes vous certain(e) de vouloir supprimer ce profil de candidat ?</p>
                         <p><strong>Cette action supprimera définitivement toutes ses données.</strong></p>
                       </div>
                       <div style={{ paddingBottom: '2rem' }}>
                         <button onClick={annulerDeleteCandidat} className="rf-btn">Annuler</button>
                         <button style={{ float: 'right', backgroundColor: '#E10600' }} className="rf-btn" onClick={deleteCandidat}>Oui, je supprime</button>
                       </div>
                     </div>
                   </div>
                 </div>
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
