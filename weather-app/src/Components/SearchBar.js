import React, {  useState } from 'react';

import { Box, TextField, CircularProgress, Paper, Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemText, ListItemIcon, Divider, ListItemSecondaryAction, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../actions/weatherAction';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const weather = useSelector((state) => state.weather.weather);
  const loading = useSelector((state) => state.weather.loading);

  const handleFetchWeather_ = () => {
    dispatch(fetchWeather(city));
    setSelectedCity(city);
  };
 

  return (
   <Container>
      <Grid container spacing={3}>
      {/* First Card - Spanning 6 Columns */}
      <Grid item xs={12} md={10}>
        <Card>
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
        </Card>
      </Grid>

     
    </Grid>
   </Container>
  );
};

export default SearchBar;


