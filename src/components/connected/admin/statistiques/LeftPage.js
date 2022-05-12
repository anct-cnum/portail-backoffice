import React from 'react';
import PropTypes from 'prop-types';

import StatistiquesAccompagnements from './StatistiquesAccompagnements';
import StatistiquesAteliers from './StatistiquesAteliers';
import StatistiquesAccompagnementsPersonnel from './StatistiquesAccompagnementsPersonnel';
import StatistiquesRenouvellements from './StatistiquesRenouvellements';
import StatistiquesTotalAccompagnements from './StatistiquesTotalAccompagnements';

function LeftPage({ donneesStats }) {

  const nbTotalAccompagnements = donneesStats?.nbTotalParticipant + donneesStats?.nbAccompagnementPerso + donneesStats?.nbDemandePonctuel;
  const nbTotalSansRecurrence = nbTotalAccompagnements - donneesStats?.nbParticipantsRecurrents;

  return (
    <div className="fr-col-3">
      <StatistiquesAccompagnements nbAccompagnement={nbTotalSansRecurrence} />
      <div className="fr-m-7w fr-mb-5w"></div>
      <hr/>
      <div className="fr-m-5w"></div>
      <StatistiquesTotalAccompagnements nbTotalAccompagnements={nbTotalAccompagnements} />
      <br/>
      <StatistiquesAteliers nbAteliers={donneesStats?.nbAteliers} nbTotalParticipant={donneesStats?.nbTotalParticipant}/>
      <div className="fr-m-5w"></div>
      <hr/>
      <div className="fr-m-5w"></div>
      <StatistiquesAccompagnementsPersonnel
        nbAccompagnementPerso={donneesStats?.nbAccompagnementPerso}
        nbDemandePonctuel={donneesStats?.nbDemandePonctuel}
      />
      <div className="fr-m-5w"></div>
      <hr/>
      <div className="fr-m-5w"></div>
      <StatistiquesRenouvellements
        nbUsagersBeneficiantSuivi={donneesStats?.nbUsagersBeneficiantSuivi}
        tauxTotalUsagersAccompagnes={donneesStats?.tauxTotalUsagersAccompagnes}
        nbUsagersAccompagnementIndividuel={donneesStats?.nbUsagersAccompagnementIndividuel}
        nbUsagersAtelierCollectif={donneesStats?.nbUsagersAtelierCollectif}
        nbReconduction={donneesStats?.nbReconduction}
        caracteresSpeciaux="%"
      />
    </div>
  );
}

LeftPage.propTypes = {
  donneesStats: PropTypes.object,
};

export default LeftPage;
