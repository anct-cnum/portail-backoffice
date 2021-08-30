import React from 'react';
import { useSelector } from 'react-redux';
import ProgressBar from '../../common/ProgressBar';

function Recrutements() {
  const stats = useSelector(state => state.stats?.stats);
  const structure = useSelector(state => state.structure);
  const nombreConseillersCoselec = structure?.structure?.dernierCoselec?.nombreConseillersCoselec;
  const nombreConseillersFinalise = stats['finalisee'] ? stats['finalisee'] : 0;
  const pourcentage = nombreConseillersCoselec > 0 ? nombreConseillersFinalise * 100 / nombreConseillersCoselec : 0;
  console.log(stats);
  return (
    <div className="recrutements">
      <div className="rf-container-fluid">
        <div className="rf-grid-row">
          <div className="rf-col-4">
            <h4 className="titre-etat-recrutements">États de vos recrutements</h4>
          </div>
          <div className="rf-col-8">
            <h4 className="titre-etat-recrutements">Avancement total du recrutement au sein de votre structure :</h4>
          </div>
          <div className="rf-col-4">
            <ul className="">
              <li><b>{nombreConseillersCoselec}</b>&nbsp;CnFS attendu(s) dans votre structure</li>
              <li><b>{stats['interessee'] ? stats['interessee'] : 0 }</b>&nbsp;candidature(s) préselectionnée(s)</li>
              <li><b>{stats['recrutee'] ? stats['recrutee'] : 0 }</b>&nbsp;candidature(s) validée(s) </li>
              <li><b>{nombreConseillersFinalise}</b>&nbsp;candidat recruté(s).</li>
            </ul>
          </div>
          <div className="rf-col-8">
            <ProgressBar completed={pourcentage} candidatsRecrutes={1} dotations={nombreConseillersCoselec} />

          </div>
          <div className="rf-col-12">
            <h4 className="titre-etat-recrutements">Candidats recrutés</h4>
          </div>
          <div className="rf-col-12">
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
