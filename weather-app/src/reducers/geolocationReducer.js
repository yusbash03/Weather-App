
  import {
    REQUEST_GEOLOCATION,
    RECEIVE_GEOLOCATION_SUCCESS,
    RECEIVE_GEOLOCATION_FAILURE,
  } from '../actions/geolocationAction';
  
  const initialState = {
    geolocation: {
      loading: false,
      coordinates: null,
      error: null,
    },
  };
  
  const geolocationReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case REQUEST_GEOLOCATION:
        return {
          ...state,
          geolocation: {
            loading: true,
            coordinates: null,
            error: null,
          },
        };
      case RECEIVE_GEOLOCATION_SUCCESS:
        return {
          ...state,
          geolocation: {
            loading: false,
            coordinates: action.payload,
            error: null,
          },
        };
      case RECEIVE_GEOLOCATION_FAILURE:
        return {
          ...state,
          geolocation: {
            loading: false,
            coordinates: null,
            error: action.payload,
          },
        };
      default:
        return state;
    }
  };
  
  export default geolocationReducer;
  