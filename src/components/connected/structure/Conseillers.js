import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import Conseiller from './Conseiller';

function Conseillers() {


  const conseillers = useSelector(state => state.conseillers);

  console.log(conseillers)
  // TODO : call useSelector
  /*const conseillers = Array(20).fill({
    nom: 'Guillois',
    prenom: 'Loïc',
    dateCreation: new Date(),
    codePostal: 85130
  })*/

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const ITEMS_PER_PAGE = 5;

  const paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  const goTo = (page) => setPage(page)

  useEffect(() => {
    if(!conseillers.loading) {
      const count = Math.floor(conseillers.data.length / ITEMS_PER_PAGE);
      setPageCount(conseillers.data.length % ITEMS_PER_PAGE === 0 ? count : count + 1);
    }
  }, [ ]);

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
        { tabs.map(tab => <button onClick={applyFilter.bind(this, tab)}>{tab.name}</button>) }
      </div>

      { conseillers.loading && <span>Chargement...</span> }

      { !conseillers.loading && paginate(conseillers.items.data, ITEMS_PER_PAGE, page).map(conseiller => {
        return (<Conseiller conseiller={conseiller} />)
      })
        }

        <div className="pagination">
          { [...Array(pageCount).keys()].map(p => <button onClick={goTo.bind(this, p + 1)}>{p + 1}</button>) }
        </div>
    </div>
  );
}

export default Conseillers;
