//import { useHistory } from 'react-router-dom';
import { history } from '../../../helpers';

function Menu() {

  //let history = useHistory();

  return (
    <div className="Menu">
      <button onClick={() => history.push('/structure/conseillers')}>Mes conseillers</button>
      <button onClick={() => history.push('/structure/informations')}>Mes informations</button>
    </div>
  );
}

export default Menu;
