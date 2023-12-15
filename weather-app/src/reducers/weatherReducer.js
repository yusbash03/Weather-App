import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
  REMOVE_CITY,

} from '../actions/weatherAction';

const initialState = {
  cities: [],
  loadingCities: false,
  errorCities: null,
  favorites: [],
  weather: null,
  loading: false,
  error: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITIES_REQUEST:
      return {
        ...state,
        loadingCities: true,
        errorCities: null,
      };
      case REMOVE_CITY:
        return {
          ...state,
          cities: state.cities.filter((city) => city !== action.payload),
          loadingCities: false,
          errorCities: null,
        };
    case FETCH_CITIES_SUCCESS:
      return {
        ...state,
        cities: action.payload,
        loadingCities: false,
        errorCities: null,
      };
    case FETCH_CITIES_FAILURE:
      return {
        ...state,
        loadingCities: false,
        errorCities: action.payload,
      };
    case ADD_TO_FAVORITES:
      // return {
      //   ...state,
      //   favorites: [...state.favorites, action.payload],
      // };
     
      return {
        ...state,
        favorites: state.favorites.includes(action.payload)
          ? state.favorites.filter(city => city !== action.payload) // Remove city if it exists
          : [...state.favorites, action.payload], // Add the new city
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((city) => city !== action.payload),
      };
    case FETCH_WEATHER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        weather: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_WEATHER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;