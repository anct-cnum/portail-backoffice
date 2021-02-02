import { history } from '../../../helpers';

function Menu() {

  return (
    <div className="Menu">
      <button onClick={() => history.push('/structure/conseillers')}>Mes conseillers</button>
      <button onClick={() => history.push('/structure/informations')}>Mes informations</button>
    </div>
  );
}

export default Menu;
