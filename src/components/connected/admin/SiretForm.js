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
      <div className="rf-my-3w">
        {siretValid &&
          <dialog aria-labelledby="rf-modal-confirm-siret" role="dialog" id="rf-modal-confirm-siret" className="rf-modal modalOpened">
            <div className="rf-container">
              <div className="rf-grid-row rf-grid-row--center">
                <div className="rf-col-5 rf-modal__body">
                  <p>Le SIRET demandé fait référence à cette structure :</p>
                  <p><b>{siretValid}</b></p>
                  <p>Mettre à jour la structure ?</p>
                  <button onClick={cancelSiret} className="rf-btn rf-fi-close-circle-line rf-btn--icon-left rf-btn--secondary
                   rf-my-3w rf-ml-9w rf-mr-4w">Annuler</button>
                  <button className="rf-btn rf-fi-checkbox-line rf-btn--icon-left rf-my-3w" onClick={updateSiret}>Confirmer</button>
                </div>
              </div>
            </div>
          </dialog>
        }

        <label className="rf-label"><h3>SIRET</h3></label>
        <input className="rf-input" type="text" id="text-input-text" name="siret" value={siret} onChange={handleForm} />
      </div>

      <button onClick={() => setDisplaySiretForm(false)} className="rf-btn rf-btn--secondary">Annuler</button>
      <button style={{ float: 'right' }} className="rf-btn" onClick={verifySiret}
        disabled={!reg.test(siret) ? 'disabled' : ''}>Modifier</button>
    </div>
  );
}

SiretForm.propTypes = {
  setDisplaySiretForm: PropTypes.func,
  structureId: PropTypes.string,
};
export default SiretForm;

