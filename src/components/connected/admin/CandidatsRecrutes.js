import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions, statsActions } from '../../../actions';
import Pagination from '../../common/Pagination';
import { useLocation, useParams } from 'react-router-dom';
import Spinner from 'react-loader-spinner';
import PropTypes from 'prop-types';
import CandidatRecrute from './CandidatRecrute';

function CandidatsRecrutes({ departement, region, search }) {
  const dispatch = useDispatch();

  const candidatsRecrutes = useSelector(state => state.conseillers);
  const pagination = useSelector(state => state.pagination);
  const downloading = useSelector(state => state?.conseiller?.downloading);

  let location = useLocation();
  let [page, setPage] = (pagination?.resetPage === false && location.currentPage !== undefined) ? useState(location.currentPage) : useState(1);

  const [pageCount, setPageCount] = useState(0);
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  let { filter } = useParams();
  const persoFilters = { recrutes: 'RECRUTE' };

  const navigate = page => {
    setPage(page);
    dispatch(conseillerActions.getAll({
      departement,
      region,
      search,
      misesEnRelation: false,
      page: candidatsRecrutes.items ? (page - 1) * candidatsRecrutes.items.limit : 0,
      filter: filter,
      persoFilters
    })
    );
  };

  useEffect(() => {
    if (candidatsRecrutes.items) {
      const count = Math.floor(candidatsRecrutes.items.total / candidatsRecrutes.items.limit);
      setPageCount(candidatsRecrutes.items.total % candidatsRecrutes.items.limit === 0 ? count : count + 1);
    }
  }, [candidatsRecrutes]);

  const update = () => {
    if (pagination?.resetPage === false && location.currentPage !== undefined) {
      if (candidatsRecrutes.items) {
        navigate(page);
      }
    } else {
      dispatch(conseillerActions.getAll({ departement, region, search, misesEnRelation: false, page: page - 1, filter,
        persoFilters }));
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
    <div className="candidatsRecrutes">
      <div className="spinnerCustom">
        <Spinner
          type="Oval"
          color="#00BFFF"
          height={100}
          width={100}
          visible={downloading === true}
        />
      </div>
      { candidatsRecrutes && candidatsRecrutes.loading && <span>Chargement...</span>}

      { !candidatsRecrutes.loading && candidatsRecrutes.items && candidatsRecrutes.items.data.length === 0 &&
        <span>Aucun candidat recruté pour le moment.</span>
      }

      <div className="rf-table">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Date d&rsquo;entrée en formation</th>
              <th>Date de sortie de formation</th>
              <th>Espace Coop créé</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!candidatsRecrutes.error && !candidatsRecrutes.loading && candidatsRecrutes.items && candidatsRecrutes.items.data.map((candidat, idx) => {
              return (<CandidatRecrute key={idx} candidat={candidat} update={update} currentPage={page}/>);
            })
            }
          </tbody>
        </table>
      </div>
      <Pagination current={page} pageCount={pageCount} navigate={navigate} />

    </div>
  );
}

CandidatsRecrutes.propTypes = {
  region: PropTypes.string,
  search: PropTypes.string,
  departement: PropTypes.string
};

export default CandidatsRecrutes;
