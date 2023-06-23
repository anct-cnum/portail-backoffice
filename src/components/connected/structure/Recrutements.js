import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { conseillerActions, statsActions } from '../../../actions';
import ClickAndSave from '../../common/ClickAndSave';
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
      <div className="fr-container--fluid">
        <div className="fr-grid-row">
          <div className="fr-col-6">
            <h4 className="titre-recrutements">États de vos recrutements</h4>
          </div>
          <div className="fr-col-6">
            <h4 className="titre-avancement">Avancement total du recrutement au sein de votre structure :</h4>
          </div>
          <div className="fr-col-6">
            <ul className="liste-stats fr-mb-4w">
              <li><b>{nombreConseillersCoselec}</b>&nbsp;CnFS attendu(s) dans votre structure</li>
              <li><b>{stats?.stats?.interessee ?? '0'}</b>&nbsp;candidature(s) pr&eacute;selectionn&eacute;e(s)</li>
              <li><b>{stats?.stats?.recrutee ?? '0'}</b>&nbsp;candidature(s) valid&eacute;e(s) </li>
              <li><b>{nombreConseillersFinalise}</b>&nbsp;candidat(s) recrut&eacute;(s).</li>
            </ul>
          </div>
          <div className="fr-col-6">
            <ProgressBar completed={pourcentage} candidatsRecrutes={nombreConseillersFinalise} dotations={nombreConseillersCoselec} />

          </div>
          <div className="fr-col-12">
            <h4 className="titre-etat-recrutements">Candidats recrut&eacute;s</h4>
          </div>
          <div className="fr-col-12">
            {!conseillers.error && !conseillers.loading && conseillers.items?.total > 0 &&
            <div className="fr-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Pr&eacute;nom</th>
                    <th>Date d&rsquo;embauche</th>
                    <th>Date d&rsquo;entr&eacute;e en formation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {!conseillers.error && !conseillers.loading && conseillers.items && conseillers.items.data.map((miseEnRelation, idx) => {
                    return (
                      <tr key={idx}>
                        <td><ClickAndSave field={miseEnRelation.conseillerObj?.idPG}/></td>
                        <td>{miseEnRelation.conseillerObj.nom}</td>
                        <td>{miseEnRelation.conseillerObj.prenom}</td>
                        <td>{miseEnRelation.dateRecrutement ? dayjs(miseEnRelation.dateRecrutement).format('DD/MM/YY') : '-'}</td>
                        <td>{miseEnRelation.conseillerObj.datePrisePoste ? dayjs(miseEnRelation.conseillerObj.datePrisePoste).format('DD/MM/YY') : '-'}</td>
                        <td>
                          <Link className="fr-btn fr-btn--icon-left" style={{ boxShadow: 'none' }}
                            to={{ pathname: `/structure/candidat/${miseEnRelation.conseillerObj._id}`, currentPage: 0, origin: `/structure/recrutements` }}>
                            <i className="ri-eye-line"></i>&nbsp;D&eacute;tails
                          </Link>
                        </td>
                      </tr>);
                  })
                  }
                </tbody>
              </table>
            </div>
            }
            {!conseillers.error && !conseillers.loading && conseillers.items?.total === 0 &&
              <p>Vous n&rsquo;avez pas encore effectu&eacute; de recrutement.</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recrutements;
