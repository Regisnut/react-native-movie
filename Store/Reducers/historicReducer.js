const initialState = {
  historicFilms: []
};

function manageHistoricFilms(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "TOGGLE_FILMDETAIL":
      const favoriteFilmHistoric = state.historicFilms.findIndex(
        item => item.id === action.value.id
      );
      if (favoriteFilmHistoric !== -1) {
        //remove from historic list
        nextState = {
          ...state,
          historicFilms: state.historicFilms.filter(
            (item, index) => index !== favoriteFilmHistoric
          )
        };
      } else {
        nextstate = {
          ...state,
          historicFilms: [...state.historicFilms, action.value]
        };
      }

      return nextState || state;
    default:
      return state;
  }
}

export default manageHistoricFilms;
