import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { statistiquesPrefetActions, structureActions } from '../../../../actions';
import Spinner from 'react-loader-spinner';
import FlashMessage from 'react-flash-message';

import ElementCodePostal from './Components/ElementCodePostal';
import StatistiquesBanniere from './StatistiquesBanniere';
import StatistiquesPeriode from './StatistiquesPeriode';
import BottomPage from './BottomPage';
import RightPage from './RightPage';
import LeftPage from './LeftPage';


function StatistiquesStructure() {
  const dispatch = useDispatch();
  let { id } = useParams();

  const statsDataLoading = useSelector(state => state.statistique?.statsDataLoading);
  const loadingCSV = useSelector(state => state.conseiller?.loadingCSV);
  const errorCSV = useSelector(state => state.conseiller?.errorCSV);
  const loadingPDF = useSelector(state => state.conseiller?.loadingPDF);
  const errorPDF = useSelector(state => state.conseiller?.errorPDF);
  const isPDFDownloaded = useSelector(state => state.conseiller?.statistiquesPDF);

  const codePostalStats = useSelector(state => state.statistiquesPrefet?.codePostalStats);
  const donneesStatistiques = useSelector(state => state.statistiquesPrefet?.statsData);
  const dateDebutStats = useSelector(state => state.statistiquesPrefet?.dateDebutStats);
  const dateFinStats = useSelector(state => state.statistiquesPrefet?.dateFinStats);
  const structure = useSelector(state => state.structure?.structure);

  useEffect(() => {
    if (structure === undefined) {
      dispatch(structureActions.get(id));
    }
  }, []);

  useEffect(() => {
    if (structure !== undefined && codePostalStats === '') {
      dispatch(statistiquesPrefetActions.getCodesPostauxCrasConseillerStructure(structure?._id));
    }
    if (structure !== undefined) {
      dispatch(statistiquesPrefetActions.getStatsCraStructure(dateDebutStats, dateFinStats, structure?._id, codePostalStats));
    }
  }, [dateDebutStats, dateFinStats, codePostalStats, structure]);

  return (
    <div className="statistics">
      <div className="fr-container">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <div className="spinnerCustom">
              <Spinner
                type="Oval"
                color="#00BFFF"
                height={100}
                width={100}
                visible={statsDataLoading === true || loadingPDF === true || structure === undefined || loadingCSV === true}
              />
            </div>

            {isPDFDownloaded === false &&
              <FlashMessage duration={5000}>
                <p className="flashBag invalid">
                  Vos statistiques n&rsquo;ont pas pu &ecirc;tre t&eacute;l&eacute;charg&eacute;es, veuillez r&eacute;essayer !
                </p>
              </FlashMessage>
            }
            {errorPDF &&
              <FlashMessage duration={5000}>
                <p className="flashBag invalid">
                  {errorPDF}
                </p>
              </FlashMessage>
            }
            {errorCSV &&
              <FlashMessage duration={5000}>
                <p className="flashBag invalid">
                  {errorCSV}
                </p>
              </FlashMessage>
            }

            <div className="fr-mt-2w"></div>
            <h3 className="title">Statistiques</h3>
            <div className="fr-mb-5w fr-mt-md-4w"></div>
          </div>
        </div>

        <div className="fr-grid-row">
          <div className="fr-col-5">
            <div className="fr-mb-md-6w">
              <StatistiquesPeriode dateDebut={dateDebutStats} dateFin={dateFinStats} />
            </div>
          </div>
          <div className="fr-col-6">
            {structure !== undefined &&
              <ElementCodePostal idStructure={structure._id} />
            }
          </div>

          {donneesStatistiques !== undefined &&
            <div className="fr-grid-row">
              <LeftPage donneesStats={donneesStatistiques} print={false} />
              <div className="fr-col-offset-md-1"></div>
              <RightPage donneesStats={donneesStatistiques} print={false} />
              <BottomPage donneesStats={donneesStatistiques} print={false} />
              <StatistiquesBanniere
                dateDebut={dateDebutStats}
                dateFin={dateFinStats}
                codePostal={codePostalStats}
                idStructure={structure?._id}
                typeStats={'structure'}
              />
              <div className="fr-m-5w fr-m-md-9w"></div>
            </div>
          }
          {!donneesStatistiques &&
            <h2 className="centrerTexte">Il n&rsquo;y a aucune statistique pour le moment</h2>
          }
        </div>

      </div>
    </div>
  );
}

export default StatistiquesStructure;
