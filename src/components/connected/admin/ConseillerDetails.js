import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../../actions';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

function ConseillerDetails() {

  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller);
  let { id } = useParams();

  useEffect(() => {
    dispatch(conseillerActions.get(id));
  }, []);

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
      <Link style={{ boxShadow: 'none' }} to="/conseillers" className="rf-link rf-fi-arrow-left-line rf-link--icon-left">
        Retour à la liste
      </Link>
      <div>
        <h2>
          <span className="capitalizeFirstLetter">
            {conseiller?.conseiller?.prenom}&nbsp;{conseiller?.conseiller?.nom}</span>
        </h2>
        <div className="rf-container-fluid">
          <div className="rf-grid-row">
            <div className="rf-col-4">
              <p>Situation professionnelle : {conseiller?.conseiller?.estEnEmploi ? 'en emploi' : 'sans emploi'}</p>
              <p>Diplômé : {conseiller?.conseiller?.estDiplomeMedNum ? 'Oui' : 'Non'}</p>
              {conseiller?.conseiller?.estDiplomeMedNum &&
                  <p>Nom du diplôme : {conseiller?.conseiller?.nomDiplomeMedNum}</p>
              }
              <p>A de l&rsquo;expérience dans la médiation numérique : {conseiller?.conseiller?.aUneExperienceMedNum ? 'Oui' : 'Non'}</p>
              <p>Lieu de résidence : {conseiller?.conseiller?.nomCommune}</p>
              <p>Date de démarrage possible : { dayjs(conseiller?.conseiller?.dateDisponibilite).format('DD/MM/YYYY') }</p>
              <p><strong>Courriel : <a href={'mailto:' + conseiller?.conseiller?.email}>{conseiller?.conseiller?.email}</a></strong></p>
              <p><strong>Téléphone : {conseiller?.conseiller?.telephone ? conseiller?.conseiller?.telephone : 'pas de numéro de téléphone' }</strong></p>
            </div>
            { conseiller?.conseiller?.pix?.partage &&
              <div className="rf-col-4 rf-ml-6w rf-mt-1w">
                <span className="capitalizeFirstLetter"><strong>Résultats Pix</strong></span>
                {renderStars(conseiller?.conseiller?.pix?.palier)}
                <p>
                  { conseiller?.conseiller?.pix?.competence1 &&
                    <img src="/logos/pix-utilisation.png"
                      alt="Utilisation du numérique"
                      title="Utilisation du numérique dans la vie professionnelle"
                      className="rf-mr-2w"
                    />
                  }
                  { conseiller?.conseiller?.pix?.competence2 &&
                    <img src="/logos/pix-ressources.png"
                      alt="Production de ressources"
                      title="Production de ressources"
                      className="rf-mr-2w"
                    />
                  }
                  { conseiller?.conseiller?.pix?.competence3 &&
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
