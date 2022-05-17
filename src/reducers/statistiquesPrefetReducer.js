const anneeEnCours = new Date().getFullYear();
const initialState = {
  dateDebutStats: new Date(anneeEnCours + '/01/01'),
  dateFinStats: new Date(),
  codePostalStats: '',
  listeAutresReorientations: [],
};
export default function statistiquesPrefet(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_DATE_DEBUT_STATS':
      return {
        ...state,
        dateDebutStats: action.dateDebut,
      };
    case 'CHANGE_DATE_FIN_STATS':
      return {
        ...state,
        dateFinStats: action.dateFin,
      };
    case 'CHANGE_CODE_POSTAL_STATS':
      return {
        ...state,
        codePostalStats: action.codePostal,
      };
    case 'GET_CODES_POSTAUX_CRA_REQUEST':
      return {
        ...state,
        codesPostauxLoading: true,
        codesPostauxError: false,
      };
    case 'GET_CODES_POSTAUX_CRA_SUCCESS':
      return {
        ...state,
        listeCodesPostaux: action.listeCodesPostaux,
        codesPostauxLoading: false,
      };
    case 'GET_CODES_POSTAUX_CRA_FAILURE':
      return {
        ...state,
        codesPostauxLoading: false,
        codesPostauxError: true,
      };
    case 'GET_STATS_STRUCTURES_REQUEST':
      return {
        ...state,
        statistiquesStructuresLoading: true,
        statistiquesStructuresError: false,
      };
    case 'GET_STATS_STRUCTURES_SUCCESS':
      return {
        ...state,
        statistiquesStructures: action.statsStructure,
        statistiquesStructuresLoading: false,
      };
    case 'GET_STATS_STRUCTURES_FAILURE':
      return {
        ...state,
        statistiquesStructuresError: action.error,
        statistiquesStructuresLoading: false,
      };
    case 'GET_STATS_CRA_STRUCTURE_REQUEST':
      return {
        ...state,
        statsDataLoading: true,
        statsDataError: false,
      };
    case 'GET_STATS_CRA_STRUCTURE_SUCCESS':
      return {
        ...state,
        statsData: action.statsStructure,
        statsDataLoading: false,
      };
    case 'GET_STATS_CRA_STRUCTURE_FAILURE':
      return {
        ...state,
        statsDataError: action.error,
        statsDataLoading: false,
      };
    case 'UPDATE_AUTRES_REORIENTATIONS':
      return {
        ...state,
        listeAutresReorientations: action.listeAutresReorientations
      };
    case 'GET_STATS_CSV_REQUEST':
      return {
        ...state,
        loadingCSV: true,
        error: false
      };
    case 'GET_STATS_CSV_SUCCESS':
      return {
        ...state,
        blob: action.data,
        statistiquesCSV: action.download,
        loadingCSV: false
      };
    case 'GET_STATS_CSV_FAILURE':
      return {
        ...state,
        error: action.error
      };
    case 'GET_STATS_PDF_REQUEST':
      return {
        ...state,
        loadingPDF: true,
        errorPDF: false
      };
    case 'GET_STATS_PDF_SUCCESS':
      return {
        ...state,
        blob: action.data,
        statistiquesPDF: action.download,
        loadingPDF: false,
        errorPDF: false
      };
    case 'GET_STATS_PDF_FAILURE':
      return {
        ...state,
        blob: null,
        loadingPDF: false,
        errorPDF: action.error
      };
    case 'RESET_FILE':
      return {
        ...state,
        blob: null,
      };
    default:
      return state;
  }
}
