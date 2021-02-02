
import dayjs from 'dayjs';

function Conseiller({ conseiller }) {
  return (
    <div className="conseiller">
      <strong>{conseiller.prenom} {conseiller.nom}</strong>
      <p>Candidature du {dayjs(conseiller.dateCreation).format('DD/MM/YYYY')}</p>
      <span>Code postal: {conseiller.codePostal}</span>
    </div>
  );
}

export default Conseiller;
