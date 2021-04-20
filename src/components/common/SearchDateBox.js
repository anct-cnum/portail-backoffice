import React, { useState, useSelector } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { searchDateActions } from '../../actions';
import { useDispatch } from 'react-redux';

registerLocale('fr', fr);
function SearchDateBox(props) {
  const dispatch = useDispatch();

  const [newDate, setDate] = useState(props.newDate);

  function handleChange(e) {
    setDate(e);

    if (props.selectorDate === 'begin') {
      dispatch(searchDateActions.updateSearchDateBegin(e));
    } else {
      dispatch(searchDateActions.updateSearchDateEnd(e));
    }
  }

  return (
    <div className={'rf-mb-2w ' + props.classeDate}>
      <DatePicker
        placeholderText= {props.placeholderTextDate}
        id={props.idDate}
        name= {props.nameDate}
        className="rf-input rf-mx-1w"
        dateFormat="dd/MM/yyyy"
        locale="fr"
        selected={newDate}
        onChange={handleChange}
      />
    </div>
  );
}

SearchDateBox.propTypes = {
  placeholderTextDate: PropTypes.string,
  idDate: PropTypes.string,
  nameDate: PropTypes.string,
  classeDate: PropTypes.string,
  newDate: PropTypes.string,
  selectorDate: PropTypes.string,
};

export default SearchDateBox;
