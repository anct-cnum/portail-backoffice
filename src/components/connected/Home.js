import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom';

import Admin from './admin/index';
import Structure from './structure/index';

function Home({ match }) {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <>

      <div class="rf-container rf-mt-4w">
        <div class="rf-grid-row">
          <div class="rf-col-4 rf-col-offset-12">

            <div class="rf-tile rf-tile--horizontal">
              <div class="rf-tile__body">
                <h3 class="rf-tile__title">
                  <span className="rf-fi-user-fill"></span> {user?.name}
                </h3>
                <Link className="rf-btn rf-mt-1w rf-btn--icon-right rf-fi-arrow-right-line" to="/login">Se déconnecter</Link>
              </div>
            </div>


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
