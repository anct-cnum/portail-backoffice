import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { conseillerActions } from '../../../actions';
import ClickAndSave from '../../common/ClickAndSave';

function Conseiller({ conseiller, currentPage }) {

  const dispatch = useDispatch();

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(conseiller?._id, conseiller));
  };

  return (
    <tr className="conseiller">
      <td><ClickAndSave field={conseiller?.idPG}/></td>
      <td>{conseiller?.prenom}</td>
      <td>{conseiller?.nom}</td>
      <td>{dayjs(conseiller?.createdAt).format('DD/MM/YYYY')}</td>
      <td>{conseiller?.codePostal}</td>
      <td>
        { conseiller?.pix?.partage &&
          <div className="tooltip">
            <img src="/logos/logo-pix.svg" alt="logo Pix" style={{ height: '36px' }}/>
            <span className="tooltiptext">A partagé ses résultats Pix</span>
          </div>
        }
      </td>
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
      <td>
        <Link className="fr-btn fr-btn--icon-left" style={{ boxShadow: 'none' }} to={{
          pathname: `/candidat/${conseiller?._id}`,
          currentPage: currentPage,
          origin: '/candidats' }}><i className="ri-eye-line"></i>&nbsp;Détails
        </Link>
      </td>
    </tr>
  );
}

Conseiller.propTypes = {
  conseiller: PropTypes.object,
  currentPage: PropTypes.number,
};

export default Conseiller;
