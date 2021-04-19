import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Conseiller from './Conseiller';
import { conseillerActions, statsActions } from '../../../actions';
import Pagination from '../../common/Pagination';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function Conseillers({ departement, region, search }) {
  const dispatch = useDispatch();

  const conseillers = useSelector(state => state.conseillers);
  const user = useSelector(state => state.authentication.user.user);

  let [page, setPage] = useState(1);
  let savePage = null;
  let location = useLocation();
  if (location.currentPage) {
    savePage = location.currentPage;
  }

  const [pageCount, setPageCount] = useState(0);
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  let { filter } = useParams();

  if (user.role !== 'admin') {
    region = user.region ? user.region : null;
  }

  const navigate = page => {
    setPage(page);
    dispatch(conseillerActions.getAll({
      departement,
      region,
      search,
      misesEnRelation: false,
      page: conseillers.items ? (page - 1) * conseillers.items.limit : 0,
      filter: filter
    })
    );
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
      dispatch(conseillerActions.getAll({ departement, region, search, misesEnRelation: false, page: page - 1, filter }));
    }
  };

  useEffect(() => {
    update();
  }, [filter]);

  useEffect(() => {
    dispatch(statsActions.getMisesEnRelationStats());
  }, []);

  const constructor = () => {
    if (constructorHasRun) {
      return;
    }
    setConstructorHasRun(true);
  };
  constructor();

  return (
    <div className="conseillers">

      { conseillers && conseillers.loading && <span>Chargement...</span>}

      { !conseillers.loading && conseillers.items && conseillers.items.data.length === 0 && <span>Aucun conseiller pour le moment.</span>}

      <div className="rf-table">
        <table>
          <thead>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Date de candidature</th>
            <th>Code postal</th>
            <th>Résultat Pix</th>
            <th></th>
          </thead>
          <tbody>
            {!conseillers.error && !conseillers.loading && conseillers.items && conseillers.items.data.map((conseiller, idx) => {
              return (<Conseiller key={idx} conseiller={conseiller} update={update} currentPage={page} />);
            })
            }
          </tbody>
        </table>
      </div>
      <Pagination current={page} pageCount={pageCount} navigate={navigate} />

    </div>
  );
}

Conseillers.propTypes = {
  region: PropTypes.string,
  search: PropTypes.string,
  departement: PropTypes.string
};

export default Conseillers;
