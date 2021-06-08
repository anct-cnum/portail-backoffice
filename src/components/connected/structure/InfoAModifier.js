import React from 'react';
import PropTypes from 'prop-types';

function InfoAModifier({ infoForm, setInfoForm, onClick }) {

  const handleForm = async event => {
    infoForm[event.target.name] = event.target.value;
    await setInfoForm(infoForm);
  };

  return (
    <div>
      <div className="rf-my-3w">
        <label className="rf-label">Nom</label>
        <input className="rf-input" type="text" id="text-input-text" name="nom" placeholder={infoForm?.nom} onChange={handleForm} />
        <label className="rf-label rf-mt-5v">Prénom</label>
        <input className="rf-input" type="text" id="text-input-text" name="prenom" placeholder={infoForm?.prenom} onChange={handleForm} />
        <label className="rf-label rf-mt-5v">Fonction</label>
        <input className="rf-input" type="text" id="text-input-text" name="fonction" placeholder={infoForm?.fonction} onChange={handleForm} />
        <label className="rf-label rf-mt-5v">Téléphone</label>
        <input className="rf-input" type="text" id="text-input-text" name="telephone" placeholder={infoForm?.telephone} onChange={handleForm}/>
      </div>
      <button style={{ float: 'right' }} className="rf-btn" onClick={onClick}>Valider</button>
    </div>
  );
}

InfoAModifier.propTypes = {
  structure: PropTypes.object,
  infoForm: PropTypes.object,
  setInfoForm: PropTypes.func,
  onClick: PropTypes.func
};
export default InfoAModifier;

