import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

import Admin from './admin/index';
import Structure from './structure/index';

function Home() {
  const user = useSelector(state => state.authentication.user.user);
  console.log(user)
  return (
    <div className="Login">
      <h2>Mon portail</h2>
      <h3>{user?.name}</h3>
      <Link to="/login">Se déconnecter</Link>

      { user?.role === 'admin' &&
        <Admin />
      }

      { user?.role === 'structure' &&
        <Structure />
      }
    </div>
  );
}

export default Home;
