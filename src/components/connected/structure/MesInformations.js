import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { structureActions, conseillerActions, userActions } from '../../../actions';
import dayjs from 'dayjs';
import FlashMessage from 'react-flash-message';
import StructureContactForm from './StructureContactForm';
import InvitationForm from '../../common/InvitationForm';
import Spinner from 'react-loader-spinner';

function MesInformations() {
  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure);
  const users = useSelector(state => state.user?.users);
  const [form, setForm] = useState(false);
  const [displayFormMulticompte, setDisplayFormMulticompte] = useState(false);
  const error = useSelector(state => state.structure?.patchError);
  const userError = useSelector(state => state.user?.userError);
  const sucessMulticompte = useSelector(state => state?.user?.status);
  const errorMulticompte = useSelector(state => state.user?.error);
  const loadingMessageMulticompte = useSelector(state => state?.user?.loadingMultiCompte);

  useEffect(() => {
    dispatch(structureActions.get());
    dispatch(conseillerActions.getAll({ misesEnRelation: true }));
  }, []);
  useEffect(() => {
    if (structure?.structure?._id) {
      dispatch(userActions.usersByStructure(structure?.structure?._id));
    }
  }, [structure]);

  return (
    <div className="informations">
      <div style={{ textAlign: 'center' }}>
        <Spinner
          type="Oval"
          color="#00BFFF"
          height={80}
          width={80}
          visible={loadingMessageMulticompte}
        />
      </div>
      { ((structure?.flashMessage === true) || (sucessMulticompte !== undefined) || (errorMulticompte !== undefined)) &&
        <div className="">
          <div style={{ width: '55%' }}>
            <div>
              <FlashMessage duration={10000}>
                { ((error === undefined || error === false) && errorMulticompte === undefined) &&
                <p className="rf-label flashBag" style={{ fontSize: '16px' }}>
                  {sucessMulticompte ? 'Invitation à rejoindre la structure envoyée !' : 'La mise à jour a été effectuée avec succès'}
                  &nbsp;
                  <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
                </p>
                }
                { error !== undefined && error !== false &&
                <p className="rf-label flashBag labelError" style={{ fontSize: '16px' }}>
                  La mise à jour a échoué, veuillez réessayer plus tard
                </p>
                }
                { errorMulticompte !== undefined &&
                <p className="rf-label flashBag labelError" style={{ fontSize: '16px' }}>
                  {errorMulticompte}
                </p>
                }
              </FlashMessage>
            </div>
          </div>
        </div>
      }
      <div className="rf-grid-row">
        <div className="rf-col-4">
          <h2 style={{ marginTop: '0' }}>Structure</h2>
          <p>Nom :<strong> { structure?.structure?.nom }</strong></p>
          <p>Siret : { structure?.structure?.siret }</p>
          <p>Date d&apos;inscription : { dayjs(structure?.structure?.dateDebutMission).format('DD/MM/YYYY') }</p>
          <p>Code Postal : { structure?.structure?.codePostal }</p>
          <div className="rf-mt-5w">
            { !userError && users &&
              <>
                <h2>Liste des utilisateurs</h2>
                {users.length === 0 && <p>Aucun compte crée.</p>}
                {users && users.map((user, idx) => {
                  return (
                    <p key={idx} className={!user.passwordCreated ? 'inactif' : 'actif'}
                      title={!user.passwordCreated ? 'Compte inactif pour le moment' : ''} >{user.name}</p>
                  );
                })
                }
              </>
            }
            {displayFormMulticompte === false &&
              <button className="rf-btn" onClick={() => setDisplayFormMulticompte(true)}>
                Envoyer une invitation
                <span className="rf-fi-mail-line rf-ml-4v" aria-hidden="true"></span>
              </button>
            }
            {displayFormMulticompte === true &&
              <div style={{ width: '68%' }}>
                <InvitationForm
                  setDisplayFormMulticompte={setDisplayFormMulticompte}
                  structureId={structure?.structure?._id}
                />
              </div>
            }
          </div>
        </div>
        <div className="rf-col-8">
          <h2 style={{ marginTop: '0' }}>
            Informations de contact
          </h2>
          { form === false &&
            <div className="">
              <p>Nom : { structure?.structure?.contact.nom }</p>
              <p>Prénom : { structure?.structure?.contact.prenom }</p>
              <p>Fonction : { structure?.structure?.contact.fonction }</p>
              <p>Téléphone : { structure?.structure?.contact.telephone }</p>
              <div className="rf-mt-5w">
                <button className="rf-btn" onClick={() => setForm(true)}>
                    Modifier les informations de contact
                  <span className="rf-fi-edit-line rf-ml-4v" aria-hidden="true"/>
                </button>
              </div>
            </div>
          }
          {form === true &&
            <div style={{ width: '50%' }}>
              <StructureContactForm setForm={setForm} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default MesInformations;
