import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    isLoaded: false,
    hasErrors: false,
    league: "",
  };
  
  const standing = createSlice({
    name: "standing",
    initialState,
    reducers: {
      getData: (state) => {
      },
  
      getDataSuccess: (state, action) => {
        state.isLoaded = true;
        state.data = action.payload;
      },
      setLeague: (state, action) => {
        state.league = action.payload;
      },
  
      getDataFailure: (state, action) => {
        state.isLoaded = true;
        state.hasErrors = true;
      },
  
      createDataFailure: (state) => {
        state.hasErrors = true;
      },
    }
  });
  
  export const reducer =standing.reducer;
  
  export const {
    getData, getDataSuccess, setLeague, getDataFailure, createDataFailure
  } =standing.actions;