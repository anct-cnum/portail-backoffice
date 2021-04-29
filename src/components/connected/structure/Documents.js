import React from 'react';
import { useSelector } from 'react-redux';

function Documents() {

  const structure = useSelector(state => state.structure?.structure);

  return (
    <div className="documents">
      <div className="rf-container-fluid">
        <div className="rf-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Guide%20de%20l%27employeur%20-%20Public%20-%20V3.pdf"
              className="rf-link" target="blank" title="Télécharger le guide de l'employeur">
                        Télécharger le guide de l&rsquo;employeur (pdf)
            </a>
            <span className="rf-footer__bottom-link" style={{ display: 'block' }}>
              Détails du dispositif pour la structure accueillante
            </span>
          </p>
        </div>
        <div className="rf-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Fiche%20de%20poste%20type.pdf"
              className="rf-link" target="blank" title="Télécharger la fiche de poste type">
                        Télécharger la fiche de poste type (pdf)
            </a>
            <span className="rf-footer__bottom-link" style={{ display: 'block' }}>
              Fiche avec détails de l&rsquo;offre, des missions et des tâches
            </span>
          </p>
        </div>
        <div className="rf-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Guide%20d%27entretien.pdf"
              className="rf-link" target="blank" title="Télécharger le guide d'entretien">
                        Télécharger le guide d&rsquo;entretien (pdf)
            </a>
            <span className="rf-footer__bottom-link" style={{ display: 'block' }}>
              Préconisations pour l&rsquo;entretien du candidat
            </span>
          </p>
        </div>
        <div className="rf-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Mod%C3%A8le%20de%20d%C3%A9lib%C3%A9ration%20contrat%20de%20projet.pdf"
              className="rf-link" target="blank" title="Télécharger le modèle de délibération">
                        Télécharger le modèle de délibération (pdf)
            </a>
            <span className="rf-footer__bottom-link" style={{ display: 'block' }}>
              Document pour la création d&rsquo;un poste non permanent
            </span>
          </p>
        </div>
        <div className="rf-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Modele_de_convention.pdf"
              className="rf-link" target="blank" title="Télécharger la convention de subvention">
                        Télécharger la convention de subvention (pdf)
            </a>
            <span className="rf-footer__bottom-link" style={{ display: 'block' }}>
              Modèle de convention de subvention
            </span>
          </p>
        </div>
        { structure?.type !== 'PRIVATE' &&
        <div className="rf-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Contrat%20de%20projet%20type.pdf"
              className="rf-link" target="blank" title="Télécharger le contrat de projet type">
                        Télécharger le contrat de projet type (pdf)
            </a>
            <span className="rf-footer__bottom-link" style={{ display: 'block' }}>
              Contrat de travail à durée déterminée
            </span>
          </p>
        </div>
        }
        { structure?.type === 'PRIVATE' &&
        <div className="rf-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/CDD_type_structures_privees.pdf"
              className="rf-link" target="blank" title="Télécharger le CDD type structures privées">
                        Télécharger le contrat de projet type (pdf)
            </a>
            <span className="rf-footer__bottom-link" style={{ display: 'block' }}>
              Contrat de travail à durée déterminée pour les structures privées
            </span>
          </p>
        </div>
        }
        { structure?.type !== 'PRIVATE' &&
        <div className="rf-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/AMI_Conseiller-Numerique.pdf"
              className="rf-link" target="blank" title="Télécharger l'Appel à Manifestation d'Intérêt Publique">
                        Télécharger l&rsquo;Appel à Manifestation d&rsquo;Intérêt Publique (pdf)
            </a>
            <span className="rf-footer__bottom-link" style={{ display: 'block' }}>
              Appel à manifestation d’intérêt pour les collectivités territoriales et leurs groupements
            </span>
          </p>
        </div>
        }
        { structure?.type === 'PRIVATE' &&
        <div className="rf-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/AMI_Prive.pdf"
              className="rf-link" target="blank" title="Télécharger l'Appel à Manifestation d'Intérêt Privé">
                        Télécharger l&rsquo;Appel à Manifestation d&rsquo;Intérêt Privé (pdf)
            </a>
            <span className="rf-footer__bottom-link" style={{ display: 'block' }}>
              Appel à manifestation d’intérêt pour les acteurs à statut privé
            </span>
          </p>
        </div>
        }
        <div className="rf-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/les-conseils-pour-bien-demarrer.pdf"
              className="rf-link" target="blank" title="Télécharger le kit &laquo;Bien démarrer ma mission&raquo;">
                        Télécharger le kit &laquo;Bien démarrer ma mission&raquo; (pdf)
            </a>
            <span className="rf-footer__bottom-link" style={{ display: 'block' }}>
            Ce document a pour objet de faciliter l’entrée en poste des Conseillers numériques France Services, <br className="br-lg"/>
            et contient de nombreuses informations en lien avec leur début d’activité : outils, réseaux, parcours, etc.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Documents;
