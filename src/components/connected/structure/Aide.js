import React from 'react';

function Aide() {

  return (
    <div className="aide">
      <div className="rf-container-fluid">
        <div className="rf-grid-row">
          <div className="rf-col-8">
            <h2>Aide</h2>
            <p>Pour toute question relative <b>aux démarches à effectuer</b>, vous pouvez vous référer à notre guide d’accompagnement « pas-à-pas »,
              disponible dans l’onglet « Mes documents » ; si vous rencontrez des difficultés techniques d’accès à votre espace structure,
              vous pouvez écrire à l’adresse suivante :&nbsp;
            <a href="mailto:support-cnfs@anct.gouv.fr">
              support-cnfs@anct.gouv.fr
            </a>.
            </p>
            <p>Pour toute question relative <b>à l’instruction de votre dossier de subvention</b>, nous vous invitons à utiliser prioritairement
              la messagerie accessible via la plateforme&nbsp;
            <a href="https://www.demarches-simplifiees.fr/" rel="noreferrer" target="_blank">
              demarches-simplifiees.fr
            </a>.
              Nous vous rappelons que les demandes sont instruites à partir de la date de recrutement et d’entrée en formation de votre Conseiller
              et non pas par ordre de dépôt de votre dossier.
            </p>
            <p>Pour toute question relative notamment <b>à l’accueil de votre/vos Conseiller(s)</b>, nous vous invitons à consulter les guides
               employeur public ou privé et le guide « Bien démarrer ma mission ».</p>
            <p>Si toutefois vous n&rsquo;avez pas trouvez votre réponse, nous vous invitons à consulter en priorité la Foire aux
              Questions accessible sur le site&nbsp;
            <a href="https://aide.conseiller-numerique.gouv.fr/fr/" rel="noreferrer" target="_blank">
              aide.conseiller-numerique.gouv.fr
            </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aide;
