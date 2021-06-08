import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { structureActions } from '../../../actions';
import InfoAModifier from './InfoAModifier';

function MonCompte() {
  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure);
  const [form, setForm] = useState(false);
  const [infoForm, setInfoForm] = useState(structure?.structure?.contact);

  useEffect(() => {
    dispatch(structureActions.get());
  }, []);

  const patch = () => {
    dispatch(structureActions.patch({ id: structure?.structure?._id, contact: infoForm }));
    setForm(false);
  };

  return (
    <div className="monCompte">
      <h2>
        Mon compte
      </h2>
      <div className="rf-grid-row">
        <div className="rf-col-n rf-col-lg-5">
          <p>Nom : { structure?.structure?.contact.nom }</p>
          <p>Prénom : { structure?.structure?.contact.prenom }</p>
          <p>Fonction : { structure?.structure?.contact.fonction }</p>
          <p>Téléphone : { structure?.structure?.contact.telephone }</p>
          <div className="rf-mt-10w">
            <button className="rf-btn" onClick={() => setForm(true)}>
            Modifier mes informations
              <span style={{ color: 'white' }} className="rf-fi-edit-line rf-ml-4v" aria-hidden="true"/>
            </button>
          </div>
        </div>
        {form === true ?
          <div className="rf-col-n rf-col-lg-5">
            <InfoAModifier structure={structure?.structure?.contact} infoForm={infoForm} setInfoForm={setInfoForm} onClick={patch}/>
          </div> :
          ''
        }
      </div>
    </div>
  );
}

export default MonCompte;
