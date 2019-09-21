// Action Creator
export const selectSong = song => {
    // Return an action with a type and optionally a payload
    return {
        type: 'SONG_SELECTED',
        payload: song
    };
};

// export const someOtherActionCreator = () => {
//     // ...
// };