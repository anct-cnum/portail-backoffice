import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Menu from './Menu';
import Conseillers from './Conseillers';
import Informations from './Informations';

function Structure() {
  const structure = useSelector(state => state.structure);

  return (
    <div className="structure">
      <div className="rf-m-1w rf-mb-4w">
        <h3>Espace structure - {structure?.nom}</h3>
        <div class="rf-highlight">SIRET: {structure?.siret}</div>
      </div>
      <div class="rf-container-fluid">
        <div class="rf-grid-row">
          <div class="rf-col-2">
            <Menu />
          </div>
          <div class="rf-col-xs-12 rf-col-lg-10">
            <Route path={`/structure/informations`} component={Informations} />
            <Redirect from="/structure/conseillers" to={`/structure/conseillers/nouvelle`} />
            <Route path={`/structure/conseillers/:filter`} component={Conseillers} />

          </div>
        </div>
      </div>



    </div>
  );
}

export default Structure;
