import dayjs from 'dayjs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../../actions';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ConseillerNonMisEnRelation({ conseiller, search, update }) {

  const structure = useSelector(state => state.structure);
  const conseillerMisEnRelation = useSelector(state => state.conseiller);
  const dispatch = useDispatch();

  const select = () => {
    update();
    dispatch(conseillerActions.preSelectionner({ conseillerId: conseiller._id, structureId: structure?.structure._id }));
  };

  return (
    <tr className="conseiller">
      <td>{conseiller.prenom}</td>
      <td>{conseiller.nom}</td>
      { search && <td>{conseiller.email}</td>}
      <td>Non mis en relation</td>
      <td>{dayjs(conseiller.createdAt).format('DD/MM/YYYY')}</td>
      <td>{conseiller.codePostal}</td>
      { !search && <td>
        { conseiller?.pix?.partage &&
          <div className="tooltip">
            <img src="/logos/logo-pix.svg" alt="logo Pix" style={{ height: '36px' }}/>
            <span className="tooltiptext">A partagé ses résultats Pix</span>
          </div>
        }
      </td> }
      <td className="td-preselection">
        <Link className="rf-btn rf-mx-1w rf-fi-checkbox-line rf-btn--icon-left" style={{ boxShadow: 'none' }}
          onClick={select}
          to={{ pathname: `/structure/candidat/${conseiller._id}`,
            miseEnRelation: conseillerMisEnRelation?.miseEnRelation,
            currentPage: 1, currentFilter: 'interessee' }
          }
        >
            Pré sélectionner
        </Link>

      </td>
    </tr>
  );
}

ConseillerNonMisEnRelation.propTypes = {
  conseiller: PropTypes.object,
  search: PropTypes.bool,
  update: PropTypes.func
};

export default ConseillerNonMisEnRelation;
