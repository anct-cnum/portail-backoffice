import React from 'react';
import { Route } from 'react-router-dom';

import Menu from './Menu';
import Structures from './Structures';

function Admin() {
  return (
    <div className="admin">
      <div className="rf-m-1w rf-mb-4w rf-ml-4w">
        <h3>Espace préfet</h3>
      </div>
      <div className="rf-container-fluid">
        <div className="rf-grid-row">
          <div className="rf-col-3">
            <Menu />
          </div>
          <div className="rf-col-9">
            <Route path={`/structures`} component={Structures} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
