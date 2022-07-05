import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { conseillerActions } from '../../../actions/conseiller.actions';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import PopinConfirmationAnnulation from './popins/popinConfirmationAnnulation';

//Print datePicker calendar in FR
registerLocale('fr', fr);
function ButtonsAction({ statut, updateStatut, miseEnRelationId, dateRecrutement, dateFinDeContrat, motifFinDeContrat }) {

  const dispatch = useDispatch();

  const [dateValidee, setDateValidee] = useState(dateRecrutement);
  const [dateFinDeContratValidee, setDateFinDeContratValidee] = useState(dateFinDeContrat);
  const [motifFinDeContratValide, setMotifFinDeContratValide] = useState(motifFinDeContrat);

  const toggleModal = visible => {
    let modal = document.getElementById('fr-modal-annuler');
    if (visible) {
      modal.classList.add('modalOpened');
    } else {
      modal.classList.remove('modalOpened');
    }
  };

  const updateDateRecrutement = date => {
    window.scrollTo(0, 0); //permet de remonter pour visualiser le message date embauche enregistrée
    date = moment(date);
    dispatch(conseillerActions.updateDateRecrutement({ id: miseEnRelationId, date }));
  };

  const updateDateFinDeContrat = date => {
    date = moment(date);
    dispatch(conseillerActions.updateDateFinDeContrat({ id: miseEnRelationId, date }));
  };

  const updateMotifFinDeContrat = motif => {
    dispatch(conseillerActions.updateMotifFinDeContrat({ id: miseEnRelationId, motif }));
  };

  return (
    <div className="fr-container fr-container--fluid">
      <div className="fr-grid-row">
        {statut === 'nouvelle' &&
          <div className="fr-col-3">
            <button onClick={updateStatut.bind(this, 'interessee')} className="fr-btn fr-fi-checkbox-line fr-btn--icon-left" title="Pré sélectionner">
              Pré sélectionner
            </button>
          </div>
        }
        {statut === 'nouvelle' &&
          <div className="fr-col-3">
            <button onClick={updateStatut.bind(this, 'nonInteressee')}
              className="fr-btn fr-fi-close-circle-line fr-btn--icon-left fr-btn--secondary"
              title="Ce profil ne correspond pas">
              Ce profil ne correspond pas
            </button>
          </div>
        }
        {statut === 'interessee' &&
        <>
          <div className="fr-col-12">
            <label
              className="fr-label"
              style={{ fontSize: 'unset' }}
              htmlFor="datePicker">
              <strong className="important">Indiquer la date de recrutement de ce candidat (obligatoire) :</strong>
            </label>
          </div>

          <div className="fr-col-6 fr-col-xl-4 btn-fr-col-xl-3">
            <DatePicker
              id="datePicker"
              name="datePicker"
              className="fr-input fr-my-2w fr-mr-6w"
              dateFormat="dd/MM/yyyy"
              locale="fr"
              selected={dateValidee ? new Date(dateValidee) : ''}
              onChange={date => setDateValidee(date)}
            />
          </div>

          <div className="fr-col-6 fr-col-xl-4 btn-fr-col-xl-3 fr-my-2w">
            <button onClick={() => {
              updateDateRecrutement(dateValidee);
              updateStatut('recrutee');
            }} disabled={ !dateValidee } className="fr-btn fr-btn--icon-left" title="Valider cette candidature">
              <i className="ri-user-follow-fill ri-xs"></i>&nbsp;Valider cette candidature
            </button>
          </div>
        </>
        }
        { statut === 'interessee' &&
          <div className="fr-col-6 fr-col-xl-4 btn-fr-col-xl-3 fr-my-2w">
            <button onClick={updateStatut.bind(this, 'nouvelle')}
              className="fr-btn fr-fi-close-circle-line fr-btn--icon-left fr-btn--secondary"
              title="Annuler la pré-sélection">
              Annuler la pré-sélection
            </button>
          </div>
        }
        { statut === 'nonInteressee' &&
          <div className="fr-col-3">
            <button onClick={updateStatut.bind(this, 'nouvelle')}
              className="fr-btn fr-fi-close-circle-line fr-btn--icon-left fr-btn--secondary"
              title="Annuler le désintérêt">
              Annuler le désintérêt
            </button>
          </div>
        }
        {statut === 'recrutee' &&
        <>
          <PopinConfirmationAnnulation
            updateStatut={updateStatut}
            updateDateRecrutement={updateDateRecrutement}
            setDateValidee={setDateValidee}
            toggleModal={toggleModal}>
          </PopinConfirmationAnnulation>
          <p className="fr-col-3">
            <button id="btn-annuler" onClick={() => {
              toggleModal(true);
            }}
            className="fr-btn fr-btn--secondary fr-fi-close-circle-line fr-btn--icon-left"
            title="Annuler le recrutement">
            Annuler le recrutement
            </button>
          </p>
        </>
        }
        {statut === 'finalisee' &&
        <>
          <div className="fr-col-12">
            <h3><strong>Recrutement finalisé pour ce candidat</strong></h3>
          </div>

          <div className="fr-col-12">
            <p><strong>Notifier une rupture de contrat :</strong></p>
          </div>

          <div className="fr-col-12">
            <label
              className="fr-label"
              style={{ fontSize: 'unset' }}
              htmlFor="datePickerFinDeContrat">
              <strong>Indiquer la date de fin de contrat (obligatoire) :</strong>
            </label>
          </div>

          <div className="fr-col-12 fr-col-xl-4">
            <DatePicker
              id="datePickerFinDeContrat"
              name="datePickerFinDeContrat"
              className="fr-input fr-my-2w fr-mr-6w"
              dateFormat="dd/MM/yyyy"
              locale="fr"
              selected={dateFinDeContratValidee ? new Date(dateFinDeContratValidee) : ''}
              onChange={date => setDateFinDeContratValidee(date)}
            />
          </div>


          <div className="fr-col-12">
            <label
              className="fr-label"
              style={{ fontSize: 'unset' }}
              htmlFor="datePicker">
              <strong>Indiquer le motif de fin de contrat (obligatoire) :</strong>
            </label>
          </div>

          <div className="fr-col-6 fr-col-xl-4">
            <select id="motifFinDeContrat" name="motifFinDeContrat" className="fr-select fr-my-2w fr-mb-w"
              onChange={ motif => setMotifFinDeContratValide(motif.target.value)} value={motifFinDeContratValide === null ? '' : motifFinDeContratValide}>
              <option value="">Choisir un motif</option>
              <option value="licenciement">Licenciement</option>
              <option value="nonReconductionCDD">Non-reconduction du CDD</option>
              <option value="demission">Démission</option>
              <option value="autre">Autre</option>
            </select>
          </div>


          <div className="fr-col-12 fr-col-xl-4 btn-fr-col-xl-3 fr-my-2w">
            <button onClick={() => {
              updateDateFinDeContrat(dateFinDeContratValidee);
              updateMotifFinDeContrat(motifFinDeContratValide);
              updateStatut('nouvelle_rupture');
            }} disabled={ !dateFinDeContratValidee || !motifFinDeContratValide } className="fr-btn fr-btn--icon-left" title="Notifier la rupture de contrat">
              <i className="ri-user-follow-fill ri-xs"></i>&nbsp;Notifier la rupture de contrat
            </button>
          </div>
        </>
        }
        {statut === 'nouvelle_rupture' &&
        <>
          <div className="fr-col-5">
            <p><strong>Rupture de contrat notifiée</strong></p><br />
            <button onClick={() => {
              updateStatut('finalisee');
              updateDateFinDeContrat(null);
              updateMotifFinDeContrat(null);
            }}
            className="fr-btn fr-fi-close-circle-line fr-btn--icon-left fr-btn--secondary"
            title="Annuler la rupture de contrat">
            Annuler la rupture de contrat
            </button>
          </div>
        </>
        }
      </div>
    </div>
  );
}

ButtonsAction.propTypes = {
  statut: PropTypes.string,
  updateStatut: PropTypes.func,
  miseEnRelationId: PropTypes.string,
  dateRecrutement: PropTypes.string,
  dateFinDeContrat: PropTypes.string,
  motifFinDeContrat: PropTypes.string
};

export default ButtonsAction;
