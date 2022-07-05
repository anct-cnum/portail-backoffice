import React from 'react';
import PropTypes from 'prop-types';

function popinNouvelleRupture({ statut }) {

  //Gestion of modal closure
  let closeModal = document.getElementById('modal-nouvelle-rupture-close');
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      let modal = document.getElementById('fr-modal-nouvelle-rupture');
      modal.classList.remove('modalOpened');
    });
  }

  return (
    <div>
      <dialog aria-labelledby="fr-modal-title-modal-1" role="dialog" id="fr-modal-nouvelle-rupture"
        className={`fr-modal ${statut === 'nouvelle_rupture' ? 'modalOpened' : ''}`}>
        <div className="fr-container--fluid fr-container-md">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-6">
              <div className="fr-modal__body">
                <div className="fr-modal__header">
                  <button id="modal-nouvelle-rupture-close"
                    className="fr-link--close fr-link"
                    title="Fermer la fenêtre modale"
                    aria-controls="fr-modal-1"
                    target="_self">
                      Fermer
                  </button>
                </div>
                <div className="fr-modal__content">
                  <h1 id="fr-modal-title-modal-1" className="fr-modal__title">
                    Important
                  </h1>
                  <p>
                    Votre signalement de rupture de contrat <strong>a bien été pris en compte</strong> par nos équipes.
                  </p>
                  <p>
                    Afin d&rsquo;être en capacité de finaliser celui-ci, et comme indiqué dans notre FAQ, nous vous remercions de bien vouloir nous transmettre,
                    via votre dossier sur la plateforme Démarches Simplifiées,&nbsp;
                    <strong>tous les documents relatifs à la fin de contrat</strong> de votre Conseiller numérique France Services au sein de votre structure.
                  </p>
                  <p>
                    Une fois enregistrés, <strong>un email vous confirmera que vous aurez la possibilité de valider une nouvelle
                    candidature</strong> sur la plateforme.
                  </p>
                  <p>
                    <strong>Si vous ne souhaitez pas procéder à un nouveau recrutement</strong>, nous vous remercions de bien vouloir nous en informer
                    à l&rsquo;adresse suivante : <a href="mailto:conseiller-numerique@anct.gouv.fr"
                      title="conseiller-numerique@anct.gouv.fr">conseiller-numerique@anct.gouv.fr</a>, ainsi qu&rsquo;à l&rsquo;indiquer à votre
                    Préfecture de département.
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

popinNouvelleRupture.propTypes = {
  statut: PropTypes.string
};

export default popinNouvelleRupture;
