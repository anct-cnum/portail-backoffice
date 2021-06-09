import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { structureActions } from '../../../actions';

function StructureContactForm({ setForm }) {
  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure);
  const [infoForm, setInfoForm] = useState(structure?.structure?.contact);

  useEffect(() => {
    dispatch(structureActions.get());
  }, []);

  const handleForm = async event => {
    infoForm[event.target.name] = event.target.value;
    await setInfoForm(infoForm);
  };
  const updateInfo = () => {
    dispatch(structureActions.patch({ id: structure?.structure?._id, contact: infoForm }));
    setForm(false);
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
      <button style={{ float: 'right' }} className="rf-btn" onClick={updateInfo}>Valider</button>
    </div>
  );
}

StructureContactForm.propTypes = {
  setForm: PropTypes.func,
};
export default StructureContactForm;

