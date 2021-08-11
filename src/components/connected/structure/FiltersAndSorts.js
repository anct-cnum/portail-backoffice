import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersAndSortsActions, conseillerActions } from '../../../actions';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function filtersAndSorts({ resetPage }) {

  const dispatch = useDispatch();
  let filtersAndSorts = useSelector(state => state.filtersAndSorts);
  const { search } = useSelector(state => state.search);
  let { filter } = useParams();

  const [filters, setFilters] = useState({
    pixLevel1: '',
    pixLevel2: '',
    pixLevel3: '',
    diplome: '',
    cv: '',
    orderByDateStart: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'orderByDateStart') {
      let order = e.target.checked ? 'conseillerObj.dateDisponibilite' : 'conseillerObj.createdAt';
      dispatch(filtersAndSortsActions.updateOrder(order));
    }

    if (name === 'pixLevel1' || name === 'pixLevel2' || name === 'pixLevel3') {
      let pix = [];
      if (document.getElementById('pixLevel1').checked) {
        pix.push(1);
      }
      if (document.getElementById('pixLevel2').checked) {
        pix.push(2);
      }
      if (document.getElementById('pixLevel3').checked) {
        pix.push(3);
      }

      dispatch(filtersAndSortsActions.updatePix(pix));
    }

    if (name === 'selectDiplome') {
      let diplome = '';
      if (value !== '') {
        diplome = value === 'true';
      }
      dispatch(filtersAndSortsActions.updateDiplome(diplome));
    }

    if (name === 'selectCV') {
      let cv = '';
      if (value !== '') {
        cv = value === 'true';
      }
      dispatch(filtersAndSortsActions.updateCV(cv));
    }

    setFilters(inputs => ({ ...inputs, [name]: value }));

    let persoFilters = {
      pix: [!!filters.pixLevel1, !!filters.pixLevel2, !!filters.pixLevel3],
      cv: filters.cv,
      diplome: filters.diplome
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
              <div className="rf-mr-3w boxPix">
                <span>
                  <label className="labelPix">Niveau(x) Pix</label>
                </span>
                <div className="rf-fieldset__content">
                  <div className="rf-checkbox-group rf-checkbox-group--sm">
                    <input
                      type="checkbox"
                      id="pixLevel1"
                      name="pixLevel1"
                      value="1"
                      onChange={handleChange}
                    />
                    <label className="rf-label" htmlFor="pixLevel1">
                      <span style={{ verticalAlign: 'sub' }}><i className="ri-star-fill"></i></span>
                    </label>
                  </div>
                  <div className="rf-checkbox-group rf-checkbox-group--sm">
                    <input
                      type="checkbox"
                      id="pixLevel2"
                      name="pixLevel2"
                      value="2"
                      onChange={handleChange}
                    />
                    <label className="rf-label" htmlFor="pixLevel2">
                      <span style={{ verticalAlign: 'sub' }}><i className="ri-star-fill"></i><i className="ri-star-fill"></i></span>
                    </label>
                  </div>
                  <div className="rf-checkbox-group rf-checkbox-group--sm">
                    <input
                      type="checkbox"
                      id="pixLevel3"
                      name="pixLevel3"
                      value="3"
                      onChange={handleChange}
                    />
                    <label className="rf-label" htmlFor="pixLevel3">
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
        <div className="rf-col-sm-3 rf-col-md-5 rf-col-lg-2">
          <div className="rf-mr-3w selectOption">
            <span>
              <label className="rf-label rf-mr-4v labelDiplome" htmlFor="selectDiplome">Diplômé ?</label>
            </span>
            <select className="rf-select rf-col rf-mt-3v" id="selectDiplome" name="selectDiplome" onChange={handleChange} value={filtersAndSorts?.diplome}>
              <option value="">- Tous -</option>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </div>
        </div>
        <div className="rf-col-sm-3 rf-col-md-5 rf-col-lg-2">
          <div className="rf-mr-3w selectOption">
            <span>
              <label className="rf-label rf-mr-4v labelCV" htmlFor="selectCV">CV ?</label>
            </span>
            <select className="rf-select rf-col rf-mt-3v" id="selectCV" name="selectCV" onChange={handleChange} value={filtersAndSorts?.cv}>
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
                name="orderByDateStart"
                checked={filtersAndSorts?.order === 'conseillerObj.dateDisponibilite'}
                onChange={handleChange}/>
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
