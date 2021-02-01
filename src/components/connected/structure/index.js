import { Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Menu from './Menu';
import Conseillers from './Conseillers';
import Informations from './Informations';
import { conseillerActions } from '../../../actions';

function Structure({ match }) {

  const dispatch = useDispatch();

  const user = useSelector(state => state.authentication.user.user);

  useEffect(() => {
    dispatch(conseillerActions.getAll()); // TODO filter on user
  }, []);

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
