// src/redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
import noteReducer from './noteReducer';
import geolocationReducer from './geolocationReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  note: noteReducer,
  geolocation: geolocationReducer,
  // Add other reducers if you have them
});

export default rootReducer;
