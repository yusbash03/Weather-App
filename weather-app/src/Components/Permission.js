// src/components/App.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, fetchWeather, removeFromFavorites } from '../actions/weatherAction';
import { Container, Box, Button } from '@mui/material';
import getCityName from '../utils/GeocodeAPI';
import { useNavigate } from 'react-router-dom';

const Permission = () => {
   const dispatch = useDispatch();
   const weather = useSelector((state) => state.weather.weather);
  const nav = useNavigate();
const [locationPermission, setLocationPermission] = useState(null);

const handleFetchWeather = async (city) => {
  try {
    await dispatch(fetchWeather(city));
    console.log("weather ",weather)
    navigateToCityDetail();
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
}

useEffect(() => {
  // This effect runs whenever 'weather' changes
  if (weather) {
    navigateToCityDetail();
  }
}, [weather]); 

const navigateToCityDetail = () => {
  if(weather){
    nav('/citydetail', {
      state: {
        cityName: weather.location.name,
        country: weather.location.country,
        icon: weather.current.weather_icons[0],
        temperature: weather.current.temperature,
        description: weather.current.weather_descriptions[0],
      },
    });

    console.log('2nd hit');
  }
  
};

const handleGetLocation = () => {
  console.log('starting');
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // Get the user's current coordinates
        const { latitude, longitude } = position.coords;
        try {
          const cityName = await getCityName(latitude, longitude);
          console.log('City name:', cityName);

          // take me to the citydetail page if there is a cityname available
          if(cityName){
            console.log('1st hit');
            handleFetchWeather(cityName);
          }
          

          // Set the permission state to true
          setLocationPermission(true);
        } catch (error) {
          console.error('Error getting city name:', error);
          setLocationPermission(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationPermission(false);
      }
    );
  } else {
    console.error('Geolocation is not supported by your browser');
    setLocationPermission(false);
  }
};

  return (
    <Container>
      <h1>Weather App</h1>
      <Box>
      <div>
      {locationPermission === null && (
        // <button onClick={handleGetLocation}>Get My Location</button>
        <Button variant="contained" color="primary" onClick={handleGetLocation}>
          Get My Location
        </Button>
      )}
      {locationPermission === true && (
        <p>Location permission granted! Redirecting...</p>
      )}
      {locationPermission === false && (
        <p>Unable to get location. Please check your browser settings.</p>
      )}
    </div>
      </Box>
   
    </Container>
  );
};

export default Permission;
