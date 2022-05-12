import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import StructureListStats from './StructureListStats';

function Statistiques() {
  const structures = useSelector(state => state.structures);

  let location = useLocation();
  const pagination = useSelector(state => state.pagination);
  let [page, setPage] = (pagination?.resetPage === false && location.currentPage !== undefined) ? useState(location.currentPage) : useState(1);

  return (
    <div className="statistiques">
      <h3>Statistiques des structures</h3>
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
                {!structures.error && !structures.loading && structures.items && structures.items.data.map((structure, idx) => {
                  return (<StructureListStats key={idx} structure={structure} currentPage={page} />);
                })
                }
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Statistiques;
