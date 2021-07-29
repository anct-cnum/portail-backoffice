import React from 'react';
import PropTypes from 'prop-types';

function popinRecrutee({ statut }) {

  //Gestion of modal closure
  let closeModal = document.getElementById('modal-recrutee-close');
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      let modal = document.getElementById('rf-modal-recrutee');
      modal.classList.remove('modalOpened');
    });
  }

  return (
    <div>
      <dialog aria-labelledby="rf-modal-title-modal-1" role="dialog" id="rf-modal-recrutee"
        className={`rf-modal ${statut === 'recrutee' ? 'modalOpened' : ''}`}>
        <div className="rf-container--fluid rf-container-md">
          <div className="rf-grid-row rf-grid-row--center">
            <div className="rf-col-12 rf-col-md-6">
              <div className="rf-modal__body">
                <div className="rf-modal__header">
                  <button id="modal-recrutee-close"
                    className="rf-link--close rf-link"
                    title="Fermer la fenêtre modale"
                    aria-controls="rf-modal-1"
                    target="_self">
                      Fermer
                  </button>
                </div>
                <div className="rf-modal__content">
                  <h1 id="rf-modal-title-modal-1" className="rf-modal__title">
                    Important
                  </h1>
                  <p>
                    Vous avez actionné le bouton &laquo;&nbsp;Valider cette candidature&nbsp;&raquo;
                    <br/>
                    Votre choix est donc arrêté sur un ou plusieurs Conseillers numériques France Services.
                    Vous allez donc passer à l&rsquo;étape de conventionnement.
                  </p>
                  <p>
                    <strong>Merci de bien vouloir :</strong>
                    <br/>
                    Compléter les différents champs indispensables à l&rsquo;étude de votre demande de subvention en cliquant sur le lien correspondant :
                    <br/><br/>
                    NB : Si vous avez validé plusieurs candidatures, merci de ne réaliser qu’une seule demande.
                    <br /><br />
                    <strong>Structures publiques</strong> :&nbsp;
                    <a href="https://www.demarches-simplifiees.fr/commencer/cnfs-sa-structures-publiques"
                      target="blank">https://www.demarches-simplifiees.fr/commencer/cnfs-sa-structures-publiques</a>
                    <br/>
                    <strong>Entreprises</strong> :&nbsp;
                    <a href="https://www.demarches-simplifiees.fr/commencer/cnfs-sa-entreprises"
                      target="blank">https://www.demarches-simplifiees.fr/commencer/cnfs-sa-entreprises</a>
                    <br/>
                    <strong>Associations</strong> :&nbsp;
                    <a href="https://www.demarches-simplifiees.fr/commencer/cnfs-associations"
                      target="blank">https://www.demarches-simplifiees.fr/commencer/cnfs-associations</a>
                  </p>
                  <p>
                    <strong>Important : l&rsquo;embauche reste conditionnée à la conformité de votre dossier de demande de subvention.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );

}

popinRecrutee.propTypes = {
  statut: PropTypes.string
};

export default popinRecrutee;
