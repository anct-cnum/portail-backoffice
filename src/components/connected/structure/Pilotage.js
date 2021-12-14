import React from 'react';

function Pilotage() {

  const urlEspaceCoop = process.env.REACT_APP_COOP_HOSTNAME;

  return (
    <div className="fr-container--fluid">
      <div className="fr-grid-row">
        <div className="fr-col-12 ">
          <div>
            <h3>Suivi et pilotage des Conseillers numériques France Services</h3>
            <p style={{ fontWeight: '600' }}>
              Un accès d’administration vous est nouvellement ouvert sur l’espace Coop des conseillers numériques. Celui-ci vous permet de :
            </p>
            <p>– consulter le suivi d’activité des conseillers numériques recrutés au sein de votre structure ;<br/>
            – pouvoir exporter ces données d’activité au format CSV (Excel) ;</p>
            <p>– d’accéder à la documentation des conseillers numériques via l’onglet «Ressourcerie» ;</p>
            <p>– consulter les statistiques d’accompagnement de l’ensemble des conseillers numériques au niveau départemental,
              régional et national.
            </p>

            <p style={{ fontWeight: '600' }}>Identification et accès :</p>
            <p>
              Le mail et le mot de passe, sont les mêmes qui vous servent pour vous connecter à votre espace structure ci-présent.
            </p>
            <div style={{ textAlign: 'center' }}>
              <a className="coop-btn fr-mb-4w" href={urlEspaceCoop} target="blank" rel="noreferrer">
                Accéder à l’espace admin de la Coop Conseiller numérique France Services *
              </a>
            </div>
            <p className="message-condition" >
              * Astuce : Si vous le souhaitez, enregistrez la page du lien ci-dessus dans les favoris de votre navigateur afin de pouvoir
              y accéder directement à l’avenir. L’accès restera également possible via votre espace structure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pilotage;
