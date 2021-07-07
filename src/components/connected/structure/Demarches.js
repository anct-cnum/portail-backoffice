import React from 'react';

function Demarches() {

  return (
    <div className="demarches">
      <div className="rf-container-fluid">
        <div className="rf-grid-row">
          <div>
            Vous retrouverez ci-dessous le lien vous permettant de déposer votre dossier de demande de subvention via l&rsquo;outil Démarches Simplifiées.
            <br/>
            Avant de déposer votre dossier de demande de subvention, vous devez d&rsquo;abord&nbsp;:
            <ul>
              <li>
                Sélectionner la date d&rsquo;embauche du ou des candidat(s) retenu(s).
              </li>
              <li>
                Arrêter votre choix sur un ou plusieurs Conseiller(s) numérique(s) France services
                en cliquant sur le bouton &quot;Valider cette candidature&quot;.
              </li>
            </ul>
          </div>
        </div>
        <div className="rf-grid-row">
          <p>Structures publiques :
            <br/>
            <a href="https://www.demarches-simplifiees.fr/commencer/cnfs-sa-structures-publiques"
              title="cnfs-sa-structures-publiques"
              className="rf-link"
              target="blank">https://www.demarches-simplifiees.fr/commencer/cnfs-sa-structures-publiques</a>
          </p>
        </div>
        <div className="rf-grid-row">
          <p>Entreprises :
            <br/>
            <a href="https://www.demarches-simplifiees.fr/commencer/cnfs-sa-entreprises"
              title="cnfs-sa-entreprises"
              className="rf-link"
              target="blank">https://www.demarches-simplifiees.fr/commencer/cnfs-sa-entreprises</a>
          </p>
        </div>
        <div className="rf-grid-row">
          <p>Associations :
            <br/>
            <a href="https://www.demarches-simplifiees.fr/commencer/cnfs-associations"
              title="cnfs-sa-associations"
              className="rf-link"
              target="blank">https://www.demarches-simplifiees.fr/commencer/cnfs-associations</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Demarches;
