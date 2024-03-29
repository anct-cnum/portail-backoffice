import React from 'react';
import PropTypes from 'prop-types';

import ElementDatePicker from './Components/ElementDatePicker';

function StatistiquesPeriode(props) {

  return (
    <>
      <span>P&eacute;riode du &nbsp;</span>
      <span id="span-datePickerDebut" >
        <ElementDatePicker initDate={props.dateDebut} idDate="datePickerDebut" nomDate="datePickerDebut"/>
      </span>
      <span id="span-datePickerFin" >
        &nbsp;au&nbsp;
        <ElementDatePicker initDate={props.dateFin} idDate="datePickerFin" nomDate="datePickerFin"/>
      </span>
    </>
  );
}

StatistiquesPeriode.propTypes = {
  dateDebut: PropTypes.instanceOf(Date),
  dateFin: PropTypes.instanceOf(Date),
};


export default StatistiquesPeriode;
