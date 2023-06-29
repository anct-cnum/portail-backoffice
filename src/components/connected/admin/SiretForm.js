import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { structureActions } from '../../../actions';

function SiretForm({ setDisplaySiretForm, structureId }) {
  const dispatch = useDispatch();
  const siretValid = useSelector(state => state.structure?.nomStructure);

  const [siret, setSiret] = useState('');
  const reg = new RegExp('^[0-9]{14}$');

  const filtreValue = value => {
    //eslint-disable-next-line
    return value.replace(/\s/g,'');
  };

  const handleForm = e => {
    let { value } = e.target;
    value = filtreValue(value);
    setSiret(value);
  };

  const verifySiret = () => {
    if (siret?.length === 14 && reg.test(siret) && structureId) {
      dispatch(structureActions.verifyStructureSiret(siret, structureId));
    }
  };

  const updateSiret = () => {
    setDisplaySiretForm(false);
    dispatch(structureActions.updateStructureSiret(siret, structureId));
  };

  const cancelSiret = () => {
    dispatch(structureActions.cancelStructureSiret());
    setSiret(null);
  };

  return (
    <div>
      <div className="fr-my-3w">
        {siretValid &&
          <dialog aria-labelledby="fr-modal-confirm-siret" role="dialog" id="fr-modal-confirm-siret" className="fr-modal modalOpened">
            <div className="fr-container">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-5 fr-modal__body">
                  <p>Le SIRET demandé fait référence à cette structure :</p>
                  <p><b>{siretValid}</b></p>
                  <p>Mettre à jour la structure ?</p>
                  <button onClick={cancelSiret} className="fr-btn fr-btn--secondary
                   fr-my-3w fr-ml-9w fr-mr-4w"><i className="ri-close-circle-line"></i>&nbsp;Annuler</button>
                  <button className="fr-btn fr-my-3w" onClick={updateSiret}><i className="ri-checkbox-line"></i>&nbsp;Confirmer</button>
                </div>
              </div>
            </div>
          </dialog>
        }

        <label className="fr-label"><h3>SIRET</h3></label>
        <input className="fr-input" type="text" id="text-input-text" name="siret" value={siret} onChange={handleForm} />
      </div>

      <button onClick={() => setDisplaySiretForm(false)} className="fr-btn fr-btn--secondary">Annuler</button>
      <button style={{ float: 'right' }} className="fr-btn" onClick={verifySiret}
        disabled={!reg.test(siret) ? 'disabled' : ''}>Valider</button>
    </div>
  );
}

SiretForm.propTypes = {
  setDisplaySiretForm: PropTypes.func,
  structureId: PropTypes.string,
};
export default SiretForm;

