import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Structure from './Structure';
import { structureActions } from '../../../actions';
import Pagination from '../../common/Pagination';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

function Structures({ departement, region, search }) {
  const dispatch = useDispatch();

  const structures = useSelector(state => state.structures);
  const user = useSelector(state => state.authentication.user.user);

  if (user.role !== 'admin') {
    departement = user.departement ? user.departement : null;
    region = user.region ? user.region : null;
  }

  let [page, setPage] = useState(1);
  let savePage = null;
  let location = useLocation();
  if (location.currentPage) {
    savePage = location.currentPage;
  }

  const [pageCount, setPageCount] = useState(0);
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  const [type, setType] = useState(null);

  function selectType(event) {
    const value = event.target.value;
    setType(value !== '' ? value : null);
  }

  const navigate = page => {
    setPage(page);
    dispatch(structureActions.getAll({ departement, region, search, type, page: structures.items ? (page - 1) * structures.items.limit : 0 }));
  };

  useEffect(() => {
    if (structures.items) {
      const count = Math.floor(structures.items.total / structures.items.limit);
      setPageCount(structures.items.total % structures.items.limit === 0 ? count : count + 1);
    }
  }, [structures]);

  const update = () => {
    if (savePage !== null) {
      navigate(savePage);
      delete location.currentPage;
    } else {
      dispatch(structureActions.getAll({ departement, region, search, type, page: page - 1 }));
    }
  };

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    update();
  }, [type]);

  const constructor = () => {
    if (constructorHasRun) {
      return;
    }
    setConstructorHasRun(true);
  };
  constructor();

  return (
    <div className="structures">

      <select className="rf-select rf-mb-2w" value={type === null ? '' : type} onChange={selectType}>
        <option value="">Tout type</option>
        <option value="PUBLIC">Publique</option>
        <option value="PRIVATE">Privée</option>
      </select>

      { structures && structures.loading && <span>Chargement...</span>}

      { !structures.loading && structures.items && structures.items.data.length === 0 && <span>Aucune structure pour le moment.</span>}

      { structures?.items?.data?.length > 0 &&
      <>
        <div className="rf-table">
          <table>
            <thead>
              <th>SIRET</th>
              <th>Nom</th>
              <th>Statut coselec</th>
              <th>Date de candidature</th>
              <th>Code postal</th>
              <th></th>
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
      </>
      }
    </div>
  );
}

Structures.propTypes = {
  region: PropTypes.string,
  departement: PropTypes.string,
  search: PropTypes.string
};

export default Structures;
