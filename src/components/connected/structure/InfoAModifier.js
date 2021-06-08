import React from 'react';
import PropTypes from 'prop-types';

function InfoAModifier({ structure }) {
  console.log('structure:', structure);
  return (
    <div>
      <div className="rf-my-3w rf-mb-10w">
        <label className="rf-label">Nom</label>
        <input className="rf-input" type="text" id="text-input-text" name="text-input-text" />
        <label className="rf-label rf-mt-5v">Prénom</label>
        <input className="rf-input" type="text" id="text-input-text" name="text-input-text" />
        <label className="rf-label rf-mt-5v">Fonction</label>
        <input className="rf-input" type="text" id="text-input-text" name="text-input-text" />
        <label className="rf-label rf-mt-5v">Téléphone</label>
        <input className="rf-input" type="text" id="text-input-text" name="text-input-text" />
      </div>
      <button className="rf-btn rf-mb-11v">Valider</button>
    </div>
  );
}

InfoAModifier.propTypes = {
  structure: PropTypes.object
};
export default InfoAModifier;

