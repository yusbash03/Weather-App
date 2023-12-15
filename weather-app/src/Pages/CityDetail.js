import React, { useEffect, useState } from 'react';
import {  useLocation } from 'react-router-dom';
import { Box, Button, Alert, TextField, CircularProgress, TextareaAutosize, Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, fetchWeather } from '../actions/weatherAction';
import { addNote, editNote, removeNote } from '../actions/notesAction';
import { pink } from '@mui/material/colors';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';


const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: '0px 4px 20px rgba(0, 0, 255, 0.1)', // Blue shadow
  borderRadius: '10px', //
  '&:hover': {
    boxShadow: '0px 8px 30px rgba(0, 0, 255, 0.2)', // Blue shadow on hover
  },
}));


const CityDetail = () => {
  const [note, setNote] = useState('');
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showSuccessAlertFav, setShowSuccessAlertFav] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const cities = useSelector((state) => state.weather.cities);
  const states = useSelector((state) => state);
  const weather = useSelector((state) => state.weather.weather);
  const loading = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);
  const [isFavorite, setIsFavorite] = useState(false);


 

  //console.log(location)
  const { cityName, country, icon, temperature, description } = location.state;

  const [searchedData, setSearchedData] = useState({
    cityName,
    country,
    icon,
    temperature,
    description,
  });
  const cityNotes = useSelector((state) => {
    const cityNote = state.note.notes.find((cityNote) => cityNote.city === searchedData.cityName);
    console.log("Notess", cityNote);
    return cityNote ? cityNote.notes : [];
  });
  //setSelectedCity(cityName);
  localStorage.setItem('city', JSON.stringify(cityName));



  console.log(states);

  const handleFetchWeather_ =  async () => {
    try{
      await dispatch(fetchWeather(city));
      // Get the weather data from the store
  
      const  storedString = localStorage.getItem('localstore');
      const currentWeather = JSON.parse(storedString);
  
      console.log('weather data', currentWeather);
      const {name, country} = currentWeather.location;
      setSelectedCity(name);
      setSearchedData((prevData) => ({
        ...prevData,
        cityName: name,
        country: country,
        icon: currentWeather.current.weather_icons[0],
        temperature: currentWeather.current.temperature,
        description: currentWeather.current.weather_descriptions[0]  }));
    }
    catch (error) {
      console.error('Error fetching weather:', error);
      // Display an alert or handle the error in another way
      alert('Error fetching weather. Please try again.');
    }
    
    
}
  

  useEffect(() => {
    
    setSelectedCity(cityName)
  }, [cityName]);

  const handleAddToFavorites = (city) => {
    dispatch(addToFavorites(city));
    setShowSuccessAlertFav(true);
    //handleFavoriteToggle();
    setTimeout(() => {
      setShowSuccessAlertFav(false);
    }, 1000)
  };
  const backToHome = () => {
   navigate('/');
  };

  const handleAddNote = (e) => {
    e.preventDefault(); 
    // console.log(`Adding city ${selectedCity}`);
    // console.log(`Adding note ${note}`);
    dispatch(addNote(selectedCity, note));
    setNote('');
  };

  const handleEditNote = (index) => {
    const newNote = prompt('Edit Note:', cities.find((c) => c.name === city)?.notes[index]);
    if (newNote !== null && newNote !== undefined) {
      dispatch(editNote(selectedCity, index, newNote));
    }
  };

  const handleRemoveNote = (index) => {
    if (window.confirm('Are you sure you want to remove this note?')) {
      dispatch(removeNote(selectedCity, index));
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(prevIsFavorite => !prevIsFavorite);
  };

  return (
    <Container>
       <Button variant="outlined" color="secondary" onClick={backToHome} style={{ marginTop: '16px', marginBottom:'20px' }}>
          Back 
        </Button>
        {showErrorAlert && <Alert severity="error">Error getting weather</Alert>}
        <Grid container spacing={3} >
      <Grid item xs={12} md={6} style={{ marginBottom: '16px' }}>
        <StyledCard style={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Search Weather Information
            </Typography>
            <TextField
              label="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleFetchWeather_}
              disabled={loading}
              fullWidth
            >
              Get Weather
            </Button>
          </CardContent>
        </StyledCard>
      </Grid>

      <Grid item xs={12} md={6} justifyContent="flex-end" style={{ marginBottom: '16px' }}>
        <StyledCard style={{ height: '100%' }}>
          <CardContent>
          <Typography variant="h5" gutterBottom>
          {searchedData.cityName} Weather Details
          {/* {initialCityName} Weather Details */}
            </Typography>
          <Grid container spacing={2}>
          {/* Weather Image */}
          <Grid item xs={12} md={4}>
            <img
              src={searchedData.icon}
              alt={description}
              style={{ width: '100%', height: 'auto' }}
            />
          </Grid>

          <Grid item xs={12} md={8} >
            <Typography variant="h5" gutterBottom>
              {searchedData.cityName}, {searchedData.country}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {searchedData.description}
            </Typography>
            <Typography variant="h3" gutterBottom>
              {searchedData.temperature}°C
            </Typography>
            
            <IconButton  aria-label="add fav" onClick={() => handleAddToFavorites(searchedData.cityName)}>
              <FavoriteBorderIcon sx={{ color: pink[500] }} />
              {/* {!isFavorite ? <FavoriteBorderIcon sx={{ color: pink[500] }} /> : <FavoriteIcon sx={{ color: pink[500] }}  />} */}
            </IconButton>

            {showSuccessAlertFav && <Alert severity="success">City Added Favorites</Alert>}
          </Grid>
        </Grid>
          </CardContent>
        </StyledCard>
      
      </Grid>
      
    </Grid>


    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <StyledCard style={{height:'100%'}}>
          <CardContent>
          <Typography variant="h5" gutterBottom>
            Add Note
        </Typography>
        <TextareaAutosize
          placeholder="Enter Note"
          aria-label="minimum height"
          minRows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ width: '100%', marginBottom: '16px' }}
        />
        <Button variant="contained" fullWidth color="primary" onClick={handleAddNote}>
          Add Note
          {/* {editingIndex !== null ? 'Update Note' : 'Add Note'} */}
        </Button>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledCard style={{height:'100%'}}>
          <CardContent>
          <Typography variant="h5" gutterBottom>
            Notes
        </Typography>
        {showSuccessAlert && <Alert severity="success">Note Added Successfully</Alert>}
        {cityNotes && cityNotes.length > 0 ? (
          <List>
            {cityNotes.map((note, index) => (
              <ListItem key={index}>
                <ListItemText primary={note} />
                <IconButton onClick={() => handleEditNote(index)} aria-label="edit">
                  <EditIcon color='primary' />
                </IconButton>
                <IconButton onClick={() => handleRemoveNote(index)} aria-label="delete">
                  <DeleteIcon sx={{ color: pink[600] }} />
                </IconButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No notes available.
          </Typography>
        )}

        
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
   
    
    </Container>
  );
};

export default CityDetail;
