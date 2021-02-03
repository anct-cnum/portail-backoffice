import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom';

import Admin from './admin/index';
import Structure from './structure/index';

function Home({ match }) {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <div className="Login">
      <h3><span className="rf-fi-user-fill"></span> {user?.name}</h3>
      <Link className="rf-btn rf-btn--icon-right rf-fi-arrow-right-line" to="/login">Se déconnecter</Link>

      { user?.role === 'admin' &&
        <Admin />
      }

      { user?.role === 'structure' &&
        <Route path={`/structure`} component={Structure} />
      }
    </div>
  );
}

export default Home;
