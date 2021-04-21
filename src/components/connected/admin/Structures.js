import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Structure from './Structure';
import { structureActions } from '../../../actions';
import Pagination from '../../common/Pagination';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

function Structures({ departement, region, search, start, end }) {
  const dispatch = useDispatch();

  const structures = useSelector(state => state.structures);
  const user = useSelector(state => state.authentication.user.user);

  if (user.role !== 'admin') {
    departement = user.departement ? user.departement : null;
    region = user.region ? user.region : null;
  }

  let location = useLocation();
  const pagination = useSelector(state => state.pagination);
  let [page, setPage] = (pagination?.resetPage === false && location.currentPage !== undefined) ? useState(location.currentPage) : useState(1);

  const [pageCount, setPageCount] = useState(0);
  const [constructorHasRun, setConstructorHasRun] = useState(false);

  const navigate = page => {
    setPage(page);
    let skip = structures.items ? (page - 1) * structures.items.limit : 0;
    //Structures.items est undefined au retour à la liste donc calcul manuel
    if (skip === 0 && pagination?.resetPage === false && location.currentPage !== undefined) {
      skip = (page - 1) * 10;
    }
    dispatch(structureActions.getAll({ departement, region, search, start, end, page: skip }));
  };

  useEffect(() => {
    if (structures.items) {
      const count = Math.floor(structures.items.total / structures.items.limit);
      setPageCount(structures.items.total % structures.items.limit === 0 ? count : count + 1);
    }
  }, [structures]);

  const update = () => {
    if (pagination?.resetPage === false && location.currentPage !== undefined) {
      navigate(page);
    } else {
      dispatch(structureActions.getAll({ departement, region, search, start, end, page: page - 1 }));
    }
  };

  useEffect(() => {
    update();
  }, []);

  const constructor = () => {
    if (constructorHasRun) {
      return;
    }
    setConstructorHasRun(true);
  };
  constructor();

  return (
    <div className="structures">

      { structures && structures.loading && <span>Chargement...</span>}

      { !structures.loading && structures.items && structures.items.data.length === 0 && <span>Aucune structure pour le moment.</span>}

      <div className="rf-table">
        <table>
          <thead>
            <tr>
              <th>SIRET</th>
              <th>Nom</th>
              <th>Statut coselec</th>
              <th>Date de candidature</th>
              <th>Code postal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!structures.error && !structures.loading && structures.items && structures.items.data.map((structure, idx) => {
              return (<Structure key={idx} structure={structure} currentPage={page} />);
            })
            }
          </tbody>
        </table>
      </div>
      <Pagination current={page} pageCount={pageCount} navigate={navigate} />

    </div>
  );
}

Structures.propTypes = {
  region: PropTypes.string,
  departement: PropTypes.string,
  search: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
};

export default Structures;
