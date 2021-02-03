import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Conseiller from './Conseiller';
import { conseillerActions } from '../../../actions';
import Pagination from '../../common/Pagination';

function Conseillers() {
  const dispatch = useDispatch();

  const conseillers = useSelector(state => state.conseillers);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const navigate = (page) => {
    setPage(page);
    dispatch(conseillerActions.getAll(page * conseillers.items.limit)); // TODO filter on user
  }

  useEffect(() => {
    if (conseillers.items) {
      const count = Math.floor(conseillers.items.total / conseillers.items.limit);
      setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1);
    }
  }, []);

  const tabs = [
    {
      name: 'Nouvelles candidatures',
      filter: 'nouvelles'
    },
    {
      name: 'Acceptées',
      filter: 'acceptees'
    },
    {
      name: 'Refusées',
      filter: 'refusees'
    },
    {
      name: 'Toutes',
      filter: 'toutes'
    }
  ]

  const applyFilter = ({ filter }) => {
    // TODO : use selector to update list
    console.log(filter);
  }

  return (
    <div className="conseillers">

      <div className="tabs">
        {tabs.map((tab, idx) => <button onClick={applyFilter.bind(this, tab)} key={idx}>{tab.name}</button>)}
      </div>

      { conseillers && conseillers.loading && <span>Chargement...</span>}

      { !conseillers.loading && !conseillers.items.data && <span>Aucune mise en relation pour le moment</span> }

      { !conseillers.loading && conseillers.items.data && conseillers.items.data.map((conseiller, idx) => {
        return (<Conseiller key={idx} conseiller={conseiller} />)
      })
      }

      <Pagination current={page} pageCount={pageCount} navigate={navigate} />

    </div>
  );
}

export default Conseillers;
