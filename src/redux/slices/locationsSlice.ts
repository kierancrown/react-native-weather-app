import {createSlice} from '@reduxjs/toolkit';

export interface ILocation {
  id: string;
  name: string;
  region?: string;
  country?: string;
  lat: number;
  lon: number;
  isDeviceLocation?: boolean;
}

export interface ILocationsState {
  currentLocation: ILocation;
  savedLocations?: ILocation[];
}

const initialState: ILocationsState = {
  currentLocation: {
    id: '0',
    name: 'Current Location',
    country: 'Current Country',
    lat: 0,
    lon: 0,
    isDeviceLocation: true,
  },
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setCurrentLocation: (state, action: {payload: ILocation}) => {
      state.currentLocation = action.payload;
    },
    removeCurrentLocation: state => {
      state.currentLocation = initialState.currentLocation;
    },
    saveLocation: (state, action: {payload: ILocation}) => {
      if (!state.savedLocations) {
        state.savedLocations = [];
      }
      state.savedLocations.push(action.payload);
    },
    removeLocation: (state, action: {payload: string}) => {
      if (state.savedLocations) {
        state.savedLocations = state.savedLocations.filter(
          location => location.id !== action.payload,
        );
      }
    },
  },
});

export const {
  setCurrentLocation,
  removeCurrentLocation,
  saveLocation,
  removeLocation,
} = locationsSlice.actions;

export default locationsSlice.reducer;
