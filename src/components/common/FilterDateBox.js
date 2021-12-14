import React from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { filterDateActions } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

registerLocale('fr', fr);
function FilterDateBox() {
  const dispatch = useDispatch();

  const dates = useSelector(state => state.filterDate);

  function handleChangeStart(e) {
    dispatch(filterDateActions.updateFilterDateStart(e));
  }

  function handleChangeEnd(e) {
    dispatch(filterDateActions.updateFilterDateEnd(e));
  }

  return (
    <div className="fr-container-fluid">
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-xs-12 fr-col-sm-6">
          <div className="fr-mb-2w filterDateBoxDebut">
            <DatePicker
              placeholderText="Date de début"
              id="datePickerDebut"
              name="datePickerDebut"
              className="fr-input fr-mx-1w"
              dateFormat="dd/MM/yyyy"
              locale="fr"
              selected={dates.filterDateStart}
              onChange={handleChangeStart}
            />
          </div>
        </div>
        <div className="fr-col-xs-12 fr-col-sm-6">
          <div className="fr-mb-2w filterDateBoxFin">
            <DatePicker
              placeholderText="Date de fin"
              id="datePickerFin"
              name="datePickerFin"
              className="fr-input fr-mx-1w"
              dateFormat="dd/MM/yyyy"
              locale="fr"
              selected={dates.filterDateEnd}
              onChange={handleChangeEnd}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

FilterDateBox.propTypes = {
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string,
};

export default FilterDateBox;
