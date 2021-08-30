import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { structureActions } from '../../../actions';
import Pagination from '../../common/Pagination';

function EtatRecrutements() {
  const dispatch = useDispatch();
  let location = useLocation();

  const structures = useSelector(state => state.structures);
  const pagination = useSelector(state => state.pagination);
  const user = useSelector(state => state.authentication.user.user);
  const avancement = useSelector(state => state.structures.avancement);

  let [page, setPage] = (pagination?.resetPage === false && location.currentPage !== undefined) ? useState(location.currentPage) : useState(1);

  const departement = user?.departement;
  const region = user?.region;

  const ProgressBar = completion => {
    const { completed } = completion;

    const fillerStyles = {
      width: `${completed}%`,
      borderTopRightRadius: completed > 95 ? '20px' : '',
      borderBottomRightRadius: completed > 95 ? '20px' : '',
    };
    return (
      <div className="barre-total">
        <div className="barre-progression" style={fillerStyles}>
          <div className="barre-label">{`${completed}%`}</div>
        </div>
      </div>
    );
  };

  const [pageCount, setPageCount] = useState(0);

  const navigate = page => {
    setPage(page);
    let skip = structures.items ? (page - 1) * structures.items.limit : 0;
    //Structures.items est undefined au retour à la liste donc calcul manuel
    if (skip === 0 && pagination?.resetPage === false && location.currentPage !== undefined) {
      skip = (page - 1) * 10;
    }
    dispatch(structureActions.getAll({ departement: departement, region: region, page: skip }));
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
      dispatch(structureActions.getAll({ departement: departement, region: region, page: page - 1 }));
    }
  };

  useEffect(() => {
    update();
    dispatch(structureActions.getAvancementRecrutement());
  }, []);

  return (
    <div className="etatRecrutements">
      <div className="rf-container-fluid">
        <div className="rf-grid-row">
          <div className="rf-col-12">
            <h4 className="titre-etat-recrutements">Avancement total des recrutements sur le territoire</h4>
          </div>
          <div className="rf-col-12">
            <ProgressBar completed={avancement?.pourcentage} />
            <span className="nombre-recrutes"><b>{avancement?.candidatsRecrutes}/{avancement?.dotations}</b> candidats recrutés.</span>
          </div>
          <div className="rf-col-12">
            <h4 className="titre-etat-recrutements">Avancement des recrutements par structure</h4>
          </div>
          <div className="rf-col-12">
            <div className="rf-table">
              <table >
                <thead>
                  <tr>
                    <th>Structure</th>
                    <th>Date de Coselec</th>
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
                        <td>{structure.coselecAt ? dayjs(structure.coselecAt).format('DD/MM/YY') : '-'}</td>
                        <td>{structure?.dernierCoselec?.nombreConseillersCoselec ? structure?.dernierCoselec?.nombreConseillersCoselec : '-'}</td>
                        <td>{structure?.nbCandidatsRecrutes}</td>
                        <td>Détails</td>
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
