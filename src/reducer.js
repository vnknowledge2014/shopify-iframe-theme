export default function reducer(state, action) {
  switch (action.type) {
    case "GET_PAGES":
      return { ...state, pages: action.payload };
    case "ADD_PAGE":
      const addedPage = [...state.pages, action.payload];
      return {
        ...state,
        pages: addedPage
      };
    case "REMOVED_PAGE":
      const filteredPages = state.pages.filter(p => p.id !== action.payload.id);
      const isRemovedPage =
        state.currentPage.id === action.payload.id ? {} : state.currentPage;
      return {
        ...state,
        currentPage: isRemovedPage,
        pages: filteredPages
      };
    default:
      return state;
  }
}
