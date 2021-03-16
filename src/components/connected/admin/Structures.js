import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Structure from './Structure';
import { structureActions } from '../../../actions';
import Pagination from '../../common/Pagination';

function Structures() {
  const dispatch = useDispatch();

  const structures = useSelector(state => state.structures);
  const user = useSelector(state => state.authentication.user.user);

  const departement = user.departement;

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [constructorHasRun, setConstructorHasRun] = useState(false);

  const navigate = page => {
    setPage(page);
    dispatch(structureActions.getAll({ page: structures.items ? (page - 1) * structures.items.limit : 0 }));
  };

  useEffect(() => {
    if (structures.items) {
      const count = Math.floor(structures.items.total / structures.items.limit);
      setPageCount(structures.items.total % structures.items.limit === 0 ? count : count + 1);
    }
  }, [structures]);

  const update = () => dispatch(structureActions.getAll({ departement, page: page - 1 }));

  useEffect(() => {
    update();
  }, []);

  const constructor = () => {
    if (constructorHasRun) {
      return;
    }
    update();
    setConstructorHasRun(true);
  };
  constructor();

  return (
    <div className="structures">

      { structures && structures.loading && <span>Chargement...</span> }

      { !structures.loading && structures.items && structures.items.data.length === 0 && <span>Aucune structure pour le moment.</span> }

      { !structures.error && !structures.loading && structures.items && structures.items.data.map((structure, idx) => {
        return (<Structure key={idx} structure={structure} />);
      })
      }

      <Pagination current={page} pageCount={pageCount} navigate={navigate} />

    </div>
  );
}

export default Structures;
