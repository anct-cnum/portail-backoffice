import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersAndSortsActions, conseillerActions } from '../../../actions';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function filtersAndSorts({ resetPage }) {

  const dispatch = useDispatch();
  let filtersAndSorts = useSelector(state => state.filtersAndSorts);
  const { search } = useSelector(state => state.search);
  let { filter } = useParams();

  //Sort
  const changeSort = e => {
    let order = e.target.checked ? 'conseillerObj.dateDisponibilite' : 'conseillerObj.createdAt';
    dispatch(filtersAndSortsActions.updateOrder(order));
    dispatch(conseillerActions.getAll({ misesEnRelation: true, search, page: 0, filter, sortData: order, persoFilters: filtersAndSorts }));
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
    dispatch(conseillerActions.getAll({ misesEnRelation: true, search, page: 0, filter, sortData: filtersAndSorts?.order, persoFilters }));
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
    dispatch(conseillerActions.getAll({ misesEnRelation: true, search, page: 0, filter, sortData: filtersAndSorts?.order, persoFilters }));
    resetPage(1);
  };

  return (
    <div>
      <div className="rf-grid-row rf-grid-row--left">
        <div className="rf-col-n" >
          <div className="rf-form-group" style={{ float: 'left' }}>
            <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2v rf-co">
              <div className="rf-mr-3w" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-start' }}>
                <span>
                  <label style={{ marginRight: '1rem', fontWeight: 'normal' }}>Niveau(x) Pix</label>
                </span>
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
              </div>
            </fieldset>
          </div>
        </div>
        <div className="rf-col-sm-3 rf-col-md-5 rf-col-lg-3">
          <div className="rf-mr-3w" style={{ display: 'flex', alignItems: 'baseline', textAlign: 'center' }}>
            <span>
              <label className="rf-label rf-mr-4v" style={{ fontWeight: 'normal' }} htmlFor="selectDiplome">Diplômé ?</label>
            </span>
            <select className="rf-select rf-col rf-mt-3v" id="selectDiplome" name="selectDiplome" onChange={changeDiplome} value={filtersAndSorts?.diplome}>
              <option value="">- Tous -</option>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </div>
        </div>
        <div className="rf-mt-1v">
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
      </div>
    </div>
  );
}

filtersAndSorts.propTypes = {
  resetPage: PropTypes.func
};

export default filtersAndSorts;
