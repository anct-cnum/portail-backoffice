import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersAndSortsActions, conseillerActions } from '../../../actions';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function filtersAndSorts({ resetPage }) {

  const dispatch = useDispatch();
  let filtersAndSorts = useSelector(state => state.filtersAndSorts);
  let { filter } = useParams();

  //Sort
  const changeSort = e => {
    let order = e.target.checked ? 'conseillerObj.dateDisponibilite' : 'conseillerObj.createdAt';
    dispatch(filtersAndSortsActions.updateOrder(order));
    dispatch(conseillerActions.getAll({ misesEnRelation: true, page: 0, filter, sortData: order, persoFilters: filtersAndSorts }));
    resetPage(1);
  };

  //filter Pix
  const changePix = () => {
    let pix = [];
    if (document.getElementById('pix-level-1').checked) {
      pix.push(1);
    }
    if (document.getElementById('pix-level-2').checked) {
      pix.push(2);
    }
    if (document.getElementById('pix-level-3').checked) {
      pix.push(3);
    }
    dispatch(filtersAndSortsActions.updatePix(pix));
    let persoFilters = {
      pix: pix,
      diplome: filtersAndSorts?.diplome
    };
    dispatch(conseillerActions.getAll({ misesEnRelation: true, page: 0, filter, sortData: filtersAndSorts?.order, persoFilters }));
    resetPage(1);
  };

  //filter Diplome
  const changeDiplome = () => {
    let diplome = document.getElementById('selectDiplome').value;

    if (diplome !== '') {
      diplome = (diplome === 'true');
    }
    dispatch(filtersAndSortsActions.updateDiplome(diplome));
    let persoFilters = {
      pix: filtersAndSorts?.pix,
      diplome: diplome
    };
    dispatch(conseillerActions.getAll({ misesEnRelation: true, page: 0, filter, sortData: filtersAndSorts?.order, persoFilters }));
    resetPage(1);
  };

  return (
    <div>
      <div className="rf-container-fluid">
        {/* Filtres */}
        <div className="rf-grid-row rf-mt-3w">
          <div className="rf-col-3 rf-mr-4w">
            <div className="rf-form-group">
              <fieldset className="rf-fieldset rf-fieldset--inline">
                <legend className="rf-fieldset__legend">Sélectionner le(s) niveau(x) Pix</legend>
                <div className="rf-fieldset__content">
                  <div className="rf-checkbox-group rf-checkbox-group--sm">
                    <input
                      type="checkbox"
                      id="pix-level-1"
                      name="pix-level-1"
                      checked={filtersAndSorts?.pix?.includes(1)}
                      onChange={changePix}
                    />
                    <label className="rf-label" htmlFor="pix-level-1">
                      <span style={{ verticalAlign: 'sub' }}><i className="ri-star-fill"></i></span>
                    </label>
                  </div>
                  <div className="rf-checkbox-group rf-checkbox-group--sm">
                    <input
                      type="checkbox"
                      id="pix-level-2"
                      name="pix-level-2"
                      checked={filtersAndSorts?.pix?.includes(2)}
                      onChange={changePix}
                    />
                    <label className="rf-label" htmlFor="pix-level-2">
                      <span style={{ verticalAlign: 'sub' }}><i className="ri-star-fill"></i><i className="ri-star-fill"></i></span>
                    </label>
                  </div>
                  <div className="rf-checkbox-group rf-checkbox-group--sm">
                    <input
                      type="checkbox"
                      id="pix-level-3"
                      name="pix-level-3"
                      checked={filtersAndSorts?.pix?.includes(3)}
                      onChange={changePix}
                    />
                    <label className="rf-label" htmlFor="pix-level-3">
                      <span style={{ verticalAlign: 'sub' }}>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                        <i className="ri-star-fill"></i>
                      </span>
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div className="rf-col-3 rf-mr-4w">
            <label className="rf-label" htmlFor="selectDiplome">Diplômé ?</label>
            <select className="rf-select" id="selectDiplome" name="selectDiplome" onChange={changeDiplome} value={filtersAndSorts?.diplome}>
              <option value="">- Tous -</option>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </div>
        </div>
      </div>
      <div className="rf-grid-row rf-mb-3w">
        {/* Tri */}
        <div className="rf-toggle rf-toggle--label-left">
          <input type="checkbox"
            className="rf-toggle__input"
            id="orderByDateStart"
            checked={filtersAndSorts?.order === 'conseillerObj.dateDisponibilite'}
            onChange={e => changeSort(e)}/>
          <label className="rf-toggle__label"
            htmlFor="orderByDateStart"
            data-rf-checked-label="Activé"
            data-rf-unchecked-label="Désactivé">
              Trier par date possible de démarrage
          </label>
        </div>
      </div>
    </div>
  );

}

filtersAndSorts.propTypes = {
  resetPage: PropTypes.func
};

export default filtersAndSorts;
