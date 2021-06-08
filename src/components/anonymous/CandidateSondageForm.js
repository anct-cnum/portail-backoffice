import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions, sondageActions } from '../../actions';
import FlashMessage from 'react-flash-message';

function CandidateSondageForm({ match }) {

  const dispatch = useDispatch();
  const token = match.params.token;

  useEffect(() => {
    dispatch(conseillerActions.verifySondageToken(token));
  }, []);

  const verifyingToken = useSelector(state => state.conseiller?.verifyingToken);
  const messageVerifyingToken = useSelector(state => state.conseiller?.error);
  const tokenVerified = useSelector(state => state.conseiller?.tokenVerified);
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  let sondageError = useSelector(state => state.sondages.errorsRequired);
  let sondagePrintError = useSelector(state => state.sondages?.printError);
  const submitedSondage = useSelector(state => state.sondages?.submited);
  const submitedError = useSelector(state => state.sondages?.error);

  const [isActive, setActive] = useState(false);
  const [sondage, setSondage] = useState({
    disponible: '',
    contact: '',
    nombreContact: 0,
    structureContact: '',
    entretien: '',
    axeAmelioration: '',
    precisionAxeAmelioration: '',
    avis: '',
    precisionAvis: '',
  });

  const { nombreContact } = sondage;

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === 'disponible') {
      dispatch(sondageActions.updateDisponibilite(value));
    }
    if (name === 'contact' && value === 'Oui') {
      dispatch(sondageActions.updateConcate(value));
      setActive(true);
    }
    if (name === 'contact' && value === 'Non') {
      dispatch(sondageActions.updateConcate(value));
      setActive(false);
    }
    if (name === 'nombreContact') {
      dispatch(sondageActions.updateConcate(value));
    }
    setSondage(inputs => ({ ...inputs, [name]: value }));
  }

  //Pour la maj de printError quand errorsRequired change
  useEffect(() => {
    if (sondagePrintError) {
      dispatch(sondageActions.verifySondage(Object.values(sondageError)));
    }
  }, [sondagePrintError, sondageError]);

  function handleSubmit() {
    let hasErrors = false;
    hasErrors = Object.values(sondageError).find(function(error) {
      return error === true;
    });
    if (hasErrors) {
      dispatch(sondageActions.verifySondage(Object.values(sondageError)));
    } else {
      sondage.idConseiller = conseiller?._id;
      dispatch(sondageActions.createSondage(sondage));
    }
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <Header/>
      <div className="survey">
        <div className="rf-container rf-mt-3w">
          <div className="rf-grid-row rf-grid-row--center">
            { verifyingToken &&
              <span>Chargement...</span>
            }
            { tokenVerified === false &&
              <div className="rf-col-12 rf-col-md-7 rf-mt-12w labelError flashBag">
                <span>
                  {messageVerifyingToken}
                </span>
              </div>
            }
            { submitedError &&
              <div className="rf-col-12 rf-col-md-7 rf-mt-12w labelError flashBag">
                <span>{ submitedError }</span>
              </div>
            }
            { submitedSondage &&
              <div className="rf-col-12 rf-col-md-7 rf-mt-10w flashBag">
                Merci pour votre participation !&nbsp;<i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
              </div>
            }

            { !submitedSondage && tokenVerified && !submitedError && !verifyingToken &&
            <>
              <div className="rf-col-12 rf-p-5w">
                <h2 className="center">Les recrutements ont démarré, dites-nous en plus sur vous !</h2>
              </div>

              { sondagePrintError &&
                <FlashMessage duration={10000}>
                  <div className="rf-col-12 rf-mb-3w flashBag labelError">
                    <span>
                      Erreur&nbsp;: veuillez remplir tous les champs obligatoires (*) du formulaire.
                    </span>
                  </div>
                </FlashMessage>
              }

              <div className="rf-form-group rf-col-12 rf-col-md-7 center">
                <fieldset className="rf-fieldset rf-fieldset--inline">
                  <label className = {sondagePrintError &&
                    sondageError?.disponible ? 'rf-fieldset__legend rf-text--regular rf-label invalid' : 'rf-fieldset__legend rf-text--regular rf-label'
                  }
                  id="radio-inline-legend">
                    Etes-vous toujours disponible pour un emploi ? *
                  </label>
                  <div className="rf-fieldset__content">
                    <div className = "rf-radio-group">
                      <input type="radio" id="disponible-oui" name="disponible" value="Oui" onClick={handleChange}/>
                      <label className={sondagePrintError && sondageError?.disponible ? 'rf-label invalid' : 'rf-label' } htmlFor="disponible-oui">Oui</label>
                    </div>
                    <div className="rf-radio-group">
                      <input type="radio" id="disponible-non" name="disponible" value="Non" onClick={handleChange}/>
                      <label className={sondagePrintError && sondageError?.disponible ? 'rf-label invalid' : 'rf-label' } htmlFor="disponible-non">Non</label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="rf-form-group rf-col-12 rf-col-md-7 center">
                <fieldset className="rf-fieldset rf-fieldset--inline">
                  <label className = {sondagePrintError &&
                    sondageError?.contact ? 'rf-fieldset__legend rf-text--regular rf-label invalid' : 'rf-fieldset__legend rf-text--regular rf-label'
                  }
                  id="radio-inline-legend">
                    Avez-vous été contacté(e) par une ou plusieurs structures ? *
                  </label>
                  <div className="rf-fieldset__content">
                    <div className="rf-radio-group">
                      <input type="radio" id="contact-oui" name="contact" value="Oui" onClick={handleChange} />
                      <label className={sondagePrintError && sondageError?.contact ? 'rf-label invalid' : 'rf-label' } htmlFor="contact-oui">Oui</label>
                    </div>
                    <div className="rf-radio-group">
                      <input type="radio" id="contact-non" name="contact" value="Non" onClick={handleChange}/>
                      <label className={sondagePrintError && sondageError?.contact ? 'rf-label invalid' : 'rf-label' } htmlFor="contact-non">Non</label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className={isActive ? 'rf-col-12 rf-col-md-7 rf-mb-6w center' : 'hidden'}>
                <label className = {sondagePrintError &&
                  sondageError?.nombreContact ? 'rf-label invalid' : 'rf-label' } htmlFor="nombre-contact">
                  Combien en avez-vous eu ? *
                </label>
                <input type="number" name="nombreContact" id="nombre-contact" onChange={handleChange}
                  className={sondagePrintError && sondageError?.nombreContact ? 'rf-input invalid' : 'rf-input' } />
              </div>

              <div className={isActive ? 'rf-col-12 rf-col-md-7 center' : 'hidden'}>
                <label className="rf-label" htmlFor="structure-contact">
                  { nombreContact > 1 &&
                  <span>Lesquelles :</span>
                  }
                  { nombreContact <= 1 &&
                    <span> Laquelle :</span>
                  }
                </label>
                <label className="center">
                  <textarea name="structureContact" id="structure-contact" className="rf-input rf-mb-6w" onKeyUp={handleChange}/>
                </label>
              </div>

              <div className={isActive ? 'rf-col-12 rf-col-md-7 rf-mb-6w center' : 'hidden'}>
                <fieldset className="rf-fieldset rf-fieldset--inline">
                  <label className="rf-fieldset__legend rf-text--regular rf-label" id="radio-inline-legend">
                  Avez vous eu un ou plusieurs entretiens ?
                  </label>
                  <div className="rf-fieldset__content">
                    <div className="rf-radio-group">
                      <input type="radio" id="entretien-oui" name="entretien" value="Oui" onClick={handleChange}/>
                      <label className="rf-label" htmlFor="entretien-oui">Oui</label>
                    </div>
                    <div className="rf-radio-group">
                      <input type="radio" id="entretien-non" name="entretien" value="Non" onClick={handleChange}/>
                      <label className="rf-label" htmlFor="entretien-non">Non</label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="rf-col-12 rf-col-md-7 rf-mb-6w center">
                <label className="rf-label" htmlFor="axe-amelioration">
                  Quels axes d&rsquo;amélioration souhaiteriez-vous apporter au dispositif ?
                </label>
                <input type="text" name="axe-amelioration" id="axe-amelioration" className="rf-input" onChange={handleChange}/>
              </div>

              <div className="rf-col-12 rf-col-md-7 rf-mb-6w center">
                <label className="rf-label" htmlFor="precision-amelioration">
                  Précisez votre réponse :
                </label>
                <textarea className="rf-input" id="precision-amelioration" name="precision-amelioration" onChange={handleChange}></textarea>
              </div>

              <div className="rf-form-group rf-col-12 rf-col-md-7 center">
                <fieldset className="rf-fieldset rf-fieldset--inline">
                  <label className="rf-fieldset__legend rf-text--regular rf-label" id="radio-inline-legend">
                    Quel avis avez-vous sur le dispositif ?
                  </label>
                  <div className="rf-fieldset__content">
                    <div className="rf-radio-group">
                      <input type="radio" id="avis-5" name="avis" value="5" onClick={handleChange}/>
                      <label className="rf-label" htmlFor="avis-5">TR&Egrave;S BON</label>
                    </div>
                    <div className="rf-radio-group">
                      <input type="radio" id="avis-4" name="avis" value="4" onClick={handleChange}/>
                      <label className="rf-label" htmlFor="avis-4">BON</label>
                    </div>
                    <div className="rf-radio-group">
                      <input type="radio" id="avis-3" name="avis" value="3" onClick={handleChange}/>
                      <label className="rf-label" htmlFor="avis-3">MOYEN</label>
                    </div>
                    <div className="rf-radio-group">
                      <input type="radio" id="avis-2" name="avis" value="2" onClick={handleChange}/>
                      <label className="rf-label" htmlFor="avis-2">MAUVAIS</label>
                    </div>
                    <div className="rf-radio-group">
                      <input type="radio" id="avis-1" name="avis" value="1" onClick={handleChange}/>
                      <label className="rf-label" htmlFor="avis-1">TR&Egrave;S MAUVAIS</label>
                    </div>
                    <div className="rf-radio-group">
                      <input type="radio" id="avis-0" name="avis" value="" defaultChecked onClick={handleChange}/>
                      <label className="rf-label" htmlFor="avis-0">SANS AVIS</label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="rf-col-12 rf-col-md-7 rf-mb-3w center">
                <label className="rf-label" htmlFor="precision-avis">
                  Précisez votre réponse :
                </label>
                <textarea className="rf-input" id="precision-avis" name="precision-avis" onChange={handleChange}></textarea>
              </div>

              <div className="rf-col-12 rf-col-md-7 center">
                <button className="rf-btn rf-fi-checkbox-line rf-btn--icon-left" onClick={handleSubmit} >Envoyer</button>
              </div>
            </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

CandidateSondageForm.propTypes = {
  match: PropTypes.object
};

export default CandidateSondageForm;
