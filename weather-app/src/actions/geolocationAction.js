// src/redux/actions/geolocationActions.js
export const REQUEST_GEOLOCATION = 'REQUEST_GEOLOCATION';
export const RECEIVE_GEOLOCATION_SUCCESS = 'RECEIVE_GEOLOCATION_SUCCESS';
export const RECEIVE_GEOLOCATION_FAILURE = 'RECEIVE_GEOLOCATION_FAILURE';

export const requestGeolocation = () => ({
  type: REQUEST_GEOLOCATION,
});

export const receiveGeolocationSuccess = (position) => ({
  type: RECEIVE_GEOLOCATION_SUCCESS,
  payload: position,
});

export const receiveGeolocationFailure = (error) => ({
  type: RECEIVE_GEOLOCATION_FAILURE,
  payload: error,
});

export const fetchGeolocation = () => {
  return (dispatch) => {
    dispatch(requestGeolocation());

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(receiveGeolocationSuccess(position.coords));
        },
        (error) => {
          dispatch(receiveGeolocationFailure(error.message));
        }
      );
    } else {
      dispatch(receiveGeolocationFailure('Geolocation is not supported by this browser.'));
    }
  };
};
