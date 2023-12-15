// src/components/App.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, fetchWeather, removeFromFavorites } from '../actions/weatherAction';
import WeatherCard from '../Components/WeatherCard';
import { Container, Box, Button } from '@mui/material';
import getCityName from '../utils/GeocodeAPI';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  

  return (
    <Container>
      <h1>Weather App</h1>
     
   
      <WeatherCard  />
    </Container>
  );
};

export default Home;
