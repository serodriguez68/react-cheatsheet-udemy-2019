import { combineReducers } from 'redux';

// This reducer is a bit weird because we are hard-coding the list of songs.
// This is just for illustration purposes
export const songsReducer = () => {
    return [
        {title: 'No Scrubs', duration: '4:05'},
        {title: 'Macarena', duration: '2:30'},
        {title: 'All Star', duration: '3:15'},
        {title: 'I Want it That Way', duration: '1:45'}
    ];
};

export const selectedSong = (selectedSong=null, action) => {
  if (action.type === 'SONG_SELECTED') {
      return action.payload;
  }
  return selectedSong;
};

export default combineReducers({
    songs: songsReducer,
    selectedSong: selectedSong
});