// src/components/App.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../actions/weatherAction';
import WeatherCard from './WeatherCard';
import { Box, TextField, CircularProgress, Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemText, ListItemIcon, Divider, ListItemSecondaryAction, IconButton } from '@mui/material';
import { AccountCircle, Email, Phone, DeleteOutlinedIcon  } from '@mui/icons-material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { pink } from '@mui/material/colors';

const Favorites = ({favorites, onRemoveFavorite}) => {
  return(
    <>
    {favorites && favorites.length > 0 ? (
      <List>
      { favorites.sort((a, b) => a.localeCompare(b)).map((city) => (
        <ListItem key={city} >
          <ListItemText primary={city}  />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="remove city" onClick={() => onRemoveFavorite(city)}>
              <FavoriteIcon sx={{ color: pink[600] }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
        </List>
    ): (
          <Typography variant="h5" color="textSecondary">
            No favorites available.
          </Typography>
        )}
       
    </>
  );
 
};

export default Favorites;
