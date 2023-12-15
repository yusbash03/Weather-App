// utils/geocode.js
import axios from 'axios';
import { RAPID_API_KEY } from './APIs';

const getCityName = async (latitude, longitude) => {
 
  const rapidApiHost = 'geocodeapi.p.rapidapi.com';
  //const rapidapikey = process.env.REACT_APP_RAPID_API_KEY;


  try {
    const response = await axios.get('https://geocodeapi.p.rapidapi.com/GetNearestCities', {
      params: {
        latitude: latitude,
        longitude: longitude,
        range: '0',
      },
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        //'X-RapidAPI-Key': rapidapikey,
        'X-RapidAPI-Host': rapidApiHost,
      },
    });

    console.log("Res, Lat, Long: ", response, latitude, longitude);

    const citiesArray = response.data;

    if (citiesArray.length > 0) {
      // Extract the city name from the first object in the array
      const city = citiesArray[0].City; // Adjust the property name based on the actual data structure
        console.log("citay", city);
      if (city) {
        return city;
      }
    }

    throw new Error('City not found');
  } catch (error) {
    console.error('Error fetching city name:', error);
    throw error;
  }
};

export default getCityName;
