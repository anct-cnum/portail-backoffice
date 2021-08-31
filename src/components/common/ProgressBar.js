import React from 'react';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';

function ProgressBar(props) {
  const { completed, candidatsRecrutes, dotations } = props;

  const fillerStyles = {
    width: `${completed}%`,
    borderTopRightRadius: completed > 95 ? '20px' : '',
    borderBottomRightRadius: completed > 95 ? '20px' : '',
  };

  return (
    <>
      <div className="barre-total">
        <div className="barre-progression" style={fillerStyles}>
          <div className="barre-label">{`${completed}%`}</div>
        </div>
      </div>
      <span className="nombre-recrutes"><b>{`${candidatsRecrutes}`}/{`${dotations}`}</b>&nbsp;
        <Pluralize
          zero={'candidat recruté.'}
          singular={'candidat recruté.'}
          plural={'candidats recrutés.'}
          count={candidatsRecrutes}
          showCount={false}
        />
      </span>
    </>
  );
}

ProgressBar.propTypes = {
  completed: PropTypes.number,
  candidatsRecrutes: PropTypes.number,
  dotations: PropTypes.number
};

export default ProgressBar;
