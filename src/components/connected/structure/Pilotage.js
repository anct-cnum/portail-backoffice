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
        – pouvoir exporter ces donn&eacute;es d&rsquo;activit&eacute; au format CSV (Excel)&nbsp;;</p>
      <p>
        – d&rsquo;acc&eacute;der à la documentation des conseillers num&eacute;riques via
        l&rsquo;onglet &laquo;&nbsp;Ressourcerie&nbsp;&raquo;&nbsp;;
      </p>
      <p>
        – consulter les statistiques d&rsquo;accompagnement de l&rsquo;ensemble des conseillers num&eacute;riques au niveau d&eacute;partemental,
        r&eacute;gional et national.
      </p>

      <p style={{ fontWeight: '600' }}>Identification et acc&egrave;s :</p>
      <p>
        Le mail et le mot de passe, sont les mêmes qui vous servent pour vous connecter à votre espace structure ci-pr&eacute;sent.
      </p>
      <div style={{ textAlign: 'center' }}>
        <a className="coop-btn fr-mb-4w" href={urlEspaceCoop} target="blank" rel="noreferrer">
        Acc&eacute;der au tableau de bord des Conseillers numériques France services&nbsp;*
        </a>
      </div>
      <p className="message-condition" >
        * Astuce : Si vous le souhaitez, enregistrez la page du lien ci-dessus dans les favoris de votre navigateur afin de pouvoir
        y acc&eacute;der directement à l&rsquo;avenir. L&rsquo;acc&egrave;s restera &eacute;galement possible via votre espace structure.
      </p>
    </>
  );
}

export default Pilotage;
