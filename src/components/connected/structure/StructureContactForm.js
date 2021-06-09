import React from 'react';
import PropTypes from 'prop-types';

function StructureContactForm({ infoForm, setInfoForm, setForm, onClick }) {
  const handleForm = async event => {
    infoForm[event.target.name] = event.target.value;
    await setInfoForm(infoForm);
  };

  return (
    <div>
      <div className="rf-my-3w">
        <label className="rf-label">Nom</label>
        <input className="rf-input" type="text" id="text-input-text" name="nom" value={infoForm?.nom} onChange={handleForm} />
        <label className="rf-label rf-mt-5v">Prénom</label>
        <input className="rf-input" type="text" id="text-input-text" name="prenom" value={infoForm?.prenom} onChange={handleForm} />
        <label className="rf-label rf-mt-5v">Fonction</label>
        <input className="rf-input" type="text" id="text-input-text" name="fonction" value={infoForm?.fonction} onChange={handleForm} />
        <label className="rf-label rf-mt-5v">Téléphone</label>
        <input className="rf-input" type="text" id="text-input-text" name="telephone" value={infoForm?.telephone} onChange={handleForm}/>
      </div>
      <button onClick={() => setForm(false)} className="rf-btn">Annuler</button>
      <button style={{ float: 'right' }} className="rf-btn" onClick={onClick}>Valider</button>
    </div>
  );
}

StructureContactForm.propTypes = {
  structure: PropTypes.object,
  infoForm: PropTypes.object,
  setInfoForm: PropTypes.func,
  setForm: PropTypes.func,
  onClick: PropTypes.func
};
export default StructureContactForm;

