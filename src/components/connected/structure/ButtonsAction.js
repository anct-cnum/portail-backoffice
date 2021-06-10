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

  return (

    <div>
      {statut === 'nouvelle' &&
        <button onClick={updateStatut.bind(this, 'interessee')} className="rf-btn rf-mx-1w rf-fi-checkbox-line rf-btn--icon-left" title="Pré sélectionner">
          Pré sélectionner
        </button>
      }
      {statut === 'nouvelle' &&
        <button onClick={updateStatut.bind(this, 'nonInteressee')}
          className="rf-btn rf-mx-1w rf-fi-close-circle-line rf-btn--icon-left rf-btn--secondary"
          title="Ce profil ne correspond pas">
          Ce profil ne correspond pas
        </button>
      }
      {statut === 'interessee' &&
        <button onClick={updateStatut.bind(this, 'recrutee')} className="rf-btn rf-mx-1w rf-btn--icon-left" title="Valider cette candidature">
          <i className="ri-user-follow-fill ri-xs"></i>&nbsp;Valider cette candidature
        </button>
      }
      { statut === 'interessee' &&
        <button onClick={updateStatut.bind(this, 'nouvelle')}
          className="rf-btn rf-mx-1w rf-fi-close-circle-line rf-btn--icon-left rf-btn--secondary"
          title="Annuler">
          Annuler
        </button>
      }
      { statut === 'nonInteressee' &&
        <button onClick={updateStatut.bind(this, 'nouvelle')}
          className="rf-btn rf-mx-1w rf-fi-close-circle-line rf-btn--icon-left rf-btn--secondary"
          title="Annuler">
          Annuler
        </button>
      }
      {statut === 'recrutee' &&
        <div>
          <label
            className="rf-label rf-mx-1w"
            style={{ fontSize: 'unset' }}
            htmlFor="datePicker">
            <strong>Veuillez sélectionner la date d&rsquo;embauche du ou de la candidate retenu(e) :</strong>
          </label>
          <DatePicker
            id="datePicker"
            name="datePicker"
            className="rf-input rf-mx-1w"
            dateFormat="dd/MM/yyyy"
            locale="fr"
            selected={dateRecrutement ? new Date(dateRecrutement) : ''}
            onChange={date => updateDateRecrutement(date)} />
        </div>
      }
      {statut === 'recrutee' &&
        <p>
          <button onClick={() => {
            updateStatut('interessee');
            updateDateRecrutement(null);
          }}
          className="rf-btn rf-btn--secondary rf-mx-1w rf-fi-close-circle-line rf-btn--icon-left"
          title="Annuler le recrutement">
          Annuler le recrutement
          </button>
        </p>
      }
      {statut === 'finalisee' &&
        <p> <strong>Recrutement finalisé pour ce candidat</strong></p>
      }
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
