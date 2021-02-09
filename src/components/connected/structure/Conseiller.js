import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { conseillerActions } from '../../../actions';
import { Link } from "react-router-dom";

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
  <Link style={{boxShadow:"none"}} to={{
        pathname:'/structure/conseiller/details',
        conseillerId: conseiller._id }}>
    <div className="conseiller rf-card rf-card--horizontal">
      <div className="rf-card__body">
        <p className="rf-card__detail">Conseiller - {statutLabel.find(item => item.key === statut).label}</p>
        <h4 className="rf-card__title">
          {conseiller.prenom} {conseiller.nom}
        </h4>
        <div className="rf-card__desc">

          <div className="rf-container-fluid">
            <div className="rf-grid-row">
              <div className="rf-col-4"><span>Candidature du {dayjs(conseiller.dateCreation).format('DD/MM/YYYY')}</span></div>
              <div className="rf-col-lg-4">
                {statut !== 'acceptee' &&
                  <button onClick={updateStatut.bind(this, 'acceptee')} className="rf-btn rf-mx-1w rf-fi-checkbox-line rf-btn--icon-left" title="ça m'intéresse">
                    ça m&apos;intéresse
                  </button>
                }
                {statut !== 'refusee' &&
                  <button onClick={updateStatut.bind(this, 'refusee')} className="rf-btn rf-mx-1w rf-fi-close-circle-line rf-btn--icon-left rf-btn--secondary" title="ça ne m'intéresse pas">
                    ça ne m&apos;intéresse pas
                  </button>
                }
              </div>
            </div>
            <div className="rf-grid-row">
              <div className="rf-col-4"><strong>Code postal:</strong> {conseiller.codePostal}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
  );
}

Conseiller.propTypes = {
  conseiller: PropTypes.object,
  miseEnRelationId: PropTypes.string,
  statut: PropTypes.string,
  update: PropTypes.func
}

export default Conseiller;
