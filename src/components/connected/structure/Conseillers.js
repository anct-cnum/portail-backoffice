import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Conseiller from './Conseiller';
import { conseillerActions } from '../../../actions';
import Pagination from '../../common/Pagination';

import './conseillers.css';

function Conseillers() {
  const dispatch = useDispatch();

  const conseillers = useSelector(state => state.conseillers);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);

  const navigate = (page) => {
    setPage(page);
    dispatch(conseillerActions.getAll({ page, filter: tabs[currentTab].filter }));
  }

  useEffect(() => {
    update();
    if (conseillers.items) {
      const count = Math.floor(conseillers.items.total / conseillers.items.limit);
      setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1);
    }
  }, []);

  const update = () => dispatch(conseillerActions.getAll({ page, filter: tabs[currentTab].filter }));

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

  const applyFilter = (idx) => {
    setCurrentTab(idx);
    dispatch(conseillerActions.getAll({ page: page, filter: tabs[idx].filter }));
  }

  return (
    <div className="conseillers">

      <ul className="tabs rf-tags-group">
        {tabs.map((tab, idx) => <li><button className={`rf-tag ${idx === currentTab ? 'current' : ''}`} onClick={applyFilter.bind(this, idx)} key={idx}>{tab.name}</button></li>)}
      </ul>

      { conseillers && conseillers.loading && <span>Chargement...</span> }

      { !conseillers.loading && !conseillers.items.data && <span>Aucune mise en relation pour le moment</span> }

      { !conseillers.error && !conseillers.loading && conseillers.items.data.map((conseiller, idx) => {
        return (<Conseiller key={idx} conseiller={conseiller.conseiller} miseEnRelationId={conseiller._id} update={update} />)
      })
      }

      <Pagination current={page} pageCount={pageCount} navigate={navigate} />

    </div>
  );
}

export default Conseillers;
