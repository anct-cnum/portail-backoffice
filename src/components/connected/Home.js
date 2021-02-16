import React from 'react';

import { Link, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Admin from './admin/index';
import Structure from './structure/index';

function Home() {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <>

      <div className="rf-container-fluid rf-mt-4w">
        <div className="rf-grid-row rf-grid-row--end">
          <div className="rf-col-3 rf-mr-2w">
            <div className="rf-tile rf-tile--horizontal">
              <div className="rf-tile__body">
                <h3 className="rf-tile__title">
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
        <Structure />
      }

    </>
  );
}

export default Home;
