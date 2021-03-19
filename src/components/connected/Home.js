import React from 'react';
import { useSelector } from 'react-redux';
import Admin from './admin/index';
import Structure from './structure/index';

function Home() {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <>
      { (user?.role === 'admin' || user?.role === 'prefet') &&
        <Admin role={user.role} />
      }

      { user?.role === 'structure' &&
        <Structure />
      }
    </>
  );
}

export default Home;
