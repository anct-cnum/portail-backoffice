import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../../actions';
import { useEffect } from 'react';
import dayjs from 'dayjs';

function ConseillerDetails({ location }) {

  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller);

  useEffect(() => {
    dispatch(conseillerActions.get(location.conseillerId));
  }, []);

  return (
    <div className="ConseillerDetails">
      <div>
          <h2>Informations du conseiller</h2>
          <p>Nom : {conseiller?.details?.Nom}</p>
          <p>Prénom : {conseiller?.details?.prenom}</p>
          <p>Situation professionnelle : {conseiller?.details?.Nom}</p>
          <p>Lieu de résidence : {conseiller?.details?.geo_name}</p>
          <p>Distance de déplacement : {conseiller?.details?.max_distance}</p>
          <p>Date de démarrage possible : { dayjs(conseiller?.details?.start_date).format('DD/MM/YYYY') }</p>
          <p>Email : {conseiller?.details?.email}</p>
      </div>
    </div>
  );
}

export default ConseillerDetails;
