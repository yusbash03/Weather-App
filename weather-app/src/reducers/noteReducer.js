import { ADD_NOTE, REMOVE_NOTE, EDIT_NOTE } from '../actions/notesAction';

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ADD_NOTE:
      return addNoteToCity(state, action.payload.city, action.payload.note);
     
    case EDIT_NOTE:
      return editNoteInCity(state, action.payload.city, action.payload.index, action.payload.note);
    case REMOVE_NOTE:
      return removeNoteFromCity(state, action.payload.city, action.payload.index);
    default:
      return state;
  }
};

const addNoteToCity = (state, cityName, note) => {
  const existingCityNoteIndex = state.notes.findIndex((cityNote) => cityNote.city === cityName);
  console.log("note and city", note, cityName)
  if (existingCityNoteIndex !== -1) {
    // City note already exists, update the notes array
    console.log('check1')
    const updatedCityNote = {
      ...state.notes[existingCityNoteIndex],
      notes: [...state.notes[existingCityNoteIndex].notes, note],
    };

    return {
      ...state,
      notes: [
        ...state.notes.slice(0, existingCityNoteIndex),
        updatedCityNote,
        ...state.notes.slice(existingCityNoteIndex + 1),
      ],
    };
  } else {
    // City note doesn't exist, create a new entry
    console.log('check2')
    const newCityNote = {
      city: cityName,
      notes: [note],
    };

    return {
      ...state,
      notes: [...state.notes, newCityNote],
    };
  }
};

const editNoteInCity = (state, cityName, index, note) => {
  return {
    ...state,
    notes: state.notes.map((cityNote) => {
      if (cityNote.city === cityName) {
        const newNotes = [...cityNote.notes];
        newNotes[index] = note;
        return { ...cityNote, notes: newNotes };
      }
      return cityNote;
    }),
  };
};

const removeNoteFromCity = (state, cityName, index) => {
  const existingCityNoteIndex = state.notes.findIndex((cityNote) => cityNote.city === cityName);

  if (existingCityNoteIndex !== -1) {
    console.log('not found city');
    const updatedCityNote = {
      ...state.notes[existingCityNoteIndex],
      notes: state.notes[existingCityNoteIndex].notes.filter((_, i) => i !== index),
    };

    return {
      ...state,
      notes: [
        ...state.notes.slice(0, existingCityNoteIndex),
        updatedCityNote,
        ...state.notes.slice(existingCityNoteIndex + 1),
      ],
    };
  }

  // If the city note doesn't exist, return the current state
  return state;
};









export default noteReducer;