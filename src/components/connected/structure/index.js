import { Route, Redirect } from 'react-router-dom';

import Menu from './Menu';
import Conseillers from './Conseillers';
import Informations from './Informations';

function Structure({ match }) {

  return (
    <div className="structure">
      <h3>Portail structure</h3>

      <Menu />

      <Route path={`/structure/informations`} component={Informations} />
      <Route path={`/structure/conseillers`} component={Conseillers} />
      <Redirect from="*" to={`/structure/conseillers`} />
    </div>
  );
}

export default Structure;
