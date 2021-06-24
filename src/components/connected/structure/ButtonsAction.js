import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { conseillerActions } from '../../../actions/conseiller.actions';
import { useDispatch } from 'react-redux';
import moment from 'moment';

//Print datePicker calendar in FR
registerLocale('fr', fr);
function ButtonsAction({ statut, updateStatut, miseEnRelationId, dateRecrutement }) {

  const dispatch = useDispatch();

  const [dateValidee, setDateValidee] = useState(dateRecrutement);

  const toggleModal = boolean => {
    let modal = document.getElementById('rf-modal-annuler');
    if (boolean === true) {
      modal.classList.add('modalOpened');
    } else {
      modal.classList.remove('modalOpened');
    }
  };

  const updateDateRecrutement = date => {
    date = moment(date);
    dispatch(conseillerActions.updateDateRecrutement({ id: miseEnRelationId, date }));
  };


  return (
    <div className="rf-container-fluid">
      <div className="rf-grid-row">
        {statut === 'nouvelle' &&
          <div className="rf-col-3">
            <button onClick={updateStatut.bind(this, 'interessee')} className="rf-btn rf-fi-checkbox-line rf-btn--icon-left" title="Pré sélectionner">
              Pré sélectionner
            </button>
          </div>
        }
        {statut === 'nouvelle' &&
          <div className="rf-col-3">
            <button onClick={updateStatut.bind(this, 'nonInteressee')}
              className="rf-btn rf-fi-close-circle-line rf-btn--icon-left rf-btn--secondary"
              title="Ce profil ne correspond pas">
              Ce profil ne correspond pas
            </button>
          </div>
        }
        {statut === 'interessee' &&
        <>
          <div className="rf-col-12">
            <label
              className="rf-label"
              style={{ fontSize: 'unset' }}
              htmlFor="datePicker">
              <strong className="important">Indiquer la date de recrutement de ce candidat (obligatoire) :</strong>
            </label>
          </div>

          <div className="rf-col-6 rf-col-xl-4 btn-rf-col-xl-3">
            <DatePicker
              id="datePicker"
              name="datePicker"
              className="rf-input rf-my-2w rf-mr-6w"
              dateFormat="dd/MM/yyyy"
              locale="fr"
              selected={dateValidee ? new Date(dateValidee) : ''}
              onChange={date => setDateValidee(date)}
            />
          </div>

          <div className="rf-col-6 rf-col-xl-4 btn-rf-col-xl-3 rf-my-2w">
            <button onClick={() => {
              updateDateRecrutement(dateValidee);
              updateStatut('recrutee');
            }} disabled={ !dateValidee } className="rf-btn rf-btn--icon-left" title="Valider cette candidature">
              <i className="ri-user-follow-fill ri-xs"></i>&nbsp;Valider cette candidature
            </button>
          </div>
        </>
        }
        { statut === 'interessee' &&
          <div className="rf-col-6 rf-col-xl-4 btn-rf-col-xl-3 rf-my-2w">
            <button onClick={updateStatut.bind(this, 'nouvelle')}
              className="rf-btn rf-fi-close-circle-line rf-btn--icon-left rf-btn--secondary"
              title="Annuler la pré-sélection">
              Annuler la pré-sélection
            </button>
          </div>
        }
        { statut === 'nonInteressee' &&
          <div className="rf-col-3">
            <button onClick={updateStatut.bind(this, 'nouvelle')}
              className="rf-btn rf-fi-close-circle-line rf-btn--icon-left rf-btn--secondary"
              title="Annuler le désintérêt">
              Annuler le désintérêt
            </button>
          </div>
        }
        {statut === 'recrutee' &&
          <p className="rf-col-3">

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

            <button id="btn-annuler" onClick={() => {
              toggleModal(true);
            }}
            className="rf-btn rf-btn--secondary rf-fi-close-circle-line rf-btn--icon-left"
            title="Annuler le recrutement">
            Annuler le recrutement
            </button>
          </p>
        }
        {statut === 'finalisee' &&
          <p><strong>Recrutement finalisé pour ce candidat</strong></p>
        }
      </div>
    </div>
  );
}

ButtonsAction.propTypes = {
  statut: PropTypes.string,
  updateStatut: PropTypes.func,
  miseEnRelationId: PropTypes.string,
  dateRecrutement: PropTypes.string
};

export default ButtonsAction;
