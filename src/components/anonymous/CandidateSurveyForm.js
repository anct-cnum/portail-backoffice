import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, structureActions, searchActions } from '../../actions';

function CandidateSurveyForm({ match }) {

  const dispatch = useDispatch();
  const token = match.params.token;

  useEffect(() => {
    dispatch(userActions.verifyCandidateToken(token));
  }, []);

  const verifyingToken = useSelector(state => state.createAccount.verifyingToken);
  const tokenVerified = useSelector(state => state.createAccount.tokenVerified);
  const [isActive, setActive] = useState(false);
  const [disponible, setDisponible] = useState(false);
  const [contact, setContact] = useState(false);
  const [numberContact, setNumberContact] = useState(0);
  const [structureContact, setStructureContact] = useState('');
  const [structuresContact, setStructuresContact] = useState([]);
  const [entretien, setEntretien] = useState('');
  const [axeAmelioration, setAxeAmelioration] = useState('');
  const [precisionAxeAmelioration, setPrecisionAxeAmelioration] = useState(false);
  const [avis, setAvis] = useState('');
  const [precisionAvis, setPrecisionAvis] = useState('');


  function handleDisponible(e) {
    const { value } = e.target;
    setDisponible(value);
  }
  function handleContact(e) {
    const { value } = e.target;
    setContact(value);
    let activation = false;
    if (value === 'Oui') {
      activation = true;
    }
    setActive(activation);
  }
  function handleNumber(e) {
    const { value } = e.target;
    setNumberContact(value);
  }
  function handleStructureContact(e) {
    const { value } = e.target;
    setStructureContact(value);
  }
  function handleStructuresContact() {
    if (structureContact.length > 5) {
      setStructuresContact([...structuresContact, structureContact]);
      setStructureContact('');
    }
  }
  const handleRemoveStructure = name => {
    const structures = structuresContact.filter(structure => structure !== name);
    setStructuresContact(structures);
  };
  function handleEntretien(e) {
    const { value } = e.target;
    setEntretien(value);
  }
  function handleAxeAmelioration(e) {
    const { value } = e.target;
    setAxeAmelioration(value);
  }
  function handlePrecisionAxeAmelioration(e) {
    const { value } = e.target;
    setPrecisionAxeAmelioration(value);
  }
  function handleAvis(e) {
    const { value } = e.target;
    setAvis(value);
  }
  function handlePrecisionAvis(e) {
    const { value } = e.target;
    setPrecisionAvis(value);
  }

  /* V2 ?-> recherche de la structure

  const [searchInputContact, setSearchInputContact] = useState('');
  const { search } = useSelector(state => state.search);
  function handleChangeContact(e) {
    setSearchInputContact(e.target.value);
  }

  function handleKeyDownContact(e) {
    if (e.key === 'Enter') {
      setSearchInputContact(e.target.value);
      dispatch(searchActions.updateSearch(searchInputContact));
    }
  }

  useEffect(() => {
    setSearchInputContact(search);
  }, [search]);
*/

  function handleSubmit() {
    if (disponible && contact) {
      if (contact === 'Oui' && numberContact === 0) {

      } else {
        const survey = {
          'disponible': disponible,
          'contact': contact,
          'nombreContact': numberContact,
          'structureEnContact': structuresContact,
          'entretien': entretien,
          'axeAmelioration': axeAmelioration,
          'precisionAxeAmelioration': precisionAxeAmelioration,
          'avis': avis,
          'precisionAvis': precisionAvis
        };
        console.log(survey);
        dispatch(userActions.sendSurvey(token, survey));
      }
    }
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
                <span>Désolé mais le lien est invalide.</span>
            }

            { tokenVerified && !verifyingToken &&
            <>
              <div className="rf-col-12 rf-p-5w">
                <h2 className="center">Les recrutements ont démarré, dîtes nous en plus sur vous !</h2>
              </div>
              <div className="rf-form-group rf-col-12 rf-col-md-7 center">
                <fieldset className="rf-fieldset rf-fieldset--inline">
                  <label className="rf-fieldset__legend rf-text--regular rf-label" id="radio-inline-legend">
                    Etes vous toujours disponible pour un emploi ? *
                  </label>
                  <div className="rf-fieldset__content">
                    <div className="rf-radio-group">
                      <input type="radio" id="disponible-oui" name="disponible" value="Oui" onClick={handleDisponible}/>
                      <label className="rf-label" htmlFor="disponible-oui">Oui</label>
                    </div>
                    <div className="rf-radio-group">
                      <input type="radio" id="disponible-non" name="disponible" value="Non" onClick={handleDisponible}/>
                      <label className="rf-label" htmlFor="disponible-non">Non</label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="rf-form-group rf-col-12 rf-col-md-7 center">
                <fieldset className="rf-fieldset rf-fieldset--inline">
                  <label className="rf-fieldset__legend rf-text--regular rf-label" id="radio-inline-legend">
                    Avez vous été contacté(e) par une ou plusieurs structures ? *
                  </label>
                  <div className="rf-fieldset__content">
                    <div className="rf-radio-group">
                      <input type="radio" id="contact-oui" name="contact" value="Oui" onClick={handleContact} />
                      <label className="rf-label" htmlFor="contact-oui">Oui</label>
                    </div>
                    <div className="rf-radio-group">
                      <input type="radio" id="contact-non" name="contact" value="Non" onClick={handleContact}/>
                      <label className="rf-label" htmlFor="contact-non">Non</label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className={isActive ? 'rf-col-12 rf-col-md-7 rf-mb-6w center' : 'hidden'}>
                <label className="rf-label" htmlFor="nombre-contact">
                  Combien en avez-vous eu ? *
                </label>
                <input type="number" name="nombre-contact" id="nombre-contact" className="rf-input" onChange={handleNumber}/>
              </div>

              <div className={isActive ? 'rf-col-12 rf-col-md-7 center' : 'hidden'}>
                <label className="rf-label" htmlFor="structure-contact">
                  { numberContact >= 1 &&
                  <span>Lesquelles :</span>
                  }
                  { numberContact <= 1 &&
                    <span> Laquelle :</span>
                  }
                </label>
                <label className="rf-search-bar center">
                  <input type="text" name="structure-contact" id="structure-contact" className="rf-input" onKeyUp={handleStructureContact}/>
                  <button className="rf-btn rf-fi-checkbox-line rf-btn--icon-left" onClick={handleStructuresContact}></button>
                </label>
              </div>
              <div className={isActive ? 'rf-col-12 rf-col-md-7 center' : 'hidden'}>
                {structuresContact !== [] &&
                  <div className="rf-mb-6w rf-mt-2w">
                    { structuresContact.map((structure, id) =>
                      <div key={id}>
                        <span className="structure-nom">{structure}</span>
                        <span className="structure-btn rf-fi-close-circle-line" aria-hidden="true" onClick={() => handleRemoveStructure(structure)}></span>
                      </div>
                    )}
                  </div>
                }
              </div>

              <div className={isActive ? 'rf-col-12 rf-col-md-7 rf-mb-6w center' : 'hidden'}>
                <fieldset className="rf-fieldset rf-fieldset--inline">
                  <label className="rf-fieldset__legend rf-text--regular rf-label" id="radio-inline-legend">
                  Avez vous eu un ou plusieurs entretiens ?
                  </label>
                  <div className="rf-fieldset__content">
                    <div className="rf-radio-group">
                      <input type="radio" id="entretien-oui" name="entretien" value="Oui" onClick={handleEntretien}/>
                      <label className="rf-label" htmlFor="entretien-oui">Oui</label>
                    </div>
                    <div className="rf-radio-group">
                      <input type="radio" id="entretien-non" name="entretien" value="Non" onClick={handleEntretien}/>
                      <label className="rf-label" htmlFor="entretien-non">Non</label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="rf-col-12 rf-col-md-7 rf-mb-6w center">
                <label className="rf-label" htmlFor="axe-amelioration">
                  Quels axes d amélioration souhaiteriez-vous apporter au dispositif ?
                </label>
                <input type="text" name="axe-amelioration" id="axe-amelioration" className="rf-input" onChange={handleAxeAmelioration}/>
              </div>

              <div className="rf-col-12 rf-col-md-7 rf-mb-6w center">
                <label className="rf-label" htmlFor="precision-amelioration">
                  Précisez votre réponse :
                </label>
                <textarea className="rf-input" id="precision-amelioration" name="precision-amelioration" onChange={handlePrecisionAxeAmelioration}></textarea>
              </div>

              <div className="rf-form-group rf-col-12 rf-col-md-7 center">
                <fieldset className="rf-fieldset rf-fieldset--inline">
                  <label className="rf-fieldset__legend rf-text--regular rf-label" id="radio-inline-legend">
                    Quel avis avez-vous sur le dispositif ?
                  </label>
                  <div className="rf-fieldset__content">
                    <div className="rf-radio-group">
                      <input type="radio" id="avis-5" name="avis" value="TRES BON" onClick={handleAvis}/>
                      <label className="rf-label" htmlFor="avis-5">TRES BON</label>
                    </div>
                    <div className="rf-radio-group">
                      <input type="radio" id="avis-4" name="avis" value="BON" onClick={handleAvis}/>
                      <label className="rf-label" htmlFor="avis-4">BON</label>
                    </div>
                    <div className="rf-radio-group">
                      <input type="radio" id="avis-3" name="avis" value="MOYEN" onClick={handleAvis}/>
                      <label className="rf-label" htmlFor="avis-3">MOYEN</label>
                    </div>
                    <div className="rf-radio-group">
                      <input type="radio" id="avis-2" name="avis" value="MAUVAIS" onClick={handleAvis}/>
                      <label className="rf-label" htmlFor="avis-2">MAUVAIS</label>
                    </div>
                    <div className="rf-radio-group">
                      <input type="radio" id="avis-1" name="avis" value="TRES MAUVAIS" onClick={handleAvis}/>
                      <label className="rf-label" htmlFor="avis-1">TRES MAUVAIS</label>
                    </div>
                    <div className="rf-radio-group">
                      <input type="radio" id="avis-0" name="avis" value="SANS AVIS" onClick={handleAvis}/>
                      <label className="rf-label" htmlFor="avis-0">SANS AVIS</label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="rf-col-12 rf-col-md-7 rf-mb-6w center">
                <label className="rf-label" htmlFor="precision-avis">
                  Précisez votre réponse :
                </label>
                <textarea className="rf-input" id="precision-avis" name="precision-avis" onChange={handlePrecisionAvis}></textarea>
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

CandidateSurveyForm.propTypes = {
  match: PropTypes.object
};

export default CandidateSurveyForm;
