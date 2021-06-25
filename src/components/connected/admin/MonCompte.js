import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function MonCompte() {
  const user = useSelector(state => state.authentication.user?.user);
  const [form, setForm] = useState(false);

  return (
    <div>
      <h2 style={{ marginTop: '0' }}>Mon compte</h2>
      {form === false ?
        <>
          <p>Email :<strong> { user?.name }</strong></p>
          <button className={user.role === 'admin' ? 'rf-btn rfmt-2w rf-mt-5w' : 'rf-btn'} onClick={() => setForm(true)}>
              Modifier mon adresse e-mail &ensp;
            <span style={{ color: 'white' }} className="rf-fi-edit-line" aria-hidden="true"/>
          </button>
        </> :
        <div className="rf-container--fluid">
          <div className="rf-my-3w rf-col-lg-3 rf-col-3 rf-col-sm-8">
            <label className="rf-label">E-mail</label>
            <input className="rf-input" type="text" id="text-input-text" name="nom" value={user?.name} />
          </div>
          <div className="rf-col-lg-3 rf-col-3 rf-col-sm-8">
            <button onClick={() => setForm(false)} className="rf-btn">Annuler </button>
            <button className="rf-btn rf-m-auto" style={{ float: 'right' }} onClick={() => setForm(false)}>Valider</button>
          </div>
        </div>
      }
    </div>
  );
}

export default MonCompte;
