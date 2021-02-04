import dayjs from 'dayjs';

import { useDispatch } from 'react-redux';

import { conseillerActions } from '../../../actions';

function Conseiller({ conseiller, miseEnRelationId, statut, update }) {
  const dispatch = useDispatch();

  const statutLabel = [{
    key: 'nouvelle',
    label: 'Nouvelle candidature'
  }, {
    key: 'refusee',
    label: 'Candidature refusée'
  }, {
    key: 'acceptee',
    label: 'Candidature acceptée'
  },
  ]

  const updateStatut = statut => {
    dispatch(conseillerActions.updateStatus({ id: miseEnRelationId, statut }));
    setTimeout(() => {
      update();
    }, 500);
  }

  return (
    <div className="conseiller rf-card rf-card--horizontal">
      <div className="rf-card__body">
        <p className="rf-card__detail">Conseiller - {statutLabel.find(item => item.key === statut).label}</p>
        <h4 className="rf-card__title">
          {conseiller.prenom} {conseiller.nom}
        </h4>
        <p className="rf-card__desc">

          <div class="rf-container-fluid">
            <div class="rf-grid-row">
              <div class="rf-col-4"><span>Candidature du {dayjs(conseiller.dateCreation).format('DD/MM/YYYY')}</span></div>
              <div class="rf-col-lg-4">
                {statut !== 'acceptee' &&
                  <button onClick={updateStatut.bind(this, 'acceptee')} className="rf-btn rf-mx-1w rf-fi-checkbox-line rf-btn--icon-left" title="ça m'intéresse">
                    ça m'intéresse
                  </button>
                }
                {statut !== 'refusee' &&
                  <button onClick={updateStatut.bind(this, 'refusee')} className="rf-btn rf-mx-1w rf-fi-close-circle-line rf-btn--icon-left rf-btn--secondary" title="ça ne m'intéresse pas">
                    ça ne m'intéresse pas
                  </button>
                }
              </div>
            </div>
            <div class="rf-grid-row">
              <div class="rf-col-4"><strong>Code postal:</strong> {conseiller.codePostal}</div>
            </div>
          </div>
        </p>
      </div>
    </div>
  );
}

export default Conseiller;
