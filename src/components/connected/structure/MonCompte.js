import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { structureActions } from '../../../actions';


function MonCompte() {
  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure);
  console.log('structure:', structure.structure);


  useEffect(() => {
    dispatch(structureActions.get());
  }, []);

  return (
    <div className="monCompte">
      <h2>
        Mon compte
      </h2>

    </div>
  );
}

export default MonCompte;
