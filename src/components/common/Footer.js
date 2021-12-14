import React from 'react';

function Footer() {

  return (
    <footer className="fr-footer" role="contentinfo" id="footer">
      <div className="fr-container">
        <div className="fr-footer__body">
          <div className="fr-footer__brand">
            <img src="/logos/logoRF.svg" alt="logo République Française" style={{ height: '80px', marginRight: '28px' }}/>
            <img src="/logos/logo-anct.svg" alt="logo Agence Nationale De La Cohésion Des Territoires" style={{ height: '59px', marginRight: '50px' }}/>
            <img src="/logos/logo-france-relance.svg" alt="logo France Relance" style={{ height: '70px', marginBottom: '7px' }}/>
          </div>
          <div className="fr-footer__content">
            <p className="fr-footer__content-desc">
              Conseiller numérique France Services est un dispositif financé par l&rsquo;&Eacute;tat dans le cadre de France Relance.
              Il est piloté par l&rsquo;Agence nationale de la cohésion des territoires avec l&rsquo;appui de la Banque des Territoires.</p>
            <ul className="fr-footer__content-list">
              <li className="fr-footer__content-item">
                <a className="fr-footer__content-link" href="https://agence-cohesion-territoires.gouv.fr/">anct.gouv.fr</a>
              </li>
              <li className="fr-footer__content-item">
                <a className="fr-footer__content-link" href="https://societenumerique.gouv.fr/">societenumerique.gouv.fr</a>
              </li>
              <li className="fr-footer__content-item">
                <a className="fr-footer__content-link" href="https://www.banquedesterritoires.fr/">banquedesterritoires.fr</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fr-footer__bottom">
          <ul className="fr-footer__bottom-list">
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link fr-pr-1w" href="https://aide.conseiller-numerique.gouv.fr/fr/">
                FAQ
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link fr-px-1w" href="https://www.conseiller-numerique.gouv.fr/accessibilite">
                Accessibilité: non conforme
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link fr-px-1w" href="https://www.conseiller-numerique.gouv.fr/mentions-legales">
                Mentions légales
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link fr-px-1w"
                href="https://cdn.conseiller-numerique.gouv.fr/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf">
                Données personnelles
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link fr-px-1w"
                href="https://cdn.conseiller-numerique.gouv.fr/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf">
                Conditions générales d&rsquo;utilisation
              </a>
            </li>
          </ul>
          <div className="fr-footer__bottom-copy">
            <p>Sauf mention contraire, tous les contenus de ce site sont sous
              <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" rel="noreferrer" target="_blank">licence etalab-2.0</a>
            </p>
          </div>
        </div>
      </div>
    </footer>);
}

export default Footer;
