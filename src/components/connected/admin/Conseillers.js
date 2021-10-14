import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Conseiller from './Conseiller';
import { conseillerActions, statsActions } from '../../../actions';
import Pagination from '../../common/Pagination';
import { useParams, useLocation } from 'react-router-dom';
import Spinner from 'react-loader-spinner';
import PropTypes from 'prop-types';

function Conseillers({ departement, region, com, search }) {
  const dispatch = useDispatch();

  const conseillers = useSelector(state => state.conseillers);
  const user = useSelector(state => state.authentication.user.user);
  const pagination = useSelector(state => state.pagination);
  const downloading = useSelector(state => state?.conseiller?.downloading);

  let location = useLocation();
  let [page, setPage] = (pagination?.resetPage === false && location.currentPage !== undefined) ? useState(location.currentPage) : useState(1);

  const [pageCount, setPageCount] = useState(0);
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  let { filter } = useParams();

  if (user.role !== 'admin') {
    region = user.region ? user.region : null;
  }

  if (user.role !== 'admin') {
    com = user.com ? user.com : null;
  }

  const navigate = page => {
    setPage(page);
    dispatch(conseillerActions.getAll({
      departement,
      region,
      com,
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
    if (pagination?.resetPage === false && location.currentPage !== undefined) {
      if (conseillers.items) {
        navigate(page);
      }
    } else {
      dispatch(conseillerActions.getAll({ departement, region, com, search, misesEnRelation: false, page: page - 1, filter }));
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
      <div className="spinnerCustom">
        <Spinner
          type="Oval"
          color="#00BFFF"
          height={100}
          width={100}
          visible={downloading === true}
        />
      </div>
      { conseillers && conseillers.loading && <span>Chargement...</span>}

      { !conseillers.loading && conseillers.items && conseillers.items.data.length === 0 && <span>Aucun conseiller pour le moment.</span>}

      <div className="rf-table" style={{ overflow: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Date de candidature</th>
              <th>Code postal</th>
              <th>Résultat Pix</th>
              <th>Curriculum Vit&aelig;</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!conseillers.error && !conseillers.loading && conseillers.items && conseillers.items.data.map((conseiller, idx) => {
              return (<Conseiller key={idx} conseiller={conseiller} update={update} currentPage={page}/>);
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
  com: PropTypes.string,
  search: PropTypes.string,
  departement: PropTypes.string
};

export default Conseillers;
