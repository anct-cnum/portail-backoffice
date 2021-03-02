import React from 'react';
import PropTypes from 'prop-types';

function PopIn({ statut }) {

  //Gestion of modal closure
  let closeModal = document.getElementById('modal-close');
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      let modal = document.getElementById('rf-modal');
      modal.classList.remove('modalOpened');
    });
  }

  return (
    <div>
      <dialog aria-labelledby="rf-modal-title-modal-1" role="dialog" id="rf-modal" className={`rf-modal ${statut === 'interessee' ? 'modalOpened' : ''}`}>
        <div className="rf-container--fluid rf-container-md">
          <div className="rf-grid-row rf-grid-row--center">
            <div className="rf-col-12 rf-col-md-6">
              <div className="rf-modal__body">
                <div className="rf-modal__header">
                  <button id="modal-close"
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
                    Lorsque vous aurez conduit le ou les entretien(s) avec le ou les candidat(s) et choisi votre ou vos Conseiller(s) Numérique(s) France Service, merci de nous l&rsquo;indiquer en cliquant sur le bouton &laquo; Recruter &raquo;.
                    <br/><br/>
                    Cette action est indispensable pour la suite de votre demande de subvention. Elle conditionne la réception du lien vous dirigeant vers la plateforme Démarches Simplifiées.
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

PopIn.propTypes = {
  statut: PropTypes.string
};

export default PopIn;
