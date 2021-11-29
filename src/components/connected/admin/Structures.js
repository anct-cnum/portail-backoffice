import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Structure from './Structure';
import { structureActions } from '../../../actions';
import Pagination from '../../common/Pagination';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

function Structures({ departement, region, com, search, start, end }) {
  const dispatch = useDispatch();

  const structures = useSelector(state => state.structures);
  const user = useSelector(state => state.authentication.user.user);

  if (user.role !== 'admin') {
    departement = user.departement ? user.departement : null;
    region = user.region ? user.region : null;
    com = user.com ? user.com : null;
  }

  let location = useLocation();
  const pagination = useSelector(state => state.pagination);
  let [page, setPage] = (pagination?.resetPage === false && location.currentPage !== undefined) ? useState(location.currentPage) : useState(1);

  const [pageCount, setPageCount] = useState(0);
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  const [type, setType] = useState(null);

  function selectType(event) {
    const value = event.target.value;
    setType(value !== '' ? value : null);
  }

  const navigate = page => {
    setPage(page);
    let skip = structures.items ? (page - 1) * structures.items.limit : 0;
    //Structures.items est undefined au retour à la liste donc calcul manuel
    if (skip === 0 && pagination?.resetPage === false && location.currentPage !== undefined) {
      skip = (page - 1) * 10;
    }
    dispatch(structureActions.getAll({ departement, region, com, search, start, end, type, page: skip }));
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
      dispatch(structureActions.getAll({ departement, region, com, search, start, end, type, page: page - 1 }));
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
        <div className="rf-table" style={{ overflow: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>SIRET</th>
                <th></th>
                <th>Nom</th>
                <th>Statut</th>
                <th>Date de<br/> candidature</th>
                <th>Code postal</th>
                <th>Candidats<br/> recrutés</th>
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
      </>
      }
    </div>
  );
}

Structures.propTypes = {
  region: PropTypes.string,
  departement: PropTypes.string,
  com: PropTypes.string,
  search: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
};

export default Structures;
