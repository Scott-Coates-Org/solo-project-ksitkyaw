import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fixtures: [],
    isLoaded: false,
    hasErrors: false,
  };
  
  const fixture = createSlice({
    name: "fixture",
    initialState,
    reducers: {
      getData: (state) => {
      },
  
      getDataSuccess: (state, action) => {
        state.isLoaded = true;
        state.fixtures = action.payload;
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
  
  export const reducer =fixture.reducer;
  
  export const {
    getData, getDataSuccess, setLeague, getDataFailure, createDataFailure
  } =fixture.actions;