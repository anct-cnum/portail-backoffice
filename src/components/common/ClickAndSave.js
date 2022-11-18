import React from 'react';
import PropTypes from 'prop-types';

export default function ClickAndSave({ field }) {

  const handleSave = e => {
    navigator.clipboard.writeText(e.target.textContent);
    document.getElementById('copie-check').classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('copie-check').classList.add('hidden');
    }, 1000);
  };

  return (
    <span className="copier" onClick={handleSave}>
      {field}&nbsp;<i id="copie-check" className="ri-check-line copie-check hidden"></i>
    </span>
  );
}

ClickAndSave.propTypes = {
  field: PropTypes.number,
};

