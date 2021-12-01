import React from 'react';
import { isAscending, toggleSort, Order } from './Sort.presenter';
import PropTypes from 'prop-types';

const handleSort = ({ onSort, field, sort }) => () => onSort(toggleSort(field, sort));

export const Sort = props => (
  <button className="filtre-btn" onClick={handleSort(props)}>
    <span id={props.field}>
      {props.children}
      {isAscending(props.field, props.sort) ?
        <i className="ri-arrow-up-s-line chevron icone"/> :
        <i className="ri-arrow-down-s-line chevron icone"/>
      }
    </span>
  </button>
);

Sort.propTypes = {
  field: PropTypes.string.isRequired,
  sort: PropTypes.exact({
    field: PropTypes.string.isRequired,
    order: PropTypes.oneOf([Order.Ascending, Order.Descending]).isRequired
  }).isRequired,
  onSort: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
