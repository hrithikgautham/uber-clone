import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null
}

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload
    },
    setDestination: (state, action) => {
      state.destination = action.payload
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload
    },
    setDriverTravelTimeToPickUpPoint: (state, action) => {
      state.driverTravelTimeToPickUpPoint = action.payload;
    },
    setDriverLocation: (state, action) => {
      state.driverLocation = action.payload;
    },
  }
});

export const { setOrigin, setDestination, setTravelTimeInformation, setDriverTravelTimeToPickUpPoint, setDriverLocation, } = navSlice.actions;

// selectors
export const selectOrigin = state => state.nav.origin;
export const selectDestination = state => state.nav.destination;
export const selectTravelTimeInformation = state => state.nav.travelTimeInformation;
export const selectDriverTravelTimeToPickUpPoint = state => state.nav.driverTravelTimeToPickUpPoint;
export const selectDriverLocation = state => state.nav.driverLocation;

export default navSlice.reducer;