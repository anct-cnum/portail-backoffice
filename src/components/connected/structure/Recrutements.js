import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { conseillerActions, statsActions } from '../../../actions';
import ProgressBar from '../../common/ProgressBar';

function Recrutements() {
  const dispatch = useDispatch();
  const stats = useSelector(state => state.stats);
  const structure = useSelector(state => state.structure);
  const conseillers = useSelector(state => state.conseillers);

  const nombreConseillersCoselec = structure?.structure?.dernierCoselec?.nombreConseillersCoselec;
  const nombreConseillersFinalise = stats?.stats?.finalisee ?? 0;
  const pourcentage = nombreConseillersCoselec > 0 ? nombreConseillersFinalise * 100 / nombreConseillersCoselec : 0;

  useEffect(() => {
    dispatch(statsActions.getMisesEnRelationStats());
    dispatch(conseillerActions.getAll({
      misesEnRelation: true,
      page: 0,
      filter: 'finalisee'
    }));
  }, []);

  return (
    <div className="recrutements">
      <div className="rf-container-fluid">
        <div className="rf-grid-row">
          <div className="rf-col-4">
            <h4 className="titre-recrutements">États de vos recrutements</h4>
          </div>
          <div className="rf-col-8">
            <h4 className="titre-avancement">Avancement total du recrutement au sein de votre structure :</h4>
          </div>
          <div className="rf-col-4">
            <ul className="liste-stats rf-mb-4w">
              <li><b>{nombreConseillersCoselec}</b>&nbsp;CnFS attendu(s) dans votre structure</li>
              <li><b>{stats?.stats?.interessee ?? '0'}</b>&nbsp;candidature(s) préselectionnée(s)</li>
              <li><b>{stats?.stats?.recrutee ?? '0'}</b>&nbsp;candidature(s) validée(s) </li>
              <li><b>{nombreConseillersFinalise}</b>&nbsp;candidat recruté(s).</li>
            </ul>
          </div>
          <div className="rf-col-8">
            <ProgressBar completed={pourcentage} candidatsRecrutes={nombreConseillersFinalise} dotations={nombreConseillersCoselec} />

          </div>
          <div className="rf-col-12">
            <h4 className="titre-etat-recrutements">Candidats recrutés</h4>
          </div>
          <div className="rf-col-11">
            <div className="rf-table">
              <table >
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Date d&rsquo;embauche</th>
                    <th>Date d&rsquo;entrée en formation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {!conseillers.error && !conseillers.loading && conseillers.items && conseillers.items.data.map((miseEnRelation, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{miseEnRelation.conseillerObj.nom}</td>
                        <td>{miseEnRelation.conseillerObj.prenom}</td>
                        <td>{miseEnRelation.dateRecrutement ? dayjs(miseEnRelation.dateRecrutement).format('DD/MM/YY') : '-'}</td>
                        <td>{miseEnRelation.conseillerObj.datePrisePoste ? dayjs(miseEnRelation.conseillerObj.datePrisePoste).format('DD/MM/YY') : '-'}</td>
                        <td>
                          <Link className="rf-btn rf-fi-eye-line rf-btn--icon-left" style={{ boxShadow: 'none' }}
                            to={{ pathname: `/structure/candidat/${miseEnRelation.conseillerObj._id}`, currentPage: 0, origin: `/structure/recrutements` }}>
                              Détails
                          </Link>
                        </td>
                      </tr>);
                  })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recrutements;
