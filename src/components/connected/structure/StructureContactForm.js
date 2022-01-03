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

  const handleForm = event => {
    const { name, value } = event.target;
    setInfoForm({
      ...infoForm,
      [name]: value
    });
  };
  const updateInfo = () => {
    dispatch(structureActions.patch({ id: structure?.structure?._id, contact: infoForm }));
    setForm(false);
  };
  return (
    <div>
      <div className="fr-my-3w">
        <label className="fr-label">Nom</label>
        <input className="fr-input" type="text" id="text-input-text" name="nom" value={infoForm?.nom} onChange={handleForm} />
        <label className="fr-label fr-mt-5v">Prénom</label>
        <input className="fr-input" type="text" id="text-input-text" name="prenom" value={infoForm?.prenom} onChange={handleForm} />
        <label className="fr-label fr-mt-5v">Fonction</label>
        <input className="fr-input" type="text" id="text-input-text" name="fonction" value={infoForm?.fonction} onChange={handleForm} />
        <label className="fr-label fr-mt-5v">Téléphone</label>
        <input className="fr-input" type="text" id="text-input-text" name="telephone" maxLength="20" value={infoForm?.telephone} onChange={handleForm}/>
      </div>
      <button onClick={() => setForm(false)} className="fr-btn">Annuler</button>
      <button style={{ float: 'right' }} className="fr-btn" onClick={updateInfo}>Valider</button>
    </div>
  );
}

StructureContactForm.propTypes = {
  setForm: PropTypes.func,
};
export default StructureContactForm;

