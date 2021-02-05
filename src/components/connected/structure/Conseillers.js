import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Conseiller from './Conseiller';
import { conseillerActions } from '../../../actions';
import Pagination from '../../common/Pagination';
import {
  Link,
  useParams
} from "react-router-dom";

import './conseillers.css';

function Conseillers() {
  const dispatch = useDispatch();

  const conseillers = useSelector(state => state.conseillers);

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

  const tabs = [
    {
      name: 'Nouvelles candidatures',
      filter: 'nouvelle'
    },
    {
      name: 'Acceptées',
      filter: 'acceptee'
    },
    {
      name: 'Refusées',
      filter: 'refusee'
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
        {tabs.map((tab, idx) => <li key={idx}><Link className={`rf-tag ${tab.filter === filter ? 'current' : ''}`} to={`/structure/conseillers/${tab.filter}`}>{tab.name}</Link></li>)}
      </ul>

      { conseillers && conseillers.loading && <span>Chargement...</span> }

      { !conseillers.loading && conseillers.items && !conseillers.items.data && <span>Aucune mise en relation pour le moment</span> }

      { !conseillers.error && !conseillers.loading && conseillers.items && conseillers.items.data.map((conseiller, idx) => {
        return (<Conseiller key={idx} conseiller={conseiller.conseiller} miseEnRelationId={conseiller._id} statut={conseiller.statut} update={update} />)
      })
      }

      <Pagination current={page} pageCount={pageCount} navigate={navigate} />

    </div>
  );
}

export default Conseillers;
