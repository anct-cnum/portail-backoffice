import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Conseiller from './Conseiller';
import { conseillerActions, statsActions } from '../../../actions';
import Pagination from '../../common/Pagination';
import {
  Link,
  useParams
} from "react-router-dom";

function Conseillers() {
  const dispatch = useDispatch();

  const conseillers = useSelector(state => state.conseillers);
  const stats = useSelector(state => state.stats);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  let { filter } = useParams();

  const navigate = (page) => {
    setPage(page);
    dispatch(conseillerActions.getAll({ page, filter: filter }));
  }

  useEffect(() => {
    if (conseillers.items) {
      const count = Math.floor(conseillers.items.total / conseillers.items.limit);
      setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1);
    }
  }, [conseillers]);

  useEffect(() => {
    update();
    }, [ filter ]);

  const update = () => dispatch(conseillerActions.getAll({ page, filter }));

  useEffect(() => {
    dispatch(statsActions.getMisesEnRelationStats());
  }, []);

  let statsMapped = {
    'nouvelle': 0,
    'interessee': 0,
    'nonInteressee': 0,
    'recrutee': 0,
    'toutes': 0
  }
  if (stats?.stats) {
    for (const stat in stats?.stats) {
      statsMapped[`${stats?.stats[stat].statut}`] = `${stats?.stats[stat].count}`;
    }
    statsMapped['toutes'] = `${stats?.stats.length}`;
  }
 
  const tabs = [
    {
      name: 'Nouvelles candidatures',
      filter: 'nouvelle'
    },
    {
      name: 'Intéressantes',
      filter: 'interessee'
    },
    {
      name: 'Pas intéressantes',
      filter: 'nonInteressee'
    },
    {
      name: 'Recrutées',
      filter: 'recrutee'
    },
    {
      name: 'Toutes',
      filter: 'toutes'
    }
  ]

  const constructor = () => {
    if (constructorHasRun) return;
    update();
    setConstructorHasRun(true);
  };
  constructor();

  return (
    <div className="conseillers">

      <ul className="tabs rf-tags-group">
        {tabs.map((tab, idx) => <li key={idx}><Link className={`rf-tag ${tab.filter === filter ? 'current' : ''}`} to={`/structure/conseillers/${tab.filter}`}>{tab.name}&nbsp;({statsMapped[tab.filter]})</Link></li>)}
      </ul>

      { conseillers && conseillers.loading && <span>Chargement...</span> }

      { !conseillers.loading && conseillers.items && conseillers.items.data.length === 0 && <span>Aucun conseiller pour le moment</span> }

      { !conseillers.error && !conseillers.loading && conseillers.items && conseillers.items.data.map((conseiller, idx) => {
        return (<Conseiller key={idx} conseiller={conseiller.conseiller} miseEnRelationId={conseiller._id} statut={conseiller.statut} update={update} />)
      })
      }

      <Pagination current={page} pageCount={pageCount} navigate={navigate} />

    </div>
  );
}

export default Conseillers;
