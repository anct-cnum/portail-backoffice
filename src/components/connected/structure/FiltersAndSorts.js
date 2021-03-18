import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { filtersAndSortsActions } from '../../../actions/filtersAndSorts.actions';

function filtersAndSorts({ update }) {

  const dispatch = useDispatch();
  const filtersAndSorts = useSelector(state => state.filtersAndSorts);

  console.log(filtersAndSorts);

  return (
    <div>
      <div className="rf-container-fluid">
        <div className="rf-grid-row">
          {/* Tri */}
          {filtersAndSorts }
          <div className="rf-toggle rf-toggle--border-bottom rf-toggle--label-left">
            <input type="checkbox"
              className="rf-toggle__input"
              id="orderByDateStart"
              checked={filtersAndSorts?.order === 'conseillers.dateDisponibilite'}
              onChange={e => {
                let order = e.target.checked ? 'conseillers.dateDisponibilite' : 'conseillers.createdAt';
                //TODO HERE dispatch(filtersAndSortsActions.updateOrder(order));
              }}/>
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
  );

}

filtersAndSorts.propTypes = {
  update: PropTypes.func,
};

export default filtersAndSorts;
