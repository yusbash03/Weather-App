import axios from 'axios';
import { API_KEY, BASEURL, GEONAMESBASEURL, GEOUSERNAME } from '../utils/APIs';
import dotenv from 'react-dotenv';
//dotenv.config();

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';
export const FETCH_CITIES_REQUEST = 'FETCH_CITIES_REQUEST';
export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS';
export const FETCH_CITIES_FAILURE = 'FETCH_CITIES_FAILURE';
export const REMOVE_CITY = 'REMOVE_CITY';

const stackweatherapiKey = process.env.REACT_APP_STACKWEATHER_API_KEY;
const geousername = process.env.REACT_APP_API_GEOUSERNAME;



// export const addToFavorites = (city) => ({
//   type: ADD_TO_FAVORITES,
//   payload: city,
// });

// export const removeFromFavorites = (city) => ({
//   type: REMOVE_FROM_FAVORITES,
//   payload: city,
// });
export const addToFavorites = (city) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TO_FAVORITES,
      payload: city,
    });

    // Cache favorites in local storage
    const favorites = getState().weather.favorites;
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
};

export const removeFromFavorites = (city) => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_FROM_FAVORITES,
      payload: city,
    });

    // Cache favorites in local storage
    const favorites = getState().weather.favorites;
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
};


export const fetchWeatherRequest = () => ({
  type: FETCH_WEATHER_REQUEST,
});

export const fetchWeatherSuccess = (weather) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: weather,
});

export const fetchWeatherFailure = (error) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error,
});
export const fetchCitiesRequest = () => ({
  type: FETCH_CITIES_REQUEST,
});

export const removeCityAction = (city) => ({
  type: REMOVE_CITY,
  payload: city,
});

export const fetchCitiesSuccess = (cities) => ({
  type: FETCH_CITIES_SUCCESS,
  payload: cities,
});

export const fetchCitiesFailure = (error) => ({
  type: FETCH_CITIES_FAILURE,
  payload: error,
});

export const fetchWeather = (city) => {
  console.log('city', city);
  return async (dispatch) => {
    dispatch(fetchWeatherRequest());

    try {
      const response = await axios.get(`${BASEURL}/current?access_key=${API_KEY}&query=${city}`);
      //const response = await axios.get(`${BASEURL}/current?access_key=${stackweatherapiKey}&query=${city}`);
      console.log('resp:', response.data)
      localStorage.setItem('localstore', JSON.stringify(response.data))
      dispatch(fetchWeatherSuccess(response.data));
    } catch (error) {
      console.error('Error fetching weather:', error);
      dispatch(fetchWeatherFailure(error.message));
    }
  };
};


export const fetchCities = () => {
  return async (dispatch) => {
    dispatch(fetchCitiesRequest());

    try {
      //const response = await axios.get(`${GEONAMESBASEURL}/searchJSON?q=city&featureClass=P&orderby=population&maxRows=15&username=${geousername}`
      const response = await axios.get(`${GEONAMESBASEURL}/searchJSON?q=city&featureClass=P&orderby=population&maxRows=15&username=${GEOUSERNAME}`
      );

      const cityNames = response.data.geonames.map((city) => city.name);
      dispatch(fetchCitiesSuccess(cityNames));
    } catch (error) {
      console.error('Error fetching cities:', error);
      dispatch(fetchCitiesFailure(error.message));
    }
  };
};