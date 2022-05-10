import React from 'react';

function Aide() {

  return (
    <div className="aide">
      <div className="fr-container fr-container--fluid">
        <div className="fr-grid-row">
          <div className="fr-col-8">
            <h2>Aide</h2>
            <p>Pour toute question relative <b>aux démarches à effectuer</b>, vous pouvez vous référer à notre guide d&rsquo;accompagnement
              &laquo;&nbsp;pas-à-pas&nbsp;&raquo;, disponible dans l&rsquo;onglet &laquo;&nbsp;Mes documents&nbsp;&raquo;.</p>
            <p>Pour toute question relative <b>à l&rsquo;instruction de votre dossier de subvention</b>, nous vous invitons à utiliser prioritairement
              la messagerie accessible via la plateforme&nbsp;
            <a href="https://www.demarches-simplifiees.fr/" rel="noreferrer" target="blank" title="www.demarches-simplifiees.fr">
              demarches-simplifiees.fr
            </a>.
              Nous vous rappelons que les demandes sont instruites à partir de la date de recrutement et d&rsquo;entrée en formation de votre conseiller,
              et non pas selon la date de dépôt de votre dossier.
            </p>
            <p>Pour toute question relative notamment <b>à l&rsquo;accueil de votre/vos conseiller(s) numérique(s)</b>,&nbsp;
               nous vous invitons à consulter les guides&nbsp;
               employeur public ou privé et le guide &laquo;&nbsp;Bien démarrer ma mission&nbsp;&raquo;,
               disponibles dans l&rsquo;onglet &laquo;&nbsp;Mes documents&nbsp;&raquo;.
            </p>
            <p>Si toutefois vous n&rsquo;avez pas trouvé votre réponse, nous vous invitons à consulter en priorité la Foire aux
              Questions accessible sur le site&nbsp;
            <a href="https://aide.conseiller-numerique.gouv.fr/fr/" rel="noreferrer" target="blank" title="aide.conseiller-numerique.gouv.fr">
              aide.conseiller-numerique.gouv.fr
            </a>.
            </p>
            <p>En dernier lieu, vous pouvez &eacute;crire &agrave; l&rsquo;adresse suivante :&nbsp;
              <a href="mailto:conseiller-numerique@anct.gouv.fr" title="conseiller-numerique@anct.gouv.fr">
              conseiller-numerique@anct.gouv.fr
              </a>, ou nous appeler &agrave; travers la permanence t&eacute;l&eacute;phonique au<br/> <b>01 58 50 89 42</b> joignable chaque lundi
              et jeudi matin de 9h30 à 12h00.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aide;
