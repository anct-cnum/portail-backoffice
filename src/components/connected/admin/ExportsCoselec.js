import React from 'react';

import { exportsService } from '../../../services/exports.service';

function Stats() {

  const getFile = async name => {
    try {
      const blob = await exportsService.getFile(name);
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'text/plain' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${name}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.log('err:', err);
    }
  };


  return (
    <div className="exportsCoselec">
      <div className="rf-container-fluid">
        <div className="rf-grid-row">
          <h1>
            Exports
          </h1>
        </div>
        <ul>
          <li><a href="#" onClick={() => getFile('candidats')}>Fichier « Je recrute »</a></li>
          <li><a href="#" onClick={() => getFile('structures')}>Fichier « structures »</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Stats;
