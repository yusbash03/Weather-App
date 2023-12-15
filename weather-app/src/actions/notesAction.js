import axios from 'axios';


export const ADD_NOTE = 'ADD_NOTE';
export const ADD_NOTE_SUCCCESS = 'ADD_NOTE_SUCCCESS';
export const ADD_NOTE_FAILURE = 'ADD_NOTE_FAILURE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';


export const addNote = (city, note) => ({
  type: ADD_NOTE,
  payload: { city, note },
});
export const addNoteSuccess = (note) => ({
  type: ADD_NOTE_SUCCCESS,
  payload: note
});
export const addNoteFail = (error) => ({
  type: ADD_NOTE_FAILURE,
  payload: error,
});

export const editNote = (city, index, note) => ({
  type: EDIT_NOTE,
  payload: { city, index, note },
});

// export const removeNote = (index) => ({
//   type: REMOVE_NOTE,
//   payload: index,
// });
export const removeNote = (city, index) => ({
  type: REMOVE_NOTE,
  payload: { city, index },
});

