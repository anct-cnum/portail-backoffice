import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../../actions';
import { history } from '../../../helpers';
import PropTypes from 'prop-types';

function ConseillerNonMisEnRelation({ conseiller, search, update }) {

  const structure = useSelector(state => state.structure);
  const conseillerMisEnRelation = useSelector(state => state?.conseiller?.misEnRelation?.misEnRelation);

  const dispatch = useDispatch();

  const select = () => {
    update();
    dispatch(conseillerActions.preSelectionner({ conseillerId: conseiller._id, structureId: structure?.structure._id }));
  };

  useEffect(() => {
    if (conseillerMisEnRelation !== undefined && conseillerMisEnRelation?.conseillerObj?._id === conseiller._id) {
      history.push(
        {
          pathname: `/structure/candidat/${conseiller._id}`,
          miseEnRelation: conseillerMisEnRelation,
          currentPage: 1,
          currentFilter: 'interessee'
        }
      );
    }
  }, [conseillerMisEnRelation, conseiller]);

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(conseiller?._id, conseiller));
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
      <td>
        {conseiller?.cv?.file &&
        <button className="downloadCVBtn" onClick={downloadCV}>
          <img src="/logos/icone-telecharger.svg" alt="Télécharger le CV" style={{ height: '26px' }}/>
        </button>
        }
        {!conseiller?.cv?.file &&
          <></>
        }
      </td>
      <td className="td-preselection">
        <button className="rf-btn rf-mx-1w rf-fi-checkbox-line rf-btn--icon-left"
          style={{ boxShadow: 'none' }}
          onClick={select} >
          Pré sélectionner
        </button>
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
