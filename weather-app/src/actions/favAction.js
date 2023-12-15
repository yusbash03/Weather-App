export const addToFavorites = (city) => ({
    type: 'ADD_TO_FAVORITES',
    payload: city,
  });
  
  export const removeFromFavorites = (city) => ({
    type: 'REMOVE_FROM_FAVORITES',
    payload: city,
  });