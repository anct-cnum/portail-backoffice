import dayjs from 'dayjs';
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { conseillerActions } from '../../../actions';

function CandidatRecrute({ candidat, currentPage }) {

  const dispatch = useDispatch();

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(candidat?._id, candidat));
  };

  return (
    <tr className="conseiller">
      <td>{candidat?.prenom}</td>
      <td>{candidat?.nom}</td>
      <td>{dayjs(candidat?.createdAt).format('DD/MM/YYYY')}</td>
      <td>{candidat?.codePostal}</td>
      <td>
        { candidat?.pix?.partage &&
          <div className="tooltip">
            <img src="/logos/logo-pix.svg" alt="logo Pix" style={{ height: '36px' }}/>
            <span className="tooltiptext">A partagé ses résultats Pix</span>
          </div>
        }
      </td>
      <td>
        {candidat?.cv?.file &&
        <button className="downloadCVBtn" onClick={downloadCV}>
          <img src="/logos/icone-telecharger.svg" alt="Télécharger le CV" style={{ height: '26px' }}/>
        </button>
        }
        {!candidat?.cv?.file &&
          <></>
        }
      </td>
      <td>
        <Link className="rf-btn rf-fi-eye-line rf-btn--icon-left" style={{ boxShadow: 'none' }} to={{
          pathname: `/candidat/${candidat?._id}`,
          currentPage: currentPage }}>
            Détails
        </Link>
      </td>
    </tr>
  );
}

CandidatRecrute.propTypes = {
  candidat: PropTypes.object,
  currentPage: PropTypes.number,
};

export default CandidatRecrute;
