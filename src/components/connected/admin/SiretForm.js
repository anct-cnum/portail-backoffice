import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { structureActions } from '../../../actions';

function SiretForm({ displayForm, structureId }) {
  const dispatch = useDispatch();
  const [siret, setSiret] = useState();

  useEffect(() => {
  }, []);

  const handleForm = event => {
    const { name, value } = event.target;

    setSiret({
      ...siret,
      [name]: value
    });

  };

  const ctrlSiret = e => {
    const reg = new RegExp('^[0-9]{15}$');
    let value = e.clipboardData.getData('Text');
    const { name } = e.currentTarget;
    //eslint-disable-next-line
    value = value.replace(/\s/g,'');

    if (reg.test(value)) {
      //e.target.validity.badInput = false;
      //console.log(document.getElementById(e.currentTarget.id).value);
      //document.getElementById(e.currentTarget.id).value = value;

      setSiret({
        ...siret,
        [name]: value
      });
    } else {
      console.log(e.target?.validity?.ValidityState?.badInput);
    }
    //1234 5678 9012 345
  };

  const updateSiret = () => {
    if (siret?.siret?.length !== 15 && structureId) {
      displayForm(false);
      dispatch(structureActions.updateStructureSiret(siret, structureId));
    }
  };

  return (
    <div>
      <div className="rf-my-3w">
        <label className="rf-label"><h3>SIRET</h3></label>
        <input className="rf-input" type="number" id="text-input-text" name="siret" onPaste={ctrlSiret} onChange={handleForm} />
      </div>
      <button onClick={() => displayForm(false)} className="rf-btn">Annuler</button>
      <button style={{ float: 'right' }} className="rf-btn" onClick={updateSiret}
        disabled={siret?.siret?.length !== 15 ? 'disabled' : ''}>Modifier</button>
    </div>
  );
}

SiretForm.propTypes = {
  displayForm: PropTypes.func,
  structureId: PropTypes.string,
};
export default SiretForm;

