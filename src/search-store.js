const initialState = {
  searchResults: [],
  selectedSearchResults: [],
  selectedEntity: {},
  searchText: '',
};

const reducer = (state = initialState, action) => {
  console.log(state, action); // eslint-disable-line
  switch (action.type) {
    case 'CUSTOMER_SEARCH_COMPLETED':
      return {
        ...state,
        searchResults: [...action.payload],
      };
    case 'CUSTOMER_GET_COMPLETED':
      return {
        ...state,
        selectedEntity: { ...action.payload },
      };
    case 'CUSTOMER_SELECTED':
      return {
        ...state,
        selectedSearchResults: [...action.payload],
      };
    case 'CLEAR_SELECTED':
      return {
        ...state,
        selectedSearchResults: [],
      };
    case 'UPDATE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.payload,
      };
    default:
      break;
  }
  return state;
};

const selectors = {
  selectedSearchResults: state => state.search.selectedSearchResults,
  selectedEntity: state => state.search.selectedEntity,
  searchResults: state => state.search.searchResults,
  showResultsDisplay: state => state.search.searchResults.length > 1,
  searchText: state => state.search.searchText,
};

export default {
  initialState,
  reducer,
  selectors,
};
