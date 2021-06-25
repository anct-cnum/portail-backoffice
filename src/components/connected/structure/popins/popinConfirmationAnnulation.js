import React from 'react';
import PropTypes from 'prop-types';

function popinConfirmationAnnulation({ updateStatut, updateDateRecrutement, setDateValidee, toggleModal }) {

  return (
    <dialog aria-labelledby="rf-modal-title-modal-1" role="dialog" id="rf-modal-annuler"
      className="rf-modal">
      <div className="rf-container--fluid rf-container-md">
        <div className="rf-grid-row rf-grid-row--center">
          <div className="rf-col-12 rf-col-md-6">
            <div className="rf-modal__body centrerTexte">
              <div className="rf-modal__header">
                <button id="modal-annuler-close" className="rf-link--close rf-link" title="Fermer la fenêtre modale"
                  aria-controls="rf-modal-1" target="_self" onClick={() => {
                    toggleModal(false);
                  }}>
                  Fermer
                </button>
              </div>
              <div className="rf-modal__content important">
                <p>
                  <strong>
                    Important : Vous êtes sur le point d&rsquo;annuler votre demande de recrutement pour ce candidat.
                  </strong>
                </p>
                <p>
                  <strong>
                    Êtes-vous sûr de vouloir réaliser cette action ?
                  </strong>
                </p>
                <button onClick={() => {
                  updateStatut('interessee');
                  updateDateRecrutement(null);
                  setDateValidee(null);
                  toggleModal(false);
                }}
                className="rf-btn rf-btn--secondary rf-fi-close-circle-line rf-btn--icon-left"
                title="Annuler le recrutement">
                Je valide l&rsquo;annulation du recrutement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

popinConfirmationAnnulation.propTypes = {
  updateStatut: PropTypes.func,
  updateDateRecrutement: PropTypes.func,
  setDateValidee: PropTypes.func,
  toggleModal: PropTypes.func,
};

export default popinConfirmationAnnulation;
