import React, { forwardRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterDateActions } from '../../../../../actions';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';

registerLocale('fr', fr);
function ElementDatePicker(props) {

  let dateDebut = useSelector(state => state.filterDate?.filterDateStart);
  let dateFin = useSelector(state => state.filterDate?.filterDateEnd);

  const dispatch = useDispatch();
  const setDate = date => {
    if (props.nomDate === 'datePickerDebut') {
      if (date <= dateFin) { //on ne change la date de debut que si elle est <= date de fin
        dispatch(filterDateActions.updateFilterDateStart(date));
      }
    } else if (date >= dateDebut) { //on ne change la date de fin que si elle est >= date de début
      dispatch(filterDateActions.updateFilterDateEnd(date));
    }
  };

  const [active, setActive] = useState(false);

  const CustomDateInput = forwardRef(
    ({ value, onClick }, ref) => (
      <span className={active ? 'date-btn date-active' : 'date-btn' } onClick={onClick} ref={ref}>
        <b>{value}</b>
        <i className={active ? 'ri-arrow-up-s-line chevron-stats' : 'ri-arrow-down-s-line chevron-stats' }></i>
      </span>
    ),
  );
  CustomDateInput.displayName = 'CustomDateInput';

  return (
    <DatePicker
      id={props.idDate}
      name={props.nomDate}
      dateFormat="dd/MM/yyyy"
      locale="fr"
      selected={props.initDate}
      onChange={date => setDate(date)}
      onCalendarOpen={() => setActive(true)}
      onCalendarClose={() => setActive(false)}
      customInput={<CustomDateInput />}
      disabledKeyboardNavigation
    />
  );
}

ElementDatePicker.propTypes = {
  idDate: PropTypes.string,
  nomDate: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onClick: PropTypes.string,
  initDate: PropTypes.instanceOf(Date),
};

export default ElementDatePicker;
