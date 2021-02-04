import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom';

import Admin from './admin/index';
import Structure from './structure/index';

function Home({ match }) {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <>

      <div class="rf-container">
        <div class="rf-grid-row">
          <div class="rf-col-4 rf-col-offset-12">
            <h3><span className="rf-fi-user-fill"></span> {user?.name}</h3>
            <Link className="rf-btn rf-btn--icon-right rf-fi-arrow-right-line" to="/login">Se déconnecter</Link>

          </div>
        </div>
      </div>

      { user?.role === 'admin' &&
        <Admin />
      }

      { user?.role === 'structure' &&
        <Route path={`/structure`} component={Structure} />
      }
    </>
  );
}

export default Home;
