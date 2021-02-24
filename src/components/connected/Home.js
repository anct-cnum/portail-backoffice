import React from 'react';
import { useSelector } from 'react-redux';
import Admin from './admin/index';
import Structure from './structure/index';

function Home() {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <>

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
