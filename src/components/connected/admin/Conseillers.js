import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Conseiller from './Conseiller';
import { conseillerActions, statsActions } from '../../../actions';
import Pagination from '../../common/Pagination';
import {
  useParams
} from 'react-router-dom';
import PropTypes from 'prop-types';

function Conseillers({ departement }) {
  const dispatch = useDispatch();

  const conseillers = useSelector(state => state.conseillers);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  let { filter } = useParams();

  const navigate = page => {
    setPage(page);
    dispatch(conseillerActions.getAll({
      departement,
      misesEnRelation: false,
      page: conseillers.items ? (page - 1) * conseillers.items.limit : 0,
      filter: filter })
    );
  };

  useEffect(() => {
    if (conseillers.items) {
      const count = Math.floor(conseillers.items.total / conseillers.items.limit);
      setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1);
    }
  }, [conseillers]);

  const update = () => dispatch(conseillerActions.getAll({ departement, misesEnRelation: false, page: page - 1, filter }));

  useEffect(() => {
    update();
  }, [filter]);

  useEffect(() => {
    dispatch(statsActions.getMisesEnRelationStats());
  }, []);

  /*const tabs = [
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
  ];*/

  const constructor = () => {
    if (constructorHasRun) {
      return;
    }
    update();
    setConstructorHasRun(true);
  };
  constructor();

  return (
    <div className="conseillers">

      <ul className="tabs rf-tags-group">
        {/*tabs.map((tab, idx) => <li key={idx}>
          <Link className={`rf-tag ${tab.filter === filter ? 'current' : ''}`}
            to={`/structure/conseillers/${tab.filter}`}>
            {tab.name}&nbsp;({ stats?.stats !== undefined && stats?.stats[tab.filter] !== undefined ? stats?.stats[tab.filter] : 0 })
          </Link>
  </li>)*/}
      </ul>

      { conseillers && conseillers.loading && <span>Chargement...</span> }

      { !conseillers.loading && conseillers.items && conseillers.items.data.length === 0 && <span>Aucun conseiller pour le moment.</span> }

      { !conseillers.error && !conseillers.loading && conseillers.items && conseillers.items.data.map((conseiller, idx) => {
        return (<Conseiller key={idx} conseiller={conseiller} update={update} />);
      })
      }

      <Pagination current={page} pageCount={pageCount} navigate={navigate} />

    </div>
  );
}

Conseillers.propTypes = {
  departement: PropTypes.string
};

export default Conseillers;