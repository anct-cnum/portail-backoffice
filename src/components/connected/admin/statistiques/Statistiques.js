import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StructureListStats from './StructureListStats';
import { statistiquesPrefetActions } from '../../../../actions';
import Pagination from '../../../common/Pagination';
import FilterDateBox from '../../../common/FilterDateBox';

function Statistiques() {
  const dispatch = useDispatch();

  const structures = useSelector(state => state.structures);
  const statistiquesStructures = useSelector(state => state.statistiquesPrefet?.statistiquesStructures);
  const dateFinStats = useSelector(state => state.filterDate?.filterDateEnd);
  const dateDebutStats = useSelector(state => state.filterDate?.filterDateStart);
  const pagination = useSelector(state => state.pagination);

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const navigate = page => {
    setPage(page);
    dispatch(statistiquesPrefetActions.getStatsStructures(dateDebutStats, dateFinStats, page));
  };

  useEffect(() => {
    if (statistiquesStructures?.items) {
      const count = statistiquesStructures.items.limit ? Math.floor(statistiquesStructures.items.total / statistiquesStructures.items.limit) : 0;
      setPageCount(statistiquesStructures.items.total % statistiquesStructures.items.limit === 0 ? count : count + 1);
    }
  }, [statistiquesStructures]);

  const update = () => {
    if (pagination?.resetPage === false && location.currentPage !== undefined) {
      navigate(page);
    } else {
      dispatch(statistiquesPrefetActions.getStatsStructures(dateDebutStats, dateFinStats, page));
    }
  };

  useEffect(() => {
    if (!statistiquesStructures) {
      update();
    }
  });

  return (
    <div className="statistiques">
      <h3>Statistiques des structures</h3><FilterDateBox />
      <div className="fr-container fr-container--fluid">
        <div className="fr-grid-row fr-grid-row--end">
          <div className="fr-table">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Siret</th>
                  <th>Nom de la structure</th>
                  <th>Code postal</th>
                  <th>CRA enregistr&eacute;s</th>
                  <th>Personnes accompagn&eacute;es</th>
                  <th>Afficher</th>
                </tr>
              </thead>
              <tbody>
                {!structures.error && !structures.loading && statistiquesStructures?.items && statistiquesStructures?.items?.data.map((structure, idx) => {
                  return (<StructureListStats key={idx} structure={structure} />);
                })
                }
              </tbody>
            </table>
          </div>

          <Pagination current={page} pageCount={pageCount} navigate={navigate} />
        </div>
      </div>
    </div>
  );
}

export default Statistiques;
