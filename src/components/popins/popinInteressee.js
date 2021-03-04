import React from 'react';
import PropTypes from 'prop-types';

function popinInteresse({ statut }) {

  //Gestion of modal closure
  let closeModal = document.getElementById('modal-interessee-close');
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      let modal = document.getElementById('rf-modal-interessee');
      modal.classList.remove('modalOpened');
    });
  }

  return (
    <div>
      <dialog aria-labelledby="rf-modal-title-modal-1" role="dialog" id="rf-modal-interessee"
        className={`rf-modal ${statut === 'interessee' ? 'modalOpened' : ''}`}>
        <div className="rf-container--fluid rf-container-md">
          <div className="rf-grid-row rf-grid-row--center">
            <div className="rf-col-12 rf-col-md-6">
              <div className="rf-modal__body">
                <div className="rf-modal__header">
                  <button id="modal-interessee-close"
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
                    Lorsque vous aurez conduit le ou les entretien(s) avec le ou les candidat(s) et choisi votre ou vos Conseiller(s) Numérique(s) France Services, merci de nous l&rsquo;indiquer en cliquant sur le bouton &laquo;&nbsp;Valider cette candidature&nbsp;&raquo;.
                    <br/><br/>
                    Cette action est indispensable pour la suite de votre demande de subvention. Elle conditionne la réception du lien vous dirigeant vers la plateforme Démarches Simplifiées.
                  </p>
                  <br/>
                  <p>
                    Rappel des étapes
                  </p>
                  <div>
                    <ul>
                      <li>Inscription sur la plateforme <a href="http://conseiller-numerique.gouv.fr/" target="blank">conseiller-numerique.gouv.fr</a></li>
                      <li>Concertation territoriale</li>
                      <li>&Eacute;tude des candidatures</li>
                      <li>Conduite des entretiens de recrutement <span style={{ color: '#B60000' }}>(Vous êtes ici)</span></li>
                      <li>Demande de subvention</li>
                      <li>Signature du contrat</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );

}

popinInteresse.propTypes = {
  statut: PropTypes.string
};

export default popinInteresse;
