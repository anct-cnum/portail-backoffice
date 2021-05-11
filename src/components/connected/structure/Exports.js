import React, { useEffect } from 'react';
import { exportsActions, structureActions } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-loader-spinner';

function Exports() {

  const dispatch = useDispatch();
  const exports = useSelector(state => state.exports);
  const error = useSelector(state => state.exports?.error);

  useEffect(() => {
    dispatch(structureActions.get());
  }, []);

  useEffect(() => {
    if (exports?.blob !== null && exports?.blob !== undefined && (error === undefined || error === false)) {
      const url = window.URL.createObjectURL(new Blob(['\ufeff', exports?.blob], { type: 'text/plain' })); //ufeff pour BOM UTF-8
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${exports?.nameFile}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      dispatch(exportsActions.resetFile()); //nécessaire pour ne pas reconstruire le fichier au rechargement de la page
    }

  }, [exports]);

  const getFile = nameFile => {
    dispatch(exportsActions.exportFile(nameFile));
  };

  return (
    <div className="exports" style={{ position: 'relative' }}>
      <div className="spinnerCustom">
        <Spinner
          type="Oval"
          color="#00BFFF"
          height={100}
          width={100}
          visible={exports?.loading === true}
        />
      </div>
      <p>
        <a className="rf-link" onClick={() => getFile('candidatsByStructure')}>Export des candidats</a>
        <span className="rf-footer__bottom-link" style={{ display: 'block' }}>
          Export des emails, noms, prénoms de la liste des candidats
        </span>
        { (error !== undefined && error !== false) &&
          <span className="labelError">Une erreur est survenue : {error?.toString()}</span>
        }
      </p>
    </div>
  );
}

export default Exports;
