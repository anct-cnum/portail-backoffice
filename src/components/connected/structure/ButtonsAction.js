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
        <button onClick={updateStatut.bind(this, 'interessee')} className="rf-btn rf-mx-1w rf-fi-checkbox-line rf-btn--icon-left" title="ça m'intéresse">
          Sélectionner ce profil
        </button>
      }
      {statut === 'nouvelle' &&
        <button onClick={updateStatut.bind(this, 'nonInteressee')}
          className="rf-btn rf-mx-1w rf-fi-close-circle-line rf-btn--icon-left rf-btn--secondary"
          title="ça ne m'intéresse pas">
          Ce profil ne correspond pas
        </button>
      }
      {statut === 'interessee' &&
        <button onClick={updateStatut.bind(this, 'recrutee')} className="rf-btn rf-mx-1w rf-btn--icon-left" title="Recruter">
          <i className="ri-user-follow-fill ri-xs"></i>&nbsp;Recruter
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
            style={{ color: '#000091', fontSize: 'unset' }}
            htmlFor="datePicker">
              Veuillez saisir la date d&rsquo;embauche du ou de la candidate retenu(e) :
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
          <button onClick={updateStatut.bind(this, 'interessee')}
            className="rf-btn rf-btn--secondary rf-mx-1w rf-fi-close-circle-line rf-btn--icon-left"
            title="annuler le recrutement">
          Annuler le recrutement
          </button>
        </p>
      }
    </div>
  );
}

ButtonsAction.propTypes = {
  statut: PropTypes.string,
  updateStatut: PropTypes.func,
  miseEnRelationId: PropTypes.string,
  dateRecrutement: PropTypes.date
};

export default ButtonsAction;
