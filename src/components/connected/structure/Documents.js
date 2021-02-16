import React from 'react';

function Documents() {

    return (
        <div className="documents">
            <div className="rf-container">
                <div className="rf-grid-row">
                    <p>
                        <a href="https://cellar-c2.services.clever-cloud.com/conseiller-numerique/Contrat%20de%20projet%20type.pdf" 
                        className="rf-link" target="blank" title="Télécharger le contrat de projet type">
                        Télécharger le contrat de projet type (pdf)
                        </a>
                    </p>
                </div>
                <div className="rf-grid-row">
                    <p>
                        <a href="https://cellar-c2.services.clever-cloud.com/conseiller-numerique/Fiche%20de%20poste%20type.pdf" 
                        className="rf-link" target="blank" title="Télécharger la fiche de poste type">
                        Télécharger la fiche de poste type (pdf)
                        </a>
                    </p>
                </div>
                <div className="rf-grid-row">
                    <p>
                        <a href="https://cellar-c2.services.clever-cloud.com/conseiller-numerique/Mod%C3%A8le%20de%20d%C3%A9lib%C3%A9ration%20contrat%20de%20projet.pdf" 
                        className="rf-link" target="blank" title="Télécharger le modèle de délibération">
                        Télécharger le modèle de délibération (pdf)
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Documents;
