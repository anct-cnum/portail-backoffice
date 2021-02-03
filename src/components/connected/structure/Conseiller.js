import dayjs from 'dayjs';

import { useDispatch } from 'react-redux';

import { conseillerActions } from '../../../actions';

function Conseiller({ conseiller, miseEnRelationId, update }) {
  const dispatch = useDispatch();

  const updateStatut = statut => {
    dispatch(conseillerActions.updateStatus({ id: miseEnRelationId, statut }));
    setTimeout(() => {
      update();
    }, 500);
  }

  return (
    <div className="conseiller rf-card rf-card--horizontal">
      <div className="rf-card__body">
        <p className="rf-card__detail">Conseiller</p>
        <h4 className="rf-card__title">
          {conseiller.prenom} {conseiller.nom}
        </h4>
        <p className="rf-card__desc">
          <span>Candidature du {dayjs(conseiller.dateCreation).format('DD/MM/YYYY')}</span>
          <span>Code postal: {conseiller.codePostal}</span>

          <button onClick={updateStatut.bind(this, 'acceptee')} className="rf-btn rf-fi-checkbox-line rf-btn--icon-left" title="ça m'intéresse">
            ça m'intéresse
          </button>

          <button onClick={updateStatut.bind(this, 'refusee')} className="rf-btn rf-fi-close-circle-line rf-btn--icon-left rf-btn--secondary" title="ça ne m'intéresse pas">
            ça ne m'intéresse pas
          </button>
        </p>
      </div>
    </div>
  );
}

export default Conseiller;
