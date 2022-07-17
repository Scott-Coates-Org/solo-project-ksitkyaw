import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fixtures: [],
    chatFixture: [],
    isLoaded: false,
    hasErrors: false,
  };
  
  const fixture = createSlice({
    name: "fixture",
    initialState,
    reducers: {
      getData: (state) => {
      },
      getchatFixture: (state, action) => {
        state.chatFixture = action.payload;
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
    getData, getDataSuccess, setLeague, getDataFailure, createDataFailure, getchatFixture
  } =fixture.actions;