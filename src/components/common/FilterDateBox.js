import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { filterDateActions } from '../../actions';
import { useDispatch } from 'react-redux';

registerLocale('fr', fr);
function FilterDateBox(props) {
  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(props.dateStart);
  const [dateEnd, setDateEnd] = useState(props.dateEnd);

  function handleChangeStart(e) {
    setDateStart(e);
    dispatch(filterDateActions.updateFilterDateStart(e));
  }

  function handleChangeEnd(e) {
    setDateEnd(e);
    dispatch(filterDateActions.updateFilterDateEnd(e));
  }

  return (
    <div className="rf-container-fluid">
      <div className="rf-grid-row fr-grid-row--gutters">
        <div className="rf-col-xs-12 rf-col-sm-6">
          <div className="rf-mb-2w filterDateBoxDebut">
            <DatePicker
              placeholderText="Date de début"
              id="datePickerDebut"
              name="datePickerDebut"
              className="rf-input rf-mx-1w"
              dateFormat="dd/MM/yyyy"
              locale="fr"
              selected={dateStart}
              onChange={handleChangeStart}
            />
          </div>
        </div>
        <div className="rf-col-xs-12 rf-col-sm-6">
          <div className="rf-mb-2w filterDateBoxFin">
            <DatePicker
              placeholderText="Date de fin"
              id="datePickerFin"
              name="datePickerFin"
              className="rf-input rf-mx-1w"
              dateFormat="dd/MM/yyyy"
              locale="fr"
              selected={dateEnd}
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
