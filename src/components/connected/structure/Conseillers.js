import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Conseiller from './Conseiller';
import { conseillerActions, statsActions, searchActions } from '../../../actions';
import Pagination from '../../common/Pagination';
import FiltersAndSorts from './FiltersAndSorts';
import {
  Link,
  useParams
} from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBox from '../../common/SearchBox';

function Conseillers({ location }) {
  const dispatch = useDispatch();

  const { search } = useSelector(state => state.search);
  const conseillers = useSelector(state => state.conseillers);
  const stats = useSelector(state => state.stats);

  let [page, setPage] = useState(1);
  let savePage = null;
  if (location.currentPage) {
    savePage = location.currentPage;
  }

  const [pageCount, setPageCount] = useState(0);
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  let { filter } = useParams();
  const filtersAndSorts = useSelector(state => state.filtersAndSorts);

  const navigate = page => {
    setPage(page);
    dispatch(conseillerActions.getAll({
      misesEnRelation: true,
      search,
      page: conseillers.items ? (page - 1) * conseillers.items.limit : 0,
      filter: filter,
      sortData: filtersAndSorts?.order,
      persoFilters: filtersAndSorts
    }));
  };

  useEffect(() => {
    if (conseillers.items) {
      const count = Math.floor(conseillers.items.total / conseillers.items.limit);
      setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1);
    }
  }, [conseillers]);

  const update = () => {
    if (savePage !== null) {
      navigate(savePage);
      delete location.currentPage;
    } else {
      dispatch(conseillerActions.getAll({
        misesEnRelation: true,
        search,
        page: page - 1,
        filter,
        sortData: filtersAndSorts?.order,
        persoFilters: filtersAndSorts
      }));
    }
  };

  useEffect(() => {
    dispatch(statsActions.getMisesEnRelationStats());
  }, []);

  useEffect(() => {
    update();
  }, [filter, filtersAndSorts, search]);

  useEffect(() => {
    dispatch(searchActions.updateSearch(''));
  }, [filter]);

  const tabs = [
    {
      name: 'Nouvelles candidatures',
      filter: 'nouvelle'
    },
    {
      name: 'Candidatures pré sélectionnées',
      filter: 'interessee'
    },
    {
      name: 'Candidatures non retenues',
      filter: 'nonInteressee'
    },
    {
      name: 'Candidatures validées',
      filter: 'recrutee'
    },
    {
      name: 'Afficher toutes les candidatures',
      filter: 'toutes'
    }
  ];

  const constructor = () => {
    if (constructorHasRun) {
      return;
    }
    setConstructorHasRun(true);
  };
  constructor();

  return (
    <div className="conseillers">

      <ul className="tabs rf-tags-group">
        {tabs.map((tab, idx) => <li key={idx}>
          <Link className={`rf-tag ${tab.filter === filter ? 'current' : ''}`}
            to={{
              pathname: `/structure/candidats/${tab.filter}`,
              currentPage: 1
            }}>
            {tab.name}&nbsp;({ stats?.stats !== undefined && stats?.stats[tab.filter] !== undefined ? stats?.stats[tab.filter] : 0 })
          </Link>
        </li>)}
      </ul>

      { location.pathname.startsWith('/structure/candidats') &&
        <SearchBox />
      }

      <FiltersAndSorts resetPage={setPage} />

      { conseillers && conseillers.loading && <span>Chargement...</span> }

      { !conseillers.loading && conseillers.items && conseillers.items.data.length === 0 && <span>Aucun conseiller pour le moment.</span> }

      { !conseillers.error && !conseillers.loading && conseillers.items && conseillers.items.data.map((conseiller, idx) => {
        return (<Conseiller key={idx} miseEnRelation={conseiller} update={update} currentPage={page} currentFilter={filter} />);
      })
      }

      <Pagination current={page} pageCount={pageCount} navigate={navigate} />

    </div>
  );
}

Conseillers.propTypes = {
  location: PropTypes.object
};

export default Conseillers;
