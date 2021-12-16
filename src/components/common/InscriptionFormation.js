import React from 'react';

function InscriptionFormation() {

  const url = process.env.REACT_APP_FRANCE_COMPETENCES_HOSTNAME;
  const urlPix = process.env.REACT_APP_PIX_CERTIFIER_HOSTNAME;

  return (
    <div className="formation">
      <div className="fr-container-fluid">
        <h3>Pr&eacute;sentation de l&rsquo;offre de formation des Conseillers num&eacute;riques France services</h3>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Presentation_offre_de_formation.pdf"
              className="fr-link" target="blank" rel="noreferrer" title="Offre de formation">
              T&eacute;l&eacute;charger la pr&eacute;sentation de l&rsquo;offre de formation (slides au format PDF)
            </a>
          </p>
        </div>

        <div className="fr-grid-row">
          <h4>Une formation certifiante pour l&rsquo;exercice de missions professionnelles dans le domaine de la m&eacute;diation num&eacute;rique</h4>
          <p>
            Chaque Conseiller num&eacute;rique France Services (CNFS) commence son activit&eacute; par un parcours de formation certifiante
            dont le coût est pris en charge par l&rsquo;&Eacute;tat*.
            En tant que structure d&rsquo;accueil, vous vous engagez &agrave; laisser partir le Conseiller recrut&eacute; en formation, dans un
            d&eacute;lai de 15 jours maximum apr&egrave;s signature de son contrat de travail.
          </p>
          <p style={{ fontStyle: 'italic' }}>
            * Hors &eacute;ventuels frais de d&eacute;placement du candidat pendant sa formation ou pour rejoindre le lieu d&rsquo;examen pour
            sa certification, &agrave; la charge de l&rsquo;employeur.
            Pour les structures d&rsquo;accueil priv&eacute;es, une prise en charge de ces frais peut &ecirc;tre demand&eacute;e &agrave; l&rsquo;OPCO de
            r&eacute;f&eacute;rence.
          </p>
          <p>
            Cette formation se d&eacute;roule durant les premiers mois de son contrat, selon un calendrier et dans un volume horaire adapt&eacute;
            aux comp&eacute;tences et connaissances de chaque apprenant&nbsp;: 4 parcours de 105h &agrave; 420h, &eacute;tal&eacute;s sur plusieurs
            semaines, avec au minimum 1 jour d&rsquo;alternance en structure.
            L&rsquo;organisme de formation, retenu par march&eacute; public par l&rsquo;Agence nationale de la coh&eacute;sion des territoires
            (ANCT), proc&egrave;de &agrave; un test de positionnement pour d&eacute;terminer l&rsquo;inscription dans un de ces parcours.
          </p>
          <p>
          Les missions du Conseiller num&eacute;rique sont d&rsquo;accompagner les citoyens dans un large spectre d&rsquo;usages
          num&eacute;riques du quotidien. Ils sont form&eacute;s &agrave; un m&eacute;tier, ce qui implique une formation dense traitant
          un grand nombre de th&eacute;matiques qui leur permettront de concevoir des programmes d&rsquo;action en ad&eacute;quation
          avec les besoins des usagers de leur structure d&rsquo;accueil. C&rsquo;est pourquoi il ne s&rsquo;agit pas simplement de
          proposer une formation &agrave; l&rsquo;accompagnement aux d&eacute;marches administratives, mais d&rsquo;offrir la possibilit&eacute;
          de &laquo;&nbsp;faire avec&nbsp;&raquo; et non de faire &laquo;&nbsp;&agrave; la place&nbsp;&raquo; de l&rsquo;usager.
          Le cadre du plan France Relance permet de proposer une mesure de formation durable dans l&rsquo;int&eacute;r&ecirc;t de l&rsquo;employeur comme
          du candidat qui en b&eacute;n&eacute;ficiera pour sa vie professionnelle future. Pour cette raison, l&rsquo;assiduit&eacute; en
          formation est une obligation des Conseillers num&eacute;riques France Services et la structure d&rsquo;accueil est tenue de favoriser
          cette obligation. Le non-respect de cet engagement inscrit dans l&rsquo;appel &agrave; manifestation d&rsquo;int&eacute;r&ecirc;t
          constitue un motif de remise en cause de la subvention vers&eacute;e &agrave; la structure.
          </p>
          <p>
            La formation pr&eacute;pare :
            <ul>
              <li>
                &agrave; l&rsquo;examen du&nbsp;
                <a href={url} target="blank" rel="noreferrer">
                  premier certificat de comp&eacute;tences professionnelles : &laquo;&nbsp;Accompagner diff&eacute;rents publics vers l&rsquo;autonomie
                  dans les usages des technologies, services et m&eacute;dias num&eacute;riques&nbsp;&raquo; du titre professionnel &laquo;&nbsp;
                  Responsable d&rsquo;espace de m&eacute;diation num&eacute;rique&nbsp;&raquo;
                </a>.&nbsp;
                <em>
                  N.B.&nbsp;: un Conseiller d&eacute;j&agrave; titulaire du CCP1 ou du titre professionnel lors de son recrutement peut
                  &ecirc;tre exempt&eacute; de formation initiale.
                </em>
              </li>
              <li>
                &agrave; la&nbsp;<a href={urlPix} target="blank" rel="noreferrer">certification PIX</a>&nbsp;
                qui atteste de la maîtrise des comp&eacute;tences num&eacute;riques par le candidat.
              </li>
            </ul>
          </p>
          <p>
            L&rsquo;&eacute;chec &agrave; l&rsquo;un ou l&rsquo;autre de ces examens ne remet pas en cause ni le contrat de travail, ni la convention de
            subvention. En ce cas, la structure d’accueil est invit&eacute;e &agrave; accompagner le salari&eacute; &agrave; une nouvelle pr&eacute;sentation
            de l’examen. En revanche, la pr&eacute;sentation aux deux examens constitue une obligation pour chaque Conseiller num&eacute;rique
            France Services et pour sa structure d&rsquo;accueil employeur.
          </p>
        </div>

        <div className="fr-grid-row">
          <h4>Calendrier et d&eacute;roulement de la formation</h4>
          <ul>
            <li>
              <p>
                <em>Au moment de la candidature du CNFS sur la plateforme</em>&nbsp;
                <a href="https://conseiller-numerique.gouv.fr" target="blank" rel="noreferrer" title="plateforme CN">conseiller-numerique.gouv.fr</a>&nbsp;:
              </p>
              <p>Il est propos&eacute; &agrave; chaque candidat de passer un test d&rsquo;aptitudes g&eacute;n&eacute;rales PIX.<br/>
                Attention, le r&eacute;sultat de ce test d&rsquo;auto-positionnement ne permet pas de d&eacute;duire le volume horaire de formation
                que l&rsquo;apprenant devra suivre.
                <br/>
                Il donne &agrave; l&rsquo;employeur une estimation des comp&eacute;tences num&eacute;riques du candidat &agrave; l&rsquo;embauche.
                <br/>
                Chaque candidat reste libre d&rsquo;afficher ou non le r&eacute;sultat de son test sur son profil dans la plateforme.
              </p>
            </li>
            <li>
              <p>
                <em>3 semaines avant la date de signature du contrat de travail&nbsp;:</em>
              </p>
              <p>
                Votre structure d&rsquo;accueil inscrit le Conseiller num&eacute;rique recrut&eacute; aupr&egrave;s de l&rsquo;organisme de
                formation comp&eacute;tent sur votre territoire (cf. annuaire ci-dessous).
              </p>
            </li>
            <li>
              <p>
                <em>Au moment du recrutement, avant ou apr&egrave;s signature du contrat de travail&nbsp;:</em>
              </p>
              <p>
                L&rsquo;organisme de formation contacte le Conseiller num&eacute;rique pour organiser un test de positionnement qui d&eacute;terminera
                le parcours adapt&eacute; &agrave; ses besoins de formation (de 105h &agrave; 420h &eacute;tal&eacute; sur plusieurs semaines, en alternance).
                Le r&eacute;sultat du test est souverain
                La formation peut &ecirc;tre r&eacute;alis&eacute;e soit &agrave; distance, soit en pr&eacute;sentiel. Le Conseiller num&eacute;rique
                ainsi que sa structure d&rsquo;accueil reçoivent les r&eacute;sultats de ce test avant le d&eacute;but de la formation.
              </p>
                Il prend en compte&nbsp;:
              <ul style={{ listStyle: 'revert' }}>
                <li>L&rsquo;exp&eacute;rience et la formation ant&eacute;rieure du CNFS;</li>
                <li>La posture p&eacute;dagogique et d&rsquo;accompagnement;</li>
                <li>Les connaissances techniques n&eacute;cessaires &agrave; la r&eacute;ussite des examens des deux certifications vis&eacute;es au
                  terme de la formation.</li>
              </ul>
              <br/>
            </li>
            <li>
              <p><em>Apr&egrave;s la signature du contrat de travail et sous un d&eacute;lai maximum de 15 jours&nbsp;: d&eacute;part en formation</em></p>
            </li>
            <li>
              <p>
                <em>Dans un d&eacute;lai maximum de 6 mois &agrave; compter de la date de sortie de formation&nbsp;:</em>
              </p>
              <p>
                Pr&eacute;sentation du candidat &agrave; la certification par son organisme de formation : examen PIX et examen jury du 1er certificat
                de comp&eacute;tences professionnelles du titre professionnel REMN.
              </p>
            </li>
          </ul>
        </div>

        <div className="fr-grid-row">
          <h4>Comment inscrire le Conseiller num&eacute;rique en formation&nbsp;?</h4>
          <p>
            6 organismes de formation ont &eacute;t&eacute; s&eacute;lectionn&eacute;s &agrave; la suite d&rsquo;un march&eacute; public pass&eacute; par
            l&rsquo;Agence nationale de la coh&eacute;sion des territoires (ANCT)&nbsp;:
            5 organismes pour la formation en pr&eacute;sentiel, avec une r&eacute;partition territoriale indiqu&eacute;e ci-apr&egrave;s,
            et 1 organisme pour la formation &agrave; distance au niveau  national.
          </p>
          <p>
            La formation est organis&eacute;e prioritairement en pr&eacute;sentiel ; en cas d&rsquo;impossibilit&eacute; de suivre une
            formation en pr&eacute;sentiel, la formation &agrave; distance peut vous &ecirc;tre propos&eacute;e.
          </p>
          <span>
            <b>Nous vous invitons &agrave; inscrire d&egrave;s que possible le Conseiller num&eacute;rique directement aupr&egrave;s de
              l&rsquo;organisme de formation</b>&nbsp;concern&eacute;, qui vous communiquera les dates de formation dans votre d&eacute;partement&nbsp;:
          </span>
          <ul>
            <li>
              En r&eacute;gion &Icirc;le-de-France&nbsp;: Le P&ocirc;leS
              (Leila Bennar&nbsp;-&nbsp;<a href="mailto:leila.bennar@lepoles.org">leila.bennar@lepoles.org</a>)
            </li>
            <li>
              En r&eacute;gion Hauts-de-France, Normandie et Grand-Est&nbsp;: Les Assembleurs
              (Faustine Faure&nbsp;-&nbsp;<a href="mailto:faustine@pop.eu.com">faustine@pop.eu.com</a>)
            </li>
            <li>
              En r&eacute;gion PACA, Occitanie, Corse, Nouvelle-Aquitaine, Pays-de-la-Loire, Bretagne et dans les d&eacute;partements d&rsquo;outre-mer
              (Martinique, Guadeloupe, Guyane, La R&eacute;union et Mayotte)&nbsp;: l&rsquo;Afpa, Simplon et l&rsquo;UNPIMMS
              (Sophie Valaiti&nbsp;-&nbsp;<a href="mailto:sophie.valaitis@afpa.fr">sophie.valaitis@afpa.fr</a>)
            </li>
            <li>
              En r&eacute;gion Bourgogne-France-Comt&eacute;, Centre-Val-de-Loire et Auvergne-Rh&ocirc;ne-Alpes&nbsp;: l&rsquo;Afpa, Simplon et l&rsquo;UNPIMMS
              (B&eacute;atrice Marron&nbsp;-&nbsp;<a href="mailto:bmarron@simplon.co">bmarron@simplon.co</a>)
            </li>
          </ul>
          <p>
            Pour la formation en distanciel (sur tout le territoire national : WebForce3 / L&rsquo;acad&eacute;mie des h&eacute;ro.ïne.s du num&eacute;rique
            (David Dou&eacute;&nbsp;-&nbsp;<a href="mailto:cnfs@wf3.fr">cnfs@wf3.fr</a>)
          </p>
        </div>

        <div className="fr-grid-row fr-mt-3w">
          <a href="https://cdn.conseiller-numerique.gouv.fr/Presentation_offre_de_formation.pdf"
            className="fr-link" target="blank" rel="noreferrer" title="Offre de formation">
              T&eacute;l&eacute;charger la pr&eacute;sentation de l&rsquo;offre de formation (slides au format PDF)
          </a>
        </div>
      </div>
    </div>
  );
}

export default InscriptionFormation;
