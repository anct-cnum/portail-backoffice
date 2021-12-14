import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { structureActions } from '../../../actions';
import Pagination from '../../common/Pagination';
import ProgressBar from '../../common/ProgressBar';
import { Sort } from '../../common/sort/Sort';
import { Order } from '../../common/sort/Sort.presenter';

function EtatRecrutements() {
  const dispatch = useDispatch();

  const structures = useSelector(state => state.structures);
  const user = useSelector(state => state.authentication.user.user);
  const avancement = useSelector(state => state.structures.avancement);

  const departement = user?.departement;
  const region = user?.region;

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [sort, setSort] = useState({ field: 'coselecAt', order: Order.Descending });

  useEffect(() => {
    if (structures.items) {
      const count = Math.floor(structures.items.total / structures.items.limit);
      setPageCount(structures.items.total % structures.items.limit === 0 ? count : count + 1);
    }
  }, [structures]);

  const skip = page => structures.items ? (page - 1) * structures.items.limit : 0;

  const update = page => {
    dispatch(structureActions.getAll({
      departement,
      region,
      page: skip(page),
      filter: false,
      sortData: sort.field,
      sortOrder: sort.order
    }));
  };

  const navigate = page => {
    setPage(page);
    update(page);
  };

  useEffect(() => {
    update(page);
  }, [sort]);

  useEffect(() => {
    dispatch(structureActions.getAvancementRecrutement());
  }, []);
  const labels = {
    VALIDATION_COSELEC: 'Validée',
    CREEE: 'Non traitée',
    ABANDON: 'Abandonnée',
    ANNULEE: 'Annulée',
    DOUBLON: 'Doublon'
  };

  return (
    <div className="recrutements">
      <div className="fr-container-fluid">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <h4 className="titre-etat-recrutements">Avancement total des recrutements sur le territoire</h4>
          </div>
          <div className="fr-col-12">
            <ProgressBar completed={avancement?.pourcentage} candidatsRecrutes={avancement?.candidatsRecrutes} dotations={avancement?.dotations} />
          </div>
          <div className="fr-col-12">
            <h4 className="titre-etat-recrutements">Avancement des recrutements par structure</h4>
          </div>
          <div className="fr-col-12">
            <div className="fr-table">
              <table >
                <thead>
                  <tr>
                    <th>Structure</th>
                    <th>
                      <Sort field="coselecAt" sort={sort} onSort={setSort}>
                        Date de Coselec
                      </Sort>
                    </th>
                    <th>Dotation</th>
                    <th>Candidats recrutés</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {!structures.error && !structures.loading && structures.items && structures.items.data.map((structure, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{structure.nom}</td>
                        <td>{structure.coselecAt ? dayjs(structure.coselecAt).format('DD/MM/YY') : 'en attente de passage'}</td>
                        <td>
                          { labels[structure?.statut] }
                        </td>
                        <td>{structure?.nbCandidatsRecrutes}</td>
                        <td>
                          <Link className="fr-btn fr-fi-eye-line fr-btn--icon-left" style={{ boxShadow: 'none' }}
                            to={{ pathname: `/structure/${structure._id}`, currentPage: page, origin: `/etat-des-recrutements` }}>
                              Détails
                          </Link>
                        </td>
                      </tr>);
                  })
                  }
                </tbody>
              </table>
            </div>
            <Pagination current={page} pageCount={pageCount} navigate={navigate} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EtatRecrutements;
