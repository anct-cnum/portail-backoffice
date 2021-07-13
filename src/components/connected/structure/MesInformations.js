import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { structureActions, conseillerActions, userActions } from '../../../actions';
import dayjs from 'dayjs';
import FlashMessage from 'react-flash-message';
import StructureContactForm from './StructureContactForm';
import InvitationForm from './InvitationForm';

function MesInformations() {
  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure);
  const users = useSelector(state => state.user?.users);
  const [form, setForm] = useState(false);
  const [display, displayForm] = useState(false);
  const error = useSelector(state => state.structure?.patchError);
  const userError = useSelector(state => state.user?.userError);

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
      {structure?.flashMessage === true &&
        <div className="">
          <div style={{ width: '55%' }}>
            <div>
              <FlashMessage duration={10000}>
                { (error === undefined || error === false) &&
                <p className="rf-label flashBag" style={{ fontSize: '16px' }}>
                  La mise à jour a été effectuée avec succès
                  &nbsp;
                  <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
                </p>
                }
                { (error !== undefined && error !== false) &&
                <p className="rf-label flashBag labelError" style={{ fontSize: '16px' }}>
                  La mise à jour a échoué, veuillez réessayer plus tard
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
            {display === false &&
              <button className="rf-btn" onClick={() => displayForm(true)}>
                Envoyer une invitation
                <span className="rf-fi-mail-line rf-ml-4v" aria-hidden="true"></span>
              </button>
            }
            {display === true &&
              <div style={{ width: '68%' }}>
                <InvitationForm displayForm={displayForm} structureId={structure?.structure?._id}/>
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
        { !userError && users &&
          <div className="rf-col-4">
            <h2>Liste des utilisateurs</h2>
            {users && users.map((user, idx) => {
              return (
                <p key={idx} className={!user.passwordCreated ? 'inactif' : 'actif'}
                  title={!user.passwordCreated ? 'Compte inactif pour le moment' : ''} >{user.name}</p>
              );
            })
            }
          </div>
        }
      </div>
    </div>
  );
}

export default MesInformations;
