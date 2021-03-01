import React from 'react';
import PropTypes from 'prop-types';

function ButtonsAction({ statut, updateStatut }) {

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
        <button onClick={updateStatut.bind(this, 'interessee')}
          className="rf-btn rf-btn--secondary rf-mx-1w rf-fi-close-circle-line rf-btn--icon-left"
          title="annuler le recrutement">
        Annuler le recrutement
        </button>
      }
    </div>
  );
}

ButtonsAction.propTypes = {
  statut: PropTypes.string,
  updateStatut: PropTypes.func
};

export default ButtonsAction;
