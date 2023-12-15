import React, { useCallback, useEffect, useState } from 'react';
import { Box, TextField, CircularProgress, Button, Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemText, ListItemIcon, Divider, ListItemSecondaryAction, IconButton } from '@mui/material';
import { AccountCircle, Email, Phone, DeleteOutlinedIcon  } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, fetchCities, fetchWeather, removeCityAction, removeFromFavorites } from '../actions/weatherAction';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { pink } from '@mui/material/colors';
import Favorites from './Favorites';
import { useNavigate } from 'react-router-dom';
import getCityName from '../utils/GeocodeAPI';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';



const WeatherCard = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const weather = useSelector((state) => state.weather.weather);
  const loading = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);
  const cities = useSelector((state) => state.weather.cities);
  const loadingCities = useSelector((state) => state.weather.loadingCities);
  const errorCities = useSelector((state) => state.weather.errorCities);
  const [selectedCity, setSelectedCity] = useState('');
  const favorites = useSelector((state) => state.weather.favorites);
  const [locationPermission, setLocationPermission] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleRemoveFromFavorites = (city) => {
    dispatch(removeFromFavorites(city));
  };

  const handleAddToFavorites = (city) => {
    dispatch(addToFavorites(city));
    //handleFavoriteToggle();
  };

  // const handleFavoriteToggle = () => {
  //   setIsFavorite(prevIsFavorite => !prevIsFavorite);
  // };
  // console.log("weather", weather);
  useEffect(() => {
    // Fetch cities when the component mounts
    dispatch(fetchCities());
  }, [dispatch]);

  const handleRemoveCity = (city) => {
    dispatch(removeCityAction(city));
  };
 

  const handleFetchWeather = async (city) => {
    await dispatch(fetchWeather(city));
    setSelectedCity(city);
     navigateToCityDetail();
  }
 
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
    }
  };

  const handleGetLocation = () => {
    setLoadingLocation(true);
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
            setLoadingLocation(false);
          } catch (error) {
            console.error('Error getting city name:', error);
            setLocationPermission(false);
            setLoadingLocation(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationPermission(false);
          setLoadingLocation(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
      setLocationPermission(false);
      setLoadingLocation(false);
    }
  };


 useEffect(() => {
  // This effect runs whenever 'weather' changes
  if (weather) {
    navigateToCityDetail();
  }
}, [weather]); 


  return (
    <div>
      <Container>
      <Box>
      <div>
      {locationPermission === null && (
        // <button onClick={handleGetLocation}>Get My Location</button>
        <Button variant="contained" disabled={loadingLocation} color="primary" onClick={handleGetLocation}>
          Get My Location
        </Button>
      )}
      {locationPermission === true && (
        <p>Location permission granted! Redirecting...</p>
      )}
      {locationPermission === false && (
        <p>Unable to get location. Please check your browser settings.</p>
      )}

      <Box>
      {loadingLocation && <CircularProgress />}
      </Box>
    </div>
      </Box>
      <Grid container spacing={3}>
        {/* First Card */}
        <Grid item md={6}>
          <Card style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                List of Cities with the Largest Population
              </Typography>
             

              <Divider />
              <Typography variant="h5" component="div">
              {errorCities && <p>Error fetching cities: {errorCities}</p>}
              </Typography>
              {loadingCities && <CircularProgress />}
              
              {cities && cities.length > 0 ? (
               <List>
               { cities.sort((a, b) => a.localeCompare(b)).map((city) => (
                 <ListItem key={city} onClick={() => handleFetchWeather(city)} button >
                   <ListItemText primary={city}  />
                   <ListItemSecondaryAction>
                   <IconButton  aria-label="add fav" onClick={() => handleAddToFavorites(city)}>
                   <FavoriteBorderIcon sx={{ color: pink[500] }} />
                    {/* {!isFavorite ? <FavoriteBorderIcon sx={{ color: pink[500] }} /> : <FavoriteIcon sx={{ color: pink[500] }}  />} */}
                    </IconButton>
                     <IconButton edge="end" aria-label="remove city" onClick={() => handleRemoveCity(city)}>
                       <DeleteIcon sx={{ color: pink[600] }} />
                     </IconButton>
                   </ListItemSecondaryAction>
                 </ListItem>
               ))}
                       </List>
              ): (
          <Typography variant="h5" color="textSecondary">
            No cities available.
          </Typography>
        )}
             
            </CardContent>
          </Card>
        </Grid>

       
        <Grid item md={6}>
          <Card style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Favorite Cities
              </Typography>
              <Divider />
              <Favorites favorites={favorites} onRemoveFavorite={handleRemoveFromFavorites}/>
              
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      
    </Container>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

    </div>
  );
};

export default WeatherCard;



