import React from 'react';

function Pilotage() {

  const urlEspaceCoop = process.env.REACT_APP_COOP_HOSTNAME;

  return (
    <>
      <h3>Suivi et pilotage des Conseillers num&eacute;riques France Services</h3>
      <p style={{ fontWeight: '600' }}>
        Un acc&egrave;s d&rsquo;administration vous est nouvellement ouvert sur l&rsquo;espace Coop des conseillers num&eacute;riques. Celui-ci vous permet de :
      </p>
      <p>
        – consulter le suivi d&rsquo;activit&eacute; des conseillers num&eacute;riques recrut&eacute;s au sein de votre structure&nbsp;;
      </p>
      <p>
        – exporter ces donn&eacute;es d&rsquo;activit&eacute; au format CSV (Excel)&nbsp;;</p>
      <p>
        – acc&eacute;der &agrave; la documentation des conseillers num&eacute;riques via
        l&rsquo;onglet &laquo;&nbsp;Ressourcerie&nbsp;&raquo;&nbsp;;
      </p>
      <p>
        – consulter les statistiques d&rsquo;accompagnement de l&rsquo;ensemble des conseillers num&eacute;riques au niveau d&eacute;partemental,
        r&eacute;gional et national.
      </p>

      <p>
        Chaque Conseiller num&eacute;rique doit compl&eacute;ter obligatoirement un compte-rendu d&rsquo;activit&eacute;s apr&egrave;s chaque
        accompagnement r&eacute;alis&eacute;, sur son Espace Coop. <b>En tant qu&rsquo;employeur, vous avez la responsabilit&eacute;, inscrite dans
        la convention de subvention, de vous assurer de la r&eacute;gularit&eacute; et de la qualit&eacute; des informations partag&eacute;es dans
        ces comptes-rendus.</b>
      </p>
      <p>
        Pour rappel, les donn&eacute;es r&eacute;colt&eacute;es permettent notamment :
      </p>
      <p>
        <ul>
          <li>la <b>mise en valeur</b> et l&rsquo;<b>organisation</b> des activit&eacute;s des Conseillers num&eacute;riques ;</li>
          <li>l&rsquo;<b>am&eacute;lioration continue</b> de l&rsquo;offre de m&eacute;diation num&eacute;rique sur votre territoire ;</li>
          <li>l&rsquo;<b>&eacute;valuation quantitative</b> du dispositif, qui permettra l&rsquo;&eacute;laboration de nouvelles politiques publiques pour
             l&rsquo;inclusion num&eacute;rique.</li>
        </ul>
      </p>
      <p style={{ fontWeight: '600' }}>Identification et acc&egrave;s :</p>
      <p>
        Le mail et le mot de passe sont identiques &agrave; ceux utilis&eacute;s pour vous connecter &agrave; votre espace structure.
      </p>
      <p>
        Dans le cas o&ugrave; vous souhaiteriez fournir l&rsquo;acc&egrave;s &agrave; cet outil &agrave; plusieurs utilisateurs au sein de votre structure
        (ex. : managers de proximit&eacute; des Conseillers num&eacute;riques), il vous suffit d&rsquo;envoyer des invitations d&rsquo;acc&egrave;s depuis
        l&rsquo;onglet &laquo;&nbsp;Informations&nbsp;&raquo;.
      </p>
      <div style={{ textAlign: 'center' }}>
        <a className="coop-btn fr-mb-4w" href={urlEspaceCoop} target="blank" rel="noreferrer">
        Acc&eacute;der au tableau de bord des Conseillers num&eacute;riques France services&nbsp;*
        </a>
      </div>
      <p className="message-condition" >
        * Astuce : Si vous le souhaitez, enregistrez la page du lien ci-dessus dans les favoris de votre navigateur afin de pouvoir
        y acc&eacute;der directement &agrave; l&rsquo;avenir. L&rsquo;acc&egrave;s restera &eacute;galement possible via votre espace structure.
      </p>
      <div style={{ textAlign: 'center' }}>
        <a className="coop-btn fr-mb-4w" target="blank" rel="noreferrer"
          href="https://cdn.conseiller-numerique.gouv.fr/Guide_outil_de_suivi_et_de_pilotage.pdf">
          Consulter le guide d&rsquo;utilisation du tableau de bord des conseillers Num&eacute;riques (pdf)
        </a>
      </div>

    </>
  );
}

export default Pilotage;
