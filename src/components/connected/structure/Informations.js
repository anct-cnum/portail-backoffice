import { useSelector } from 'react-redux'

function Informations() {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <div className="informations">

    </div>
  );
}

export default Informations;
