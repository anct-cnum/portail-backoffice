import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../common/Header';
import { useDispatch } from 'react-redux';
import { userActions } from '../../actions';

function CandidateSurveyForm({ token }) {

  const dispatch = useDispatch();
 /* useEffect(() => {
    dispatch(userActions.verifyCandidateToken(token));
  }, []);
*/
  return (
    <div>
      <Header/>
      <div className="survey">
        <div className="rf-container rf-mt-3w">
          <div className="rf-grid-row ">

            <div className="rf-col-12 rf-p-5w">
              <h2>Les recrutements ont démarré, dîtes nous en plus sur vous !</h2>
            </div>

            <label>
              Etes vous toujours disponible pour un emploi ? *
              <input type="radio"/> Oui
              <input type="radio"/> Non
            </label>

            <label>
              Avez vous été contacté(e) par une ou plusieurs structures ? *
              <input type="radio"/> Oui
              <input type="radio"/> Non
            </label>

            <label>
              Si oui, combien* :
              <input type="text" />
            </label>

            <label>
              Laquelle/lesquelles :
              <input type="text"/>
            </label>
            <label>
              Avez vous eu un ou plusieurs entretiens ? OUI/NON (à afficher seulement si la réponse à la question 2 est OUI)
              <input type="text"/>
            </label>

            <label>
              Laquelle/lesquelles :
              <input type="text"/>
            </label>

            <label>
              Quels axes d amélioration souhaiteriez-vous apporter au dispositif ?
              <input type="text"/>
            </label>

            <label>
                Quel avis avez-vous sur le dispositif ? TRES BON / BON / MOYEN / MAUVAIS / TRES MAUVAIS / SANS AVIS
              <input type="text"/>
            </label>

            <label>
              Précisez votre réponse :
              <input type="text"/>
            </label>

          </div>
        </div>
      </div>
    </div>
  );
}

CandidateSurveyForm.propTypes = {
  token: PropTypes.string
};

export default CandidateSurveyForm;
