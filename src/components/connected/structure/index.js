import { Route, Redirect } from 'react-router-dom';

import Menu from './Menu';
import Conseillers from './Conseillers';
import Informations from './Informations';

function Structure({ match }) {

  return (
    <div className="structure">
      <h3>Portail structure</h3>
      <div class="rf-container-fluid">
  <div class="rf-grid-row">
    <div class="rf-col-2">
    <Menu />
    </div>
    <div class="rf-col-xs-12 rf-col-lg-10">
    <Route path={`/structure/informations`} component={Informations} />
      <Route path={`/structure/conseillers`} component={Conseillers} />
      <Redirect from="*" to={`/structure/conseillers`} />
    </div>
  </div>
</div>



    </div>
  );
}

export default Structure;
