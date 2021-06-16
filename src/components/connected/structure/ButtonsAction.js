import React from 'react';
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

  const updateDateRecrutement = date => {
    date = moment(date);
    dispatch(conseillerActions.updateDateRecrutement({ id: miseEnRelationId, date }));
  };
console.log(dateRecrutement);
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
              <strong>Après avoir pr&eacute;-selectionn&eacute; votre candidat vous devez mettre une date de recrutement avant de
                  cliquer sur le bouton &quot;valider cette candidature&quot;
              </strong>
            </label>
          </div>

          <div className="rf-col-12">
            <DatePicker
              id="datePicker"
              name="datePicker"
              className="rf-input rf-my-2w rf-mr-6w"
              dateFormat="dd/MM/yyyy"
              locale="fr"
              selected={dateRecrutement ? new Date(dateRecrutement) : ''}
              onChange={date => updateDateRecrutement(date)} />
          </div>

          <div className="rf-col-3">
            <button onClick={updateStatut.bind(this, 'recrutee')} className="rf-btn rf-btn--icon-left" title="Valider cette candidature">
              <i className="ri-user-follow-fill ri-xs"></i>&nbsp;Valider cette candidature
            </button>
          </div>
        </>
        }
        { statut === 'interessee' &&
          <div className="rf-col-3">
            <button onClick={updateStatut.bind(this, 'nouvelle')}
              className="rf-btn rf-fi-close-circle-line rf-btn--icon-left rf-btn--secondary"
              title="Annuler">
              Annuler
            </button>
          </div>
        }
        { statut === 'nonInteressee' &&
          <div className="rf-col-3">
            <button onClick={updateStatut.bind(this, 'nouvelle')}
              className="rf-btn rf-fi-close-circle-line rf-btn--icon-left rf-btn--secondary"
              title="Annuler">
              Annuler
            </button>
          </div>
        }
        {statut === 'recrutee' &&
          <p className="rf-col-3">
            <button onClick={() => {
              updateStatut('interessee');
              updateDateRecrutement(null);
            }}
            className="rf-btn rf-btn--secondary rf-fi-close-circle-line rf-btn--icon-left"
            title="Annuler le recrutement">
            Annuler le recrutement
            </button>
          </p>
        }
      </div>
    </div>
  );
}

ButtonsAction.propTypes = {
  statut: PropTypes.string,
  updateStatut: PropTypes.func,
  miseEnRelationId: PropTypes.string,
  dateRecrutement: PropTypes.instanceOf(Date)
};

export default ButtonsAction;
